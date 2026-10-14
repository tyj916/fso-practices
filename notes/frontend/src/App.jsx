import { useState, useEffect } from 'react'
import noteService from './services/note.js'
import { 
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import Home from './components/Home.jsx'
import NoteList from './components/NoteList.jsx'
import Footer from './components/Footer.jsx'

const App = () => {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    noteService.getAll().then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  return (
    <Router>
      <nav className='navbar'>
        <Link to='/'>Home</Link>
        <Link to='/notes'>Notes</Link>
      </nav>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/notes' element= {
          <NoteList notes={notes} setNotes={setNotes} />
        } />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
