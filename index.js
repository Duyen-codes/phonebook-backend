// import express module
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

morgan.token("body", (request) => {
  return JSON.stringify(request.body);
});

// initialize the express app
const app = express();

const requestLogger = (request, response, next) => {
  console.log("Method: ", request.method);
  console.log("Path: ", request.path);
  console.log("Body: ", request.body);
  console.log("---");
  next();
};

// express json-parser middleware
app.use(express.json());
app.use(morgan(":method :url :status :response-time ms :body"));
app.use(requestLogger);
app.use(cors());
app.use(express.static("build"));

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Hello NodeJS</h1>");
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/info", (request, response) => {
  //   response.send(`<p>Phonebook has info for ${persons.length} people</p>`);
  //   response.write(new Date());
  //   response.json({
  //     text: `Phonebook has info for ${persons.length} people`,
  //     date: new Date(),
  //   });

  response.send(
    `<p>Phonebook has info for ${peopleNumber} persons</p><p> ${new Date()}</p>`
  );
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  // after getting the id of entry
  const id = Number(req.params.id);

  // filter out the entry from data
  persons = persons.filter((person) => person.id !== id);

  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const personId = Math.floor(Math.random() * 1000000);

  const newPerson = req.body;
  const found = persons.find((person) => person.name === newPerson.name);
  if (!newPerson.name || !newPerson.number) {
    return res
      .json({
        error: "the name or number is missing",
      })
      .status(400)
      .end();
  } else if (found) {
    return res
      .json({
        error: "name must be unique",
      })
      .status(400)
      .end();
  }
  newPerson.id = personId;
  persons = persons.concat(newPerson);

  res.json(newPerson);
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
