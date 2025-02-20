import { ComponentProps } from 'react'
import { DeleteNoteButton, NewNoteButton } from '@/components'
import { useAtomValue } from 'jotai'
import { selectedNoteAtom } from '@renderer/store'

export const ActionButtonsRow = ({ ...props }: ComponentProps<'div'>) => {
  const selectedNote = useAtomValue(selectedNoteAtom)

  return (
    <div {...props}>
      <NewNoteButton />
      {selectedNote && <DeleteNoteButton />}
    </div>
  )
}
