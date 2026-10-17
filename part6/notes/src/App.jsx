import { useEffect } from "react"
import noteService from './services/note'
import NoteForm from "./components/NoteForm"
import NoteList from "./components/NoteList"
import VisibilityFilter from "./components/VisibilityFilter"
import { useNoteActions } from "./store"

function App() {
  const { initialize } = useNoteActions()

  useEffect(() => {
    noteService.getAll().then(notes => initialize(notes))
  }, [initialize])
  
  return (
    <div>
      <NoteForm />
      <VisibilityFilter />
      <NoteList />
    </div>
  )
}

export default App
