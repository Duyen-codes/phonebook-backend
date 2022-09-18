const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://phoneApp:${password}@cluster0.ftewtbc.mongodb.net/phoneDB?retryWrites=true&w=majority`;

mongoose.connect(url).then((result) => {
  console.log("connected");
});

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length > 3) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });
  person.save().then((result) => {
    console.log(`added ${person.name} number ${person.number} to phonebook`);
    mongoose.connection.close();
  });
} else {
  Person.find({}).then((persons) => {
    persons.forEach((person) => {
      console.log(person);
    });
    mongoose.connection.close();
  });
}
