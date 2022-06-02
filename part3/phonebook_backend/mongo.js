const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("Please provide the password as an argument for the app: node mongo.js <password>");
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://fsomicpac1:${password}@cluster0.zfssjqw.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
  name: String,
  number: String
});

const Person = mongoose.model('Person', personSchema);

mongoose
  .connect(url)
  .then(result => {
    console.log('Phonebook db connected...');
  })
  .then(() => {
    if (process.argv.length === 3) {
      
      Person.find({})
        .then(result => {
          result.forEach( item => console.log(`${item.name} ${item.number}`))
          mongoose.connection.close()
        })
    } else {
      
      const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
      })

      person.save()
        .then(() => {
          console.log('person saved!');
          mongoose.connection.close();
        })
    }
  })
  .catch(err => {
    console.log(err);
  })