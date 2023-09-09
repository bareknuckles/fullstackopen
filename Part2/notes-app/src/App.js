import { useState, useEffect } from "react"
import Note from "./components/Note"
import Notification from "./components/Notification"
import Footer from "./components/Footer"
import noteService from "./services/notes"

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(false)
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  // useEffect(() => {
  //   console.log('effect')
  //   axios
  //   .get('http://localhost:3001/notes')
  //   .then(response => {
  //     console.log('promise fulfilled')
  //     setNotes(response.data)
  //   })
  // }, [])

  useEffect(() => {
    noteService
    .getAll()
    .then((initialNotes) => {
      setNotes(initialNotes)
    })
    .catch((err) => alert(err))
  }, [])

  // console.log('render', notes.length, 'notes')

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  const addNote = (event) => {
    event.preventDefault()
    console.log('Form clicked', event.target)

    const noteObject = {
      id: notes.length + 1,
      content: newNote,
      important: Math.random() < 0.5
    }

    // axios
    // .post('http://localhost:3001/notes', noteObject)
    // .then(response => {
    //   setNotes(notes.concat(response.data))
    //   setNewNote('')
    // })
    noteService
    .create(noteObject)
    .then(returnedNote => {
      setNotes(notes.concat(returnedNote))
      setNewNote('')
    })
  }

  const toggleImportanceOf = (id) => {
    const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id === id)
    const changedNote = {...note, important: !note.important}
    console.log(`importance of ${note} ${id} at this url: ${url} needs to be toggled to become ${changedNote}`)

    // axios
    // .put(url, changedNote)
    // .then(response => {
    //   setNotes(notes.map(n => n.id !== id ? n : response.data))
    // })
    noteService
    .update(id, changedNote)
    .then(returnedNote => {
      setNotes(notes.map(n => n.id !== id ? n : returnedNote))
    })
    .catch(error => {
      setErrorMessage(`the note ${note.content} was already deleted from server`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setNotes(notes.filter(n => n.id !== id))
    })
  }

  
  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const handleDelete = (id) => {
    if(window.confirm(`Do you really want to delete this note?`)){
      noteService
      .remove(id)
      .then(() => {
        setSuccessMessage(`Deleted ${notes.find((note) => note.id === id).name}`)
        setNotes(notes.filter((note) => note.id !== id))
        setTimeout(() => {
          setSuccessMessage(null)
        }, 3000)    
      })
      .catch((error) => alert(error))
    }else{
      return
    }
  
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification successMessage={successMessage} errorMessage={errorMessage}/>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} toggleImportanceOf={() => toggleImportanceOf(note.id)} handleDelete={handleDelete}/>  
        )}
      </ul>
      <form onSubmit={addNote}>
          <input value={newNote} onChange={handleNoteChange}/>
          <button type="submit">Save</button>
      </form>

      <Footer />
    </div>
  )
}

export default App
