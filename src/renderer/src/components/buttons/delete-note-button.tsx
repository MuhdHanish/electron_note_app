import { ActionButton } from '@/components'
import { ButtonProps } from '@renderer/types'
import { Trash } from 'lucide-react'

export const DeleteNoteButton = ({ ...props }: ButtonProps) => {
  return (
    <ActionButton {...props}>
      <Trash className="size-4 text-zinc-300" />
    </ActionButton>
  )
}
