import express from 'express';
import mongoose from 'mongoose';
import { Routes } from './Routes/Routes.js';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(cors()); // Enable Cross-Origin Resource Sharing

// Define the port
const PORT = process.env.PORT || 5800;

// Database connection using MONGO_URI from .env
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true, // Recommended for modern Mongoose connections
  })
  .then(() => {
    console.log('MongoDB connection is successful');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err); // Log full error object for better context
    process.exit(1); // Exit the process if the database connection fails
  });

// Add routes to the app
Routes(app);

// Global error handler (optional but recommended)
app.use((err, req, res, next) => {
  console.error('Global error handler:', err.stack);
  if (err.status === 404) {
    return res.status(404).json({ message: 'Resource Not Found' });
  }
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
