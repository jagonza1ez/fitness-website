import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from config.env
console.log("MongoDB URI:", process.env.ATLAS_URI);

const uri = process.env.ATLAS_URI || "";
console.log("MongoDB URI:", uri); // Debugging check

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
    // Connect the client to the server
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. Successfully connected to MongoDB!");

    // Initialize database and collections
    db = client.db("employees"); // Database name, change if needed
    usersCollection = db.collection("users"); // Collection for users (sign up)
    recordsCollection = db.collection("records"); // Collection for employee records
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

await connectDB();

export { usersCollection, recordsCollection };

// import { MongoClient, ServerApiVersion } from "mongodb";
// import dotenv from "dotenv";

// dotenv.config(); // Load environment variables from config.env
// console.log("MongoDB URI:", process.env.ATLAS_URI); // Debugging line

// const uri = process.env.ATLAS_URI || "";
// console.log("MongoDB URI:", uri); // Debugging check

// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// try {
//   // Connect the client to the server
//   await client.connect();
//   // Send a ping to confirm a successful connection
//   await client.db("admin").command({ ping: 1 });
//   console.log(
//    "Pinged your deployment. You successfully connected to MongoDB!"
//   );
// } catch(err) {
//   console.error(err);
// }

// let db = client.db("employees");

// export default db;