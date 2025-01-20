import express from 'express';
import Note from '../models/Note.js';

const router = express.Router();

// Alle Notizen abrufen
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Einzelne Notiz abrufen
router.get('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).send('Notiz nicht gefunden');
    res.json(note);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Neue Notiz erstellen
router.post('/', async (req, res) => {
  const { title, description, category } = req.body;

  if (!title || !description || !category) {
    return res.status(400).send('Titel, Beschreibung und Kategorie sind erforderlich.');
  }

  try {
    const newNote = new Note({ title, description, category });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Notiz aktualisieren
router.put('/:id', async (req, res) => {
  try {
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedNote) return res.status(404).send('Notiz nicht gefunden');
    res.json(updatedNote);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Notiz löschen
router.delete('/:id', async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) return res.status(404).send('Notiz nicht gefunden');
    res.json(deletedNote);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default router;
