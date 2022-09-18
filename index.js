require("dotenv").config();
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

const Person = require("./models/person");
// persons array of object was here

app.get("/", (request, response) => {
  response.send("<h1>Hello NodeJS</h1>");
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (body.name === undefined || body.number === undefined) {
    return response.status(400).send({
      error: "content missing",
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    console.log("savedPerson", savedPerson);
    response.json(savedPerson);
  });
});

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;
  const person = {
    name: body.name,
    number: body.number,
  };
  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedPerson) => {
      console.log("updatedPerson", updatedPerson);
      response.status(201).json(updatedPerson);
    })
    .catch((error) => next(error));
});

app.get("/info", (request, response, next) => {
  Person.find({})
    .then((persons) => {
      response.send(
        `<p>Phonebook has info for ${
          persons.length
        } persons</p><p> ${new Date()}</p>`
      );
    })
    .catch((error) => next(error));
});

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((result) => {
      return response.json(result);
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then((result) => {
      console.log("delete success");
      response.status(204).end();
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error("error: ", error.message);
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }
  next(error);
};

app.use(errorHandler);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
