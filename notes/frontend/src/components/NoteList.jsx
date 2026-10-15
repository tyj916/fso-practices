import { Link } from 'react-router-dom'

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } 
from '@mui/material'

const NoteList = ({ notes }) => {
  return (
    <div>
      <h2>Notes</h2>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Content</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Important</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notes.map(note => (
              <TableRow key={note.id}>
                <TableCell>
                  <Link to={`/notes/${note.id}`}>{note.content}</Link>
                </TableCell>
                <TableCell>
                  {note.user.name}
                </TableCell>
                <TableCell>
                  {note.important ? 'yes' : ''}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default NoteList
