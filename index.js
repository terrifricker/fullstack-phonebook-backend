const express = require('express')
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

app.get('/', (request, response) => {
  response.send("Welcome to the Phonebook")
})

app.get('/info', (request, response) => {
  const timeReceived = new Date(Date.now())
  const numberOfPeople = persons.length
  response.send(`<p>Phonebook has information for ${numberOfPeople} people</p>
    <p>${timeReceived}</p>`)
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.filter(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const generateID = () => {
    return Math.floor(Math.random() * 99999)
  } 
  const person = request.body
  console.log("person ", person)
  if (!person.name) {
    response.status(400).json({
      error: 'no name entered'
    })
    return
  }
  if (!person.number) {
    response.status(400).json({
      error: 'no number entered'
    })
    return
  }
  if (persons.filter(p => p.name === person.name).length > 0) {
    console.log("duplicate")
    response.status(400).json({
      error: 'name must be unique'
    })
    return
  }

  person.id = generateID()
  persons = persons.concat(person)
  response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`)
})