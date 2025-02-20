import { ActionButton } from '@/components'
import { ButtonProps } from '@shared/models'
import { FilePen } from 'lucide-react'

export const NewNoteButton = ({ ...props }: ButtonProps) => {
  return (
    <ActionButton {...props}>
      <FilePen className="size-3.5 text-zinc-300" />
    </ActionButton>
  )
}
