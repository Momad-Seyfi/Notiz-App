import dotenv from 'dotenv';
dotenv.config(); // Explicitly load .env file

import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import noteRoutes from './routes/notes.js';

const app = express();

// Debug: Check if MONGO_URI is loaded
console.log('MONGO_URI:', process.env.MONGO_URI);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Verbindung
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.use('/notes', noteRoutes);

// Server starten
const PORT = 5000;
app.listen(PORT, () => console.log(`Server läuft auf http://localhost:${PORT}`));