import { useNotes } from "../store"

const NoteList = () => {
  const notes = useNotes()

  return (
    <ul>
      {notes.map(note => (
        <li key={note.id}>
          {note.important ? <strong>{note.content}</strong> : note.content}
        </li>
      ))}
    </ul>
  )
}

export default NoteList
