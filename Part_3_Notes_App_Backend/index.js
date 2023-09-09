// const http = require('http');
require('dotenv').config()

// const url = process.env.MONGODB_URI
// const username = process.env.MONGODB_USERNAME
// const password = process.env.MONGODB_PASSWORD

const express = require('express')
const app = express()
const Note = require('./models/note')

const cors = require('cors')
app.use(cors())

app.use(express.json())
app.use(express.static('build'))

let notes = [
]


app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
      response.json(notes)
    })
})

app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id
  // console.log(`Getting resource at this id: ${id}`)

  // const note = notes.find(note => note.id === id)
  
  // if(note){
  //   response.json(note)
  // }else{
  //   response.statusMessage = `Your resource at id ${id} was not found`
  //   response.status(400).end()
  // }
  Note.findById(id).then(note => {
    response.json(note)
  })
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)

  notes = notes.filter(note => note.id !== id)
  response.status(204).end()
})

// const generateId = () => {
//   const maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)): 0
//   return maxId + 1
// }

app.post('/api/notes', (request, response) => {
  const body = request.body

  if(body.content === undefined){
    return response.status(400).json({
      error: "Content Missing"
    })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })
  
  // notes = notes.concat(note)
  // console.log(note)
  // response.json(note)
  note.save().then(savedNote => {
    response.json(savedNote)
  })
})

const PORT = process.env.PORT 
app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`)
})

