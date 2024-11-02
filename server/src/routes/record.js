import express from "express";                           // Import Express for routing
import { recordsCollection } from "../db/connection.js"; // Import records collection
import { ObjectId } from "mongodb";                      // Import ObjectId for working with MongoDB document IDs

// Initialize the router
const router = express.Router();

// Get All Records
// This route handles fetching all documents from the records collection.
// It retrieves the records and sends them in the response as JSON.
router.get("/", async (req, res) => {
  try {
    const results = await recordsCollection.find({}).toArray();     // Retrieve all documents from the collection
    res.status(200).json(results);                                  // Respond with a 200 status and the list of records
  } catch (err) {
    console.error("Error fetching records:", err);                  // Log any errors for debugging
    res.status(500).json({ message: "Error fetching records" });    // Respond with a 500 status for server errors
  }
});

// Get a Single Record by ID
// This route fetches a single document by its unique MongoDB ID, using a dynamic parameter (:id).
// If the document exists, it is returned; otherwise, a 404 status is sent.
router.get("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };                 // Create query with the ObjectId of the requested record
    const result = await recordsCollection.findOne(query);              // Find the record in the database
    if (!result) return res.status(404).json({ message: "Not found" }); // Respond with 404 if not found
    res.status(200).json(result);                                       // Respond with a 200 status and the record data
  } catch (err) {
    console.error("Error fetching record:", err);                       // Log any errors for debugging
    res.status(500).json({ message: "Error fetching record" });         // Respond with a 500 status for server errors
  }
});

// Create New Record
// This route handles the creation of a new record. It accepts data in the request body,
// constructs a new document, and inserts it into the records collection.
router.post("/", async (req, res) => {
  try {
    // Construct a new document from request data
    const newDocument = {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level,
    };
    const result = await recordsCollection.insertOne(newDocument);       // Insert the new document into the collection
    // Respond with a 201 status, a success message, and the ID of the new record
    res.status(201).json({ message: "Record created successfully", recordId: result.insertedId });
  } catch (err) {
    console.error("Error adding record:", err);                // Log any errors for debugging
    res.status(500).json({ message: "Error adding record" });  // Respond with a 500 status for server errors
  }
});

// Additional routes for updating and deleting records...
//
//

// Export the router to be used in the main application
export default router;
