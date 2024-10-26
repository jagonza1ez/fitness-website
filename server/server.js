/*
*  Feature     -> User Sign up and login
*  Adds Routes -> Employee & Users
*/

import express from "express";
import cors from "cors";
import records from "./routes/record.js";

// Feature -> user signup and login
import auth from "./routes/auth.js";

import dotenv from "dotenv";
import db from "./db/connection.js";


// Configure dotenv to load environment variables
dotenv.config({ path: './config.env' });
console.log("Environment Variables:", process.env);

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

// Employee-related routes
app.use("/record", records);

// Authentication-related routes
app.use("/auth", auth);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});