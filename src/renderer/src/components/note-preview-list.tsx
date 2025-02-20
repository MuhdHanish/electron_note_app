import { NOTES_MOCK } from '@/store/mocks'
import { ComponentProps } from 'react'
import { NotePreview } from './note-preview'
import { twMerge } from 'tailwind-merge'

export const NotePreviewList = ({ className, ...props }: ComponentProps<'ul'>) => {
  const notes = NOTES_MOCK
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
        <NotePreview {...note} key={`${note?.title}-${index}-${note?.updatedAt}`} />
      ))}
    </ul>
  )
}
