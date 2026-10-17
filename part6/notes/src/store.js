import { create } from 'zustand'
import noteService from './services/note'

const useNoteStore = create((set, get) => ({
  notes: [],
  filter: 'all',
  actions: {
    add: async (content) => {
      const newNote = await noteService.createNew(content)
      set(state => ({ notes: [...state.notes, newNote] }))
    },
    toggleImportance: async (id) => {
      const note = get().notes.find(note => note.id === id)
      const updated = await noteService.update(
        id, { ...note, important: !note.important}
      )
      set(state => ({
        notes: state.notes.map((note) => note.id === id ? updated : note)
      }))
    },
    setFilter: value => set(() => ({ filter: value })),
    initialize: async () => {
      const notes = await noteService.getAll()
      set(() => ({ notes }))
    }
  }
}))

export const useNotes = () => {
  const notes = useNoteStore((state) => state.notes)
  const filter = useNoteStore((state) => state.filter)

  if (filter === 'important') return notes.filter(note => note.important)
  if (filter === 'notimportant') return notes.filter(note => !note.important)

  return notes
}
export const useNoteActions = () => useNoteStore(state => state.actions)
