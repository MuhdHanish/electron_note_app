import { ComponentProps } from 'react'
import { NotePreview } from '@/components'
import { twMerge } from 'tailwind-merge'
import { useNotesList } from '@/hooks'

export const NotePreviewList = ({ className, ...props }: ComponentProps<'ul'>) => {
  const { notes, selectedNoteIndex, handleNoteSelect } = useNotesList({ onSelect: () => {} })
  if (!notes?.length) {
    return (
      <ul {...props} className={twMerge('text-center pt-4', className)}>
        <span>No Notes Yet!</span>
      </ul>
    )
  }

  return (
    <ul {...props} className={twMerge(className)}>
      {notes?.map((note, index) => (
        <NotePreview
          {...note}
          isActive={selectedNoteIndex === index}
          onClick={handleNoteSelect(index)}
          key={`${note?.title}-${index}-${note?.updatedAt}`}
        />
      ))}
    </ul>
  )
}
