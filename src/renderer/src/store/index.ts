import { atom } from 'jotai'
import { NoteInfo } from '@shared/models'
import { unwrap } from 'jotai/utils'

const loadNotes = async () => {
  const notes = await window.context.getNotes()
  return notes?.sort((a, b) => b?.updatedAt - a?.updatedAt)
}

const notesAtomAsync = atom<NoteInfo[] | Promise<NoteInfo[]>>(loadNotes())

export const notesAtom = unwrap(notesAtomAsync, (prev) => prev)

export const selectedNoteIndexAtom = atom<number | null>(null)

const selectedNoteAtomAsync = atom(async (get) => {
  const noteIndex = get(selectedNoteIndexAtom)
  const notes = get(notesAtom)

  if (noteIndex === null || !notes) return null

  const selectedNote = notes[noteIndex]
  const noteContent = await window.context.readNote(selectedNote?.title)

  return {
    ...selectedNote,
    content: noteContent
  }
})

export const selectedNoteAtom = unwrap(
  selectedNoteAtomAsync,
  (prev) => prev ?? { title: '', content: '', updatedAt: Date.now() }
)

export const createEmptyNoteAtom = atom(null, (get, set) => {
  const notes = get(notesAtom)

  if (!notes) return

  const newNote = {
    title: `New Note ${notes?.length + 1}`,
    updatedAt: new Date().getTime()
  }

  set(notesAtom, [newNote, ...notes?.filter((note) => note?.title !== newNote?.title)])
  set(selectedNoteIndexAtom, 0)
})

export const deleteNoteAtom = atom(null, (get, set) => {
  const notes = get(notesAtom)

  if (!notes) return

  const selectedNote = get(selectedNoteAtom)
  if (!selectedNote) return

  set(
    notesAtom,
    notes?.filter((note) => note?.title !== selectedNote?.title)
  )
  set(selectedNoteIndexAtom, null)
})
