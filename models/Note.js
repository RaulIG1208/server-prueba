const { Schema, model } = require("mongoose");

const noteSchema = new Schema({
  content: String,
  date: Date,
  important: Boolean,
});

const Note = model("Note", noteSchema);

module.exports = Note;
