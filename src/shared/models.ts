import { ComponentProps } from 'react'

export type ButtonProps = ComponentProps<'button'>

export type NoteInfo = {
  title: string
  updatedAt: number
}

export type NoteContent = string
