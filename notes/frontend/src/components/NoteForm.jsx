import { useState } from "react";

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('');
    
  const addNote = (e) => {
    e.preventDefault();

    createNote({
      content: newNote,
      important: true,
    });

    setNewNote('');
  };

  return (
    <div>
      <h2>Create a new note</h2>

      <form onSubmit={addNote}>
        <input 
          type="text" 
          onChange={({target}) => setNewNote(target.value)} 
          value={newNote} 
        />
        <button type='submit'>save</button>
      </form>
    </div>
  );
}

export default NoteForm;
