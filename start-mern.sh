#!/bin/bash

# Navigate to the backend source directory
cd server/src/

# Start the backend server in the background
node server.js &

# Navigate back to the root directory
cd ../../

# Navigate to the frontend source directory
cd client/src/

# Start the frontend development server in the background
npm run dev &

# Wait for both servers to start (optional)
wait

echo "Backend and frontend servers are running."
