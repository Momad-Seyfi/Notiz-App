import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true }, // Kategorie
}, { timestamps: true });

export default mongoose.model('Note', noteSchema);
