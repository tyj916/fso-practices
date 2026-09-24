import { useState } from 'react';
import Note from './components/Note';

const App = (props) => {
  const [notes, setNotes] = useState(props.notes);

  const addNote = (e) => {
    e.preventDefault();
    console.log('Button clicked', event.target);
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
        <input type="text" />
        <button type='submit'>save</button>
      </form>
    </div>
  )
}

export default App
