import { NoteInfo } from './models'
import { ComponentProps } from 'react'

export type ButtonProps = ComponentProps<'button'>

export type GetNotes = () => Promise<NoteInfo[]>
