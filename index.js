const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
require("./mongo");
const Note = require("./models/Note");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

let santos = [
  {
    id: 1,
    name: "Seiya",
    constellation: "Pegaso",
  },
  {
    id: 2,
    name: "Shiryu",
    constellation: "Dragon",
  },
  {
    id: 3,
    name: "Hyoga",
    constellation: "Cisne",
  },
  {
    id: 4,
    name: "Shun",
    constellation: "Andromeda",
  },
  {
    id: 5,
    name: "Ikki",
    constellation: "Fenix",
  },
];

app.get("/", (req, res) => {
  res.send("<h1>Hellow World</h1>");
});

app.get("/api/santos", (req, res) => {
  // Note.find({}).then((notes) => {
  //   res.json(notes);
  // });
  res.json(santos);
});

app.get("/api/santos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const santo = await santos.find((santo) => santo.id === parseInt(id));
    console.log(santo);
    res.json(santo);
  } catch (error) {
    console.log(error);
  }
});

app.delete("/api/santos/:id", (req, res) => {
  const id = Number(req.params.id);
  santos = santos.filter((santo) => santo.id != id);
  res.status(204).end();
});

app.post("/api/santos", (req, res) => {
  const { name, constellation } = req.body;

  if (!name) {
    return res.status(400).json({
      error: "content is missing",
    });
  }

  const ids = santos.length >= 1 ? santos.map((santo) => santo.id) : 0;
  const maxId = ids == 0 ? 0 : Math.max(...ids);
  console.log(ids);
  const newSanto = {
    id: maxId + 1,
    name,
    constellation,
  };

  santos = [...santos, newSanto];
  console.log(newSanto);
  res.json(newSanto);
});

const port = process.env.PORT || 3001;

app.set("port", port);

app.listen(app.get("port"), () => {
  console.log(`Server running on port ${app.get("port")}`);
});
