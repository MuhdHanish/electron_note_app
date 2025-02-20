import { NOTES_MOCK } from '@/store/mocks'
import { ComponentProps } from 'react'

export const NotePreviewList = ({ ...props }: ComponentProps<'ul'>) => {
  return (
    <ul {...props}>
      {NOTES_MOCK?.map((note, index) => <li key={`${index}-${note?.title}`}>{note?.title}</li>)}
    </ul>
  )
}
