const express = require("express");
const { contentType } = require("express/lib/response");

const app = express()
app.use(express.json())

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

// Helper function to generate ID for POST request.
const generateId = () => {
  return Math.floor(Math.random() * 9999)
}

// GET request on root address.
app.get('/', (req, res) => {
  res.send(`<h1>Welcome to Phonebook App</h1>`)
})

// GET request on /info address.
app.get('/info', (req, res) => {
  const dateNow = new Date();
  const infoMessage = `<h3>Phonebook has info for ${persons.length} people.</h3>
                        <h3>${dateNow}</h3>`
  res.send(infoMessage)
})

// Fetch the entire persons resource.
app.get('/api/persons', (req, res) => {
  res.json(persons)
})

// Fetch a single resource provided by a valid ID parameter.
app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find( person => person.id === id);
  
  if (person) {
    res.json(person)
  } else {
    res.statusMessage = "No matching resource found for the provided id."
    res.status(404).end()
  }
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

  const findPerson = persons.find( person => person.name.toLowerCase() === body.name.toLowerCase())

  if (findPerson) {
    return res.status(409).json({
      error: "Name already exist in phonebook."
    })
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
    
  }

  persons = persons.concat(person);
  res.json(person)
})

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})