const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person")
const app = express()

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
] 

// Create new morgan token to log request body during POST request.
morgan.token('addedPerson', (req, res) => {
  console.log(req.method);
  if (req.method === "POST") {
    return JSON.stringify(req.body)
  }
  return null
})

// Helper function to generate ID for POST request.
const generateId = () => {
  return Math.floor(Math.random() * 9999)
}

app.use(express.json())
app.use(express.static('build'))
app.use(cors())
// app.use(morgan('tiny'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :addedPerson'))

// GET request on root address.
// app.get('/', (req, res) => {
//   res.send(`<h1>Welcome to Phonebook App</h1>`)
// })

// GET request on /info address.
app.get('/info', (req, res) => {
  const dateNow = new Date();
  const infoMessage = `<h3>Phonebook has info for ${persons.length} people.</h3>
                        <h3>${dateNow}</h3>`
  res.send(infoMessage)
})

// Fetch the entire persons resource.
app.get('/api/persons', (req, res) => {
  
  Person
    .find({})
    .then(contacts => {
      res.json(contacts)
    })
})

// Fetch a single resource provided by a valid ID parameter.
app.get('/api/persons/:id', (req, res) => {
  // const id = Number(req.params.id);
  // const person = persons.find( person => person.id === id);
  
  // if (person) {
  //   res.json(person)
  // } else {
  //   res.statusMessage = "No matching resource found for the provided id."
  //   res.status(404).end()
  // }

  Person.findById(req.params.id)
    .then(person => {
      res.json(person)
    })
})

// DELETE a single resource provided a valid ID parameter.
app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter( person => person.id !== id);

  res.status(204).end()
})

// POST a single non-empty and non-existing name resource. 
app.post('/api/persons', (req, res) => {
  const body = req.body;

  if (!body.name) {
    return res.status(400).json({
      error: "Content name is missing."
    })
  } else if (!body.number) {
    return res.status(400).json({
      error: "Content number is missing."
    })
  } 

  // const findPerson = persons.find( person => person.name.toLowerCase() === body.name.toLowerCase())

  // if (findPerson) {
  //   return res.status(409).json({
  //     error: "Name already exist in phonebook."
  //   })
  // }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save()
    .then(savedPerson => {
      res.json(savedPerson)
    })

  // persons = persons.concat(person);
  // res.json(person)
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})