import { atom } from 'jotai'
import { NoteInfo } from '@shared/models'
import { NOTES_MOCK } from '@/store/mocks'

export const notesAtom = atom<NoteInfo[]>(NOTES_MOCK)

export const selectedNoteIndexAtom = atom<number | null>(null)

export const selectedNoteAtom = atom<NoteInfo | null>((get) => {
  const noteIndex = get(selectedNoteIndexAtom)
  const notes = get(notesAtom)
  return noteIndex !== null
    ? {
        ...notes[noteIndex],
        content: `### This is the content of ${notes[noteIndex]?.title}!`
      }
    : null
})
