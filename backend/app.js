import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import noteRoutes from './routes/notes.js';

const app = express();

// Middleware
app.use(bodyParser.json());

// MongoDB Verbindung
mongoose.connect('mongodb://localhost:27017/notes', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.use('/notes', noteRoutes);

// Server starten
const PORT = 5000;
app.listen(PORT, () => console.log(`Server läuft auf http://localhost:${PORT}`));
