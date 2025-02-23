import { ActionButton } from '@/components'
import { createEmptyNoteAtom } from '@renderer/store'
import { ButtonProps } from '@shared/types'
import { useSetAtom } from 'jotai'
import { FilePen } from 'lucide-react'

export const NewNoteButton = ({ ...props }: ButtonProps) => {
  const createEmptyNote = useSetAtom(createEmptyNoteAtom)

  const handleCreation = async () => await createEmptyNote()

  return (
    <ActionButton onClick={handleCreation} {...props}>
      <FilePen className="size-3.5 text-zinc-300" />
    </ActionButton>
  )
}
