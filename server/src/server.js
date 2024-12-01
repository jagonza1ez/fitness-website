import express from "express";               // Importing the Express library to create the server
import cors from "cors";                     // Importing CORS to handle cross-origin requests
import dotenv from "dotenv";                 // Importing dotenv to manage environment variables
import records from "./routes/record.js";    // Importing route handler for employee-related requests
import auth from "./routes/auth.js";         // Importing routes only
import workouts from './routes/workouts.js'; // Importing workouts
import upload from './routes/upload.js';     // Import the upload route for handling image uploads


// Configure dotenv to load environment variables from .env file into process.env
dotenv.config(); // Default .env loading
console.log("Environment Variables:", process.env);

// Define the port on which the server will listen
// The port is retrieved from environment variables, defaulting to 5050 if undefined
const PORT = process.env.PORT || 5050;
// Initialize the Express application
const app = express();

// Middleware configuration
app.use(cors());                    // Enable CORS to allow cross-origin requests from front-end applications
app.use(express.json());            // Enable JSON body parsing for incoming requests

// Route configurations
// Register the route handlers for different paths
app.use("/record", records);        // Routes for handling employee-related operations (CRUD)
app.use("/auth", auth);             // Routes for handling user authentication (login, registration, etc.)
app.use('/api/workouts', workouts);
app.use('/api/upload', upload);     // Add the upload route for Cloudinary


// Start the Express server and listen on the defined port
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
