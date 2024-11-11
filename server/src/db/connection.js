/**
 * @file connection.js
 * @description Establishes a connection to the MongoDB database and initializes the 
 * collections for users and employee records. Exports the collections for use in other 
 * parts of the application.
 */

// Import MongoClient and ServerApiVersion from the MongoDB driver
import { MongoClient, ServerApiVersion } from "mongodb";
// Import dotenv to load environment variables from a .env file
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config(); 
console.log("MongoDB URI:", process.env.ATLAS_URI); // Debugging: Log the MongoDB URI from environment variables

// Retrieve the MongoDB URI from environment variables or use an empty string as default
const uri = process.env.ATLAS_URI || "";
console.log("MongoDB URI:", uri); // Debugging: Log the MongoDB URI

// Create a new MongoClient instance with the specified URI and options
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1, // Use Server API version v1
    strict: true,                 // Enable strict mode
    deprecationErrors: true,     // Enable deprecation error reporting
  },
});

// Declare variables to hold references to the database and collections
let db, usersCollection, recordsCollection;

/**
 * Connects to the MongoDB database and initializes the collections.
 */
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

// Connect to the database immediately when this module is loaded
await connectDB();

// Export the collections for use in other modules
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