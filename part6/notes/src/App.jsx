import NoteForm from "./components/NoteForm"
import NoteList from "./components/NoteList"
import VisibilityFilter from "./components/VisibilityFilter"

function App() {
  return (
    <div>
      <NoteForm />
      <VisibilityFilter />
      <NoteList />
    </div>
  )
}

export default App
