import { atom } from 'jotai'
import { NoteInfo } from '@shared/models'
import { NOTES_MOCK } from '@/store/mocks'

export const notesAtom = atom<NoteInfo[]>(NOTES_MOCK)

export const selectedNoteIndexAtom = atom<number | null>(null)

export const selectedNoteAtom = atom((get) => {
  const noteIndex = get(selectedNoteIndexAtom)
  const notes = get(notesAtom)
  return noteIndex !== null
    ? {
        ...notes[noteIndex],
        content: `### This is the content of ${notes[noteIndex]?.title}!`
      }
    : null
})

export const createEmptyNoteAtom = atom(null, (get, set) => {
  const notes = get(notesAtom)

  const newNote = {
    title: `New Note ${notes.length + 1}`,
    updatedAt: new Date().getTime()
  }

  set(notesAtom, [newNote, ...notes?.filter((note) => note?.title !== newNote?.title)])
  set(selectedNoteIndexAtom, 0)
})

export const deleteNoteAtom = atom(null, (get, set) => {
  const notes = get(notesAtom)

  const selectedNote = get(selectedNoteAtom)
  if (!selectedNote) return

  set(
    notesAtom,
    notes?.filter((note) => note?.title !== selectedNote?.title)
  )
  set(selectedNoteIndexAtom, null)
})
