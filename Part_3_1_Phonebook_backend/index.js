const express = require('express')
const morgan = require('morgan')

const app = express()

// EXAMPLE MIDDLEWARE 001(USED BEFORE ROUTES)
const requestLogger = (request, response, next) => {
  console.log(`Method ${request.method}`)
  console.log(`Path ${request.path}`)
  console.log(`Body ${request.body}`)
  console.log(`---`)

  next()
}

// EXAMPLE MIDDLEWARE 002(USED AFTER ROUTES)
const unknownEndpoint = (request, response) => {
  response.status(400).send({error: 'Unknown Endpoint'})
}

app.use(express.json())
app.use(morgan("tiny"))

app.use(requestLogger)

morgan.token("payload", function (request, response){
  return JSON.stringify(request.body)
})

app.use(morgan(":method :url :status :res[content-length] - :response-time ms :payload"))

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
    response.send('<h1>PhoneBook</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get("/info", (request, response) => {
  const requestTime = new Date(Date.now());
  response.send(`<p>Phonebook has info for ${persons.length} people</p> <p>${requestTime}</p>`)
})

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find((person) => person.id === id)

  if(person){
    response.json(person)
  }else{
    response.status(404).end()
  }
})

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter((person) => person.id !== id)

  response.status(204).end()
})

app.post("/api/persons", (request, response) => {
  const body = request.body
  const id = Math.floor(Math.random() * 5000000)
  const nameExists = persons.some((person) => person.name === body.name)

  if(!body.name || !body.number){
    return response.status(400).json({
      error: "name or number missing"
    })
  }

  if(nameExists){
    return response.status(400).json({
      error: "name already exists"
    })
  }

  const newPerson = {
    id,
    name: body.name,
    number: body.number,
    
  }

  persons = persons.concat(newPerson)

  response.json(newPerson)
})


app.use(unknownEndpoint)

const PORT = 3001

app.listen(PORT, () => {
    console.log(`Server is up and running on port: ${PORT}`)
})