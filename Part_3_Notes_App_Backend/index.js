// const http = require('http');

const express = require('express')
const app = express()

app.use(express.json())

let notes = [
    {
      id: 1,
      content: "HTML is easy",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
]

// const app = http.createServer((request, response) => {
//     response.writeHead(200, {'Content-Type': 'application/json'})
//     response.end(JSON.stringify(notes))
// })

app.get('/', (request, response) => {
    response.send('<div>Hello Worl!!!</div>')
})

app.get('/api/notes', (request, response) => {
    response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  console.log(`Getting resource at this id: ${id}`)

  const note = notes.find(note => note.id === id)
  
  if(note){
    response.json(note)
  }else{
    response.statusMessage = `Your resource at id ${id} was not found`
    response.status(400).end()
  }
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)

  notes = notes.filter(note => note.id !== id)
  response.status(204).end()
})

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)): 0
  return maxId + 1
}

app.post('/api/notes', (request, response) => {
  const body = request.body

  if(!body.content){
    return response.status(400).json({
      error: "Content Missing"
    })
  }

  const note = {
    content: body.content,
    important: body.important || false,
    id: generateId(),
  }
  
  notes = notes.concat(note)
  console.log(note)
  response.json(note)
})



const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`)
})

