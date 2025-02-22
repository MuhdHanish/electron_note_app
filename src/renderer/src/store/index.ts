import { atom } from 'jotai'
import { NoteContent, NoteInfo } from '@shared/models'
import { unwrap } from 'jotai/utils'

const loadNotes = async () => {
  const notes = await window.context.getNotes()
  return notes?.sort((a, b) => b?.updatedAt - a?.updatedAt)
}

const notesAtomAsync = atom<NoteInfo[] | Promise<NoteInfo[]>>(loadNotes())

export const notesAtom = unwrap(notesAtomAsync, (prev) => prev ?? [])

export const selectedNoteIndexAtom = atom<number | null>(null)

const selectedNoteAtomAsync = atom(async (get) => {
  const noteIndex = get(selectedNoteIndexAtom)
  const notes = get(notesAtom)

  if (noteIndex === null || !notes) return null

  const selectedNote = notes[noteIndex]
  if (!selectedNote?.title) return null

  try {
    const noteContent = await window.context.readNote(selectedNote?.title)

    return {
      ...selectedNote,
      content: noteContent
    }
  } catch (error) {
    console.error('Error reading note:', error)
    return null
  }
})

export const selectedNoteAtom = unwrap(selectedNoteAtomAsync, (prev) => prev ?? null)

export const createEmptyNoteAtom = atom(null, async (get, set) => {
  const notes = get(notesAtom)
  if (!notes) return

  try {
    const title = await window.context.createNote()
    if (!title) return

    const newNote = { title, updatedAt: Date.now() }

    set(notesAtom, [newNote, ...notes?.filter((note) => note?.title !== newNote?.title)])
    set(selectedNoteIndexAtom, 0)
  } catch (error) {
    console.error('Error creating note:', error)
  }
})

export const saveNoteAtom = atom(null, async (get, set, newContent: NoteContent) => {
  const notes = get(notesAtom)
  if (!notes) return

  const selectedNote = get(selectedNoteAtom)
  if (!selectedNote) return

  try {
    await window.context.writeNote(selectedNote?.title, newContent)

    set(
      notesAtom,
      notes?.map((note) => {
        if (note?.title === selectedNote?.title) {
          return {
            ...note,
            updatedAt: new Date().getTime()
          }
        }
        return note
      })
    )
  } catch (error) {
    console.error('Error saving note:', error)
  }
})

export const deleteNoteAtom = atom(null, async (get, set) => {
  const notes = get(notesAtom)
  if (!notes) return

  const selectedNote = get(selectedNoteAtom)
  if (!selectedNote) return

  try {
    const isDeleted = await window.context.deleteNote(selectedNote?.title)
    if (!isDeleted) return

    set(
      notesAtom,
      notes?.filter((note) => note?.title !== selectedNote?.title)
    )
    set(selectedNoteIndexAtom, null)
  } catch (error) {
    console.error('Error deleting note:', error)
  }
})
