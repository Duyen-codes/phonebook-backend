const mongoose = require("mongoose");
const middleware = require("./utils/middleware");
const express = require("express");
const app = express();
// logger
const logger = require("./utils/logger");
const config = require("./utils/config");

const morgan = require("morgan");
const cors = require("cors");

morgan.token("body", (request) => {
  return JSON.stringify(request.body);
});

// express json-parser middleware
app.use(express.json());
app.use(morgan(":method :url :status :response-time ms :body"));
logger.info("connecting to", config.MONGODB_URI);
app.use(cors());
app.use(middleware.requestLogger);

app.use(express.static("build"));
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB", error.message);
  });

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

app.post("/api/persons", async (request, response, next) => {
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

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
  const { name, number } = request.body;
  const person = {
    name,
    number,
  };
  Person.findByIdAndUpdate(request.params.id, person, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updatedPerson) => {
      logger.info("updatedPerson", updatedPerson);
      response.json(updatedPerson);
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
    .then(() => {
      logger.info("delete success");
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.use(middleware.unknownEndpoint);

app.use(middleware.errorHandler);

module.exports = app;
