import { create } from 'zustand'

const useNoteStore = create(set => ({
  notes: [],
  actions: {
    add: note => set(
      state => ({ notes: [...state.note, note] })
    )
  }
}))

export const useNotes = () => useNoteStore(state => state.notes)
export const useNoteActions = () => useNoteStore(state => state.actions)
