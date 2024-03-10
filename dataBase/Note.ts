import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },

  description: {
    type: String,
    require: true,
  },

  createdAt: {
    type: Date,
    require: true,
    default: Date.now(),
  },

  updatedAt: {
    type: Date,
    require: true,
    default: Date.now(),
  },

  createdBy: {
    type: mongoose.Types.ObjectId,
    require: true,
  },
});

export const Note = mongoose.model("notes", NoteSchema);
