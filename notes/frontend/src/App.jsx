import { useState, useEffect } from 'react'
import noteService from './services/note.js'
import { 
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import Home from './components/Home.jsx'
import NoteList from './components/NoteList.jsx'
import Note from './components/Note.jsx'
import Footer from './components/Footer.jsx'
import NoteForm from './components/NoteForm.jsx'

const App = () => {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    noteService.getAll().then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])
  
  const addNote = (noteObject) => {
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
      })
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id === id ? returnedNote : note))
      })
      .catch(err => {
        setErrorMessage(`the note '${note.content}' was already deleted from server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const deleteNote = (id) => {
    noteService.remove(id).then(() => {
      setNotes(notes.filter(note => note.id !== id))
    })
  }

  return (
    <Router>
      <nav className='navbar'>
        <Link to='/'>Home</Link>
        <Link to='/notes'>Notes</Link>
        <Link to='/create'>New Note</Link>
      </nav>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/notes' element= {
          <NoteList notes={notes} setNotes={setNotes} />
        } />
        <Route path='/notes/:id' element={
          <Note 
            notes={notes} 
            toggleImportance={toggleImportanceOf} 
            deleteNote={deleteNote} 
          />
        } />
        <Route path='/create' element={
          <NoteForm createNote={addNote} />
        } />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
