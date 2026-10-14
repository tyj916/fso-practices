import { useNavigate, useParams } from "react-router-dom"

const Note = ({ note, toggleImportance, deleteNote }) => {
  const id = useParams().id
  const navigate = useNavigate()

  if (!note) return null

  const label = note.important ? 'make not important' : 'make important'

  const handleDelete = () => {
    const confirm = window.confirm(`Delete note "${note.content}"?`)
    if (confirm) {
      deleteNote(id)
      navigate('/notes')
    }
  }

  return (
    <li className='note'>
      <span>{note.content}</span>
      <button onClick={() => toggleImportance(id)}>{label}</button>
      <button onClick={handleDelete}>delete</button>
    </li>
  )
}

export default Note
