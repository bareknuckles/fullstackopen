const mongoose = require('mongoose')

if(process.argv.length < 3){
    console.log(`Give password as argument`)
    process.exit(1)
}

// const password = process.argv[2]
const password = "q60A81MQ8AOOo1TJ"
// const encodedPassword = encodeURIComponent(password)
// console.log(`My password: ${password}`)
const url = `mongodb+srv://everyone:${password}@cluster0.obczffk.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
    content: 'Push it to the limit',
    important: true,
})

// note.save().then(result => {
//     console.log(`Note saved!..also check out the result ${result}`)
//     mongoose.connection.close()
// })

Note.find({  }).then(result => {
    result.forEach(note => {
        console.log(`This is your note: ${note}`)
    })
    mongoose.connection.close()
})