/**
 * @file connection.js
 * @description Establishes a connection to the MongoDB database and initializes the
 * collections for users and employee records. Adds migration logic to ensure all user
 * documents include a `workoutLogs` field.
 */

import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
console.log("MongoDB URI:", process.env.ATLAS_URI);

const uri = process.env.ATLAS_URI || "";
console.log("MongoDB URI:", uri);

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db, usersCollection, recordsCollection;

async function connectDB() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. Successfully connected to MongoDB!");

    db = client.db("employees");
    usersCollection = db.collection("users");
    recordsCollection = db.collection("records");

    // Run migration to ensure all users have workoutLogs
    await migrateUsersCollection();
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

// Migration logic to add `workoutLogs` field to existing users
async function migrateUsersCollection() {
  try {
    const result = await usersCollection.updateMany(
      { workoutLogs: { $exists: false } }, // Users without `workoutLogs`
      { $set: { workoutLogs: [] } }       // Add `workoutLogs` as an empty array
    );
    console.log(`${result.modifiedCount} user documents updated to include workoutLogs.`);
  } catch (err) {
    console.error("Error during user migration:", err);
  }
}

await connectDB();

export { usersCollection, recordsCollection };
