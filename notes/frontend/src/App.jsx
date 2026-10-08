import { useState, useEffect } from 'react';
import Note from './components/Note';
import Notification from './components/Notification.jsx';
import Footer from './components/Footer.jsx';
import LoginForm from './components/LoginForm.jsx';
import noteService from './services/note.js';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('a new note...');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes);
      })
  }, []);

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

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id);
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id === id ? returnedNote : note))
      })
      .catch(err => {
        setErrorMessage(`the note '${note.content}' was already deleted from server`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter(n => n.id !== id));
      });
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important);

  const noteForm = () => (
    <form onSubmit={addNote}>
      <input 
        type="text" 
        onChange={handleNoteChange} 
        value={newNote} 
      />
      <button type='submit'>save</button>
    </form>
  )

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {!user && <LoginForm setUser={setUser} setErrorMessage={setErrorMessage} />}
      {user && (
        <div>
          <p>{user.name} logged in</p>
          {noteForm()}
        </div>
      )}

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note 
            key={note.id} 
            note={note} 
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>

      <Footer />
    </div>
  )
}

export default App
