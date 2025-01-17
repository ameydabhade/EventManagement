import express from 'express';
import mongoose from 'mongoose';
import { Routes } from './Routes/Routes.js';
import cors from 'cors'

const app = express();
app.use(express.json());
app.use(cors())
app.listen(5800, () => {
    console.log('Server is up at port 5800');
});

mongoose.connect("mongodb://localhost:27017");

const db = mongoose.connection;

db.on('open', () => {
    console.log('MongoDB connection is successful');
});

db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

Routes(app);
