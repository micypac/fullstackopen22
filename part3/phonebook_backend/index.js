const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person")
const app = express()

// Create new morgan(logger middleware) token to log request body during POST request.
morgan.token('addedPerson', (req, res) => {
  console.log(req.method);
  if (req.method === "POST") {
    return JSON.stringify(req.body)
  }
  return null
})

app.use(express.json())
app.use(express.static('build'))
app.use(cors())
// app.use(morgan('tiny'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :addedPerson'))

// GET request on root address.
// app.get('/', (req, res) => {
//   res.send(`<h1>Welcome to Phonebook App</h1>`)
// })

// READ. Get request on /info route. Displays the number of people stored in phonebook app.
app.get('/info', (req, res) => {
  const dateNow = new Date();
  
  Person.countDocuments({}, (err, count) => {
    const infoMessage = `<h3>Phonebook has info for ${count} people.</h3>
                        <h3>${dateNow}</h3>`;
    res.send(infoMessage)
  })
  
})

// READ. Fetch the entire persons resource.
app.get('/api/persons', (req, res) => {
  
  Person
    .find({})
    .then(contacts => {
      res.json(contacts)
    })
})

// READ. Fetch a single resource provided by a valid ID parameter.
app.get('/api/persons/:id', (req, res) => {

  Person.findById(req.params.id)
    .then(person => {
      res.json(person)
    })
})

//UPDATE. Update a person's number.
app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body;

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(req.params.id, person, {new: true})
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(error => next(error))
})

// DELETE a single resource provided a valid ID parameter.
app.delete('/api/persons/:id', (req, res, next) => {

  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

// CREATE. Post a single non-empty and non-existing name resource. 
app.post('/api/persons', (req, res, next) => {
  const body = req.body;

  // Validation function is done via Mongoose.
  // if (!body.name) {
  //   return res.status(400).json({
  //     error: "Content name is missing."
  //   })
  // } else if (!body.number) {
  //   return res.status(400).json({
  //     error: "Content number is missing."
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
    .catch(error => next(error))
})


const errorHandler = (error, request, response, next) => {
  console.log(error.message);

  if (error.name === "CastError"){
    return response.status(400).json({error: "malformatted id"})
  } else if (error.name === 'ValidationError'){
    return response.status(400).json({error: error.message})
  }

  next(error)
}

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})