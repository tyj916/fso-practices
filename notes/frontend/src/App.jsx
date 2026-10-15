import { useState, useEffect } from 'react'
import { Routes, Route, Link, useMatch } from 'react-router-dom'
import Home from './components/Home.jsx'
import NoteList from './components/NoteList.jsx'
import Note from './components/Note.jsx'
import Footer from './components/Footer.jsx'
import NoteForm from './components/NoteForm.jsx'
import LoginForm from './components/LoginForm.jsx'
import Notification from './components/Notification.jsx'
import Togglable from './components/Togglable.jsx'
import noteService from './services/note.js'
import loginService from './services/login.js'

const App = () => {
  const [notes, setNotes] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const match = useMatch('/notes/:id')
  const note = match
    ? notes.find(note => note.id === match.params.id)
    : null

  useEffect(() => {
    noteService.getAll().then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    };
  }, [])
  
  const addNote = (noteObject) => {
    noteService.create(noteObject).then(returnedNote => {
      setNotes(notes.concat(returnedNote))
      setNotification({ text: `Note ${returnedNote} added!`, type: 'success'})
      setTimeout(() => {
        setNotification(null)
      }, 5000)
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
        setNotification({ text: `the note '${note.content}' was already deleted from server`, type: 'success' })
        setTimeout(() => {
          setNotification(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const deleteNote = (id) => {
    noteService.remove(id).then(() => {
      setNotes(notes.filter(note => note.id !== id))
    })
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setNotification({ text: 'Wrong credentials', type: 'error' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <Togglable buttonLabel='Login'>
      <LoginForm
        username={username}
        password={password}
        handleSubmit={handleLogin}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
      />
    </Togglable>
  )

  return (
    <div>
      <nav className='navbar'>
        <Link to='/'>Home</Link>
        <Link to='/notes'>Notes</Link>
        <Link to='/create'>New Note</Link>
      </nav>

      <Notification notification={notification} />

      {!user && loginForm()}
      {user && (
        <div>
          <p>{user.name} logged in</p>
          <button onClick={() => {
            window.localStorage.removeItem('loggedNoteappUser')
            setUser(null)
          }}>Log out</button>
        </div>
      )}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/notes' element= {
          <NoteList notes={notes} />
        } />
        <Route path='/notes/:id' element={
          <Note 
            note={note} 
            toggleImportance={toggleImportanceOf} 
            deleteNote={deleteNote} 
          />
        } />
        <Route path='/create' element={
          <NoteForm createNote={addNote} />
        } />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
