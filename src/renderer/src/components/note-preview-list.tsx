import { NOTES_MOCK } from '@/store/mocks'
import { ComponentProps } from 'react'
import { NotePreview } from './note-preview'

export const NotePreviewList = ({ ...props }: ComponentProps<'ul'>) => {
  return (
    <ul {...props}>
      {NOTES_MOCK?.map((note, index) => (
        <NotePreview {...note} key={`${note?.title}-${index}-${note?.updatedAt}`} />
      ))}
    </ul>
  )
}
