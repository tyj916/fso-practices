import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('')
  const navigate = useNavigate()

  const addNote = (e) => {
    e.preventDefault()

    createNote({
      content: newNote,
      important: true,
    })

    setNewNote('')
    navigate('/notes')
  }

  return (
    <div>
      <h2>Create a new note</h2>

      <form onSubmit={addNote}>
        <input
          type="text"
          onChange={({ target }) => setNewNote(target.value)}
          value={newNote}
        />
        <button type='submit'>save</button>
      </form>
    </div>
  )
}

export default NoteForm
