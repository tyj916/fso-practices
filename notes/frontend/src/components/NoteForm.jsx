import { useState } from "react";
import noteService from '../services/note';

const NoteForm = ({ notes, setNotes }) => {
  const [newNote, setNewNote] = useState('a new note...');

  const addNote = (e) => {
    e.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: String(notes.length + 1),
    }

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote));
        setNewNote('');
      });
  }

  const handleNoteChange = (e) => {
    setNewNote(e.target.value);
  }

  return (
    <form onSubmit={addNote}>
      <input 
        type="text" 
        onChange={handleNoteChange} 
        value={newNote} 
      />
      <button type='submit'>save</button>
    </form>
  );
}

export default NoteForm;
