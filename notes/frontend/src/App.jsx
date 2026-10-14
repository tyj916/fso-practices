import { useState, useEffect } from 'react'
import Footer from './components/Footer.jsx'
import NoteList from './components/NoteList.jsx'
import noteService from './services/note.js'

const App = () => {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    noteService.getAll().then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  return (
    <div>
      <NoteList notes={notes} setNotes={setNotes} />
      <Footer />
    </div>
  )
}

export default App
