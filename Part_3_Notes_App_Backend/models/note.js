const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI
const username = process.env.MONGODB_USERNAME
const password = process.env.MONGODB_PASSWORD


console.log(`Connecting to: ${url} with this username: ${username} and password: ${password}`)

mongoose.connect(url).then(result => {
    console.log(`Connected to mongodb`)
}).catch((error) => {
    console.log(`Error connecting to mongodb. ${error.message}`)
})

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})
noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

module.exports = mongoose.model('Note', noteSchema)