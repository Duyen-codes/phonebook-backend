const personsRouter = require("express").Router();
const logger = require("../utils/logger");
const Person = require("../models/person");
// persons array of object was here

personsRouter.get("/", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

personsRouter.post("/", async (request, response, next) => {
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

personsRouter.put("/:id", (request, response, next) => {
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

personsRouter.get("/info", (request, response, next) => {
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

personsRouter.get("/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((result) => {
      return response.json(result);
    })
    .catch((error) => next(error));
});

personsRouter.delete("/:id", (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      logger.info("delete success");
      response.status(204).end();
    })
    .catch((error) => next(error));
});

module.exports = personsRouter;
