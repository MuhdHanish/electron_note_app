import { ComponentProps } from 'react'
import { DeleteNoteButton, NewNoteButton } from './buttons'

export const ActionButtonsRow = ({ ...props }: ComponentProps<'div'>) => {
  return (
    <div {...props}>
      <NewNoteButton />
      <DeleteNoteButton />
    </div>
  )
}
