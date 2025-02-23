import { ActionButton } from '@/components'
import { deleteNoteAtom } from '@renderer/store'
import { ButtonProps } from '@shared/types'
import { useSetAtom } from 'jotai'
import { Trash } from 'lucide-react'

export const DeleteNoteButton = ({ ...props }: ButtonProps) => {
  const deleteNote = useSetAtom(deleteNoteAtom)

  const handleDeletion = async () => await deleteNote()

  return (
    <ActionButton onClick={handleDeletion} {...props}>
      <Trash className="size-3.5 text-zinc-300" />
    </ActionButton>
  )
}
