import { create } from 'zustand'

const useNoteStore = create(set => ({
  notes: [],
  filter: 'all',
  actions: {
    add: note => set(
      state => ({ notes: [...state.notes, note] })
    ),
    toggleImportance: id => set(
      state => ({ notes: state.notes.map(note =>
        note.id === id ? { ...note, important: !note.important } : note
      ) })
    ),
    setFilter: value => set(() => ({ filter: value })),
    initialize: notes => set(() => ({ notes }))
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
