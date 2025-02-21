import { MDXEditorMethods } from '@mdxeditor/editor'
import { saveNoteAtom, selectedNoteAtom } from '@renderer/store'
import { SAVING_INTERVAL } from '@shared/constance'
import { NoteContent } from '@shared/models'
import { useAtomValue, useSetAtom } from 'jotai'
import { throttle } from 'lodash'
import { useRef } from 'react'

export const useMarkdownEditor = () => {
  const selectedNote = useAtomValue(selectedNoteAtom)
  const saveNote = useSetAtom(saveNoteAtom)
  const editorRef = useRef<MDXEditorMethods | null>(null)

  const handleAutoSaving = throttle(
    async (content: NoteContent) => {
      if (!selectedNote) return

      console.info(`Auto saving: ${selectedNote?.title}`)

      await saveNote(content)
    },
    SAVING_INTERVAL,
    {
      leading: false,
      trailing: true
    }
  )

  const handleBlur = async () => {
    if (!selectedNote) return
    
    handleAutoSaving.cancel()
    const content = editorRef?.current?.getMarkdown()
    if (!content) return

    await saveNote(content)
  }

  return {
    selectedNote,
    editorRef,
    handleAutoSaving,
    handleBlur
  }
}
