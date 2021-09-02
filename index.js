const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
require("./mongo");
const Note = require("./models/Note");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

let notes = [];

app.get("/", (req, res) => {
  res.send("<h1>Hellow World</h1>");
});

app.get("/api/notes", (req, res) => {
  // Note.find({}).then((notes) => {
  //   res.json(notes);
  // });
  res.json(notes);
});

app.get("/api/notes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const note = await notes.find((note) => note.id === parseInt(id));
    console.log(note);
    res.json(note);
  } catch (error) {
    console.log(error);
  }
});

app.delete("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  notes = notes.filter((note) => note.id != id);
  res.status(204).end();
});

app.post("/api/notes", (req, res) => {
  const { content, important } = req.body;

  if (!content) {
    return res.status(400).json({
      error: "content is missing",
    });
  }

  const ids = notes.length >= 1 ? notes.map((note) => note.id) : 0;
  const maxId = ids == 0 ? 0 : Math.max(...ids);
  console.log(ids);
  const newNote = {
    id: maxId + 1,
    content,
    important: typeof important != undefined ? important : false,
    date: new Date().toISOString(),
  };

  notes = [...notes, newNote];
  console.log(newNote);
  res.json(notes);
});

const port = process.env.PORT || 3001;

app.set("port", port);

app.listen(app.get("port"), () => {
  console.log(`Server running on port ${app.get("port")}`);
});
