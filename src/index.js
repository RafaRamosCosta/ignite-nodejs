const express = require("express");

const app = express();

app.use(express.json());

app.get("/courses", (req, res) => {
  const query = req.query;
  console.log(query);
  return res.json(["Curso1", "Curso2", "Curso3"]);
});

app.post("/courses", (req, res) => {
  const body = req.body;
  console.log(body);
  return res.json(["Curso1", "Curso2", "Curso3"]);
});

app.put("/courses/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  return res.json(["CursoA", "CursoB", "CursoC"]);
});

app.patch("/courses/:id", (req, res) => {
  return res.json(["Curso2", "Curso3", "Curso1"]);
});

app.delete("/courses/:id", (req, res) => {
  return res.json(["Curso1", "Curso2"]);
});

app.listen(3333);
