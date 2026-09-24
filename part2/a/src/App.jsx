import { useState } from 'react';
import Note from './components/Note';

const App = (props) => {
  const [notes, setNotes] = useState(props.notes);
  const [newNote, setNewNote] = useState('a new note...');

  const addNote = (e) => {
    e.preventDefault();
    console.log('Button clicked', event.target);
  }

  const handleNoteChange = (e) => {
    setNewNote(e.target.value);
  }

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => 
          <Note key={note.id} note={note} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input 
          type="text" 
          onChange={handleNoteChange} 
          value={newNote} 
        />
        <button type='submit'>save</button>
      </form>
    </div>
  )
}

export default App
