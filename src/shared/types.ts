import { NoteContent, NoteInfo } from './models'
import { ComponentProps } from 'react'

export type ButtonProps = ComponentProps<'button'>

export type GetNotes = () => Promise<NoteInfo[]>
export type ReadNote = (title: NoteInfo['title']) => Promise<NoteContent>
export type WriteNote = (title: NoteInfo['title'], content: NoteContent) => Promise<void>
export type CreateNote = () => Promise<NoteInfo['title'] | false>
export type DeleteNote = (title: NoteInfo['title']) => Promise<boolean>
