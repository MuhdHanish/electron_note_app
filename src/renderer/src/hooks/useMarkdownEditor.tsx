import { MDXEditorMethods } from '@mdxeditor/editor'
import { saveNoteAtom, selectedNoteAtom } from '@renderer/store'
import { SAVING_INTERVAL } from '@shared/constance'
import { useAtomValue, useSetAtom } from 'jotai'
import { throttle } from 'lodash'
import { useRef } from 'react'

export const useMarkdownEditor = () => {
  const selectedNote = useAtomValue(selectedNoteAtom)
  const saveNote = useSetAtom(saveNoteAtom)
  const editorRef = useRef<MDXEditorMethods | null>(null)

  const handleAutoSaving = throttle(
    async () => {
      if (!selectedNote) return

      console.info(`Auto saving: ${selectedNote?.title}`)

      await saveNote(selectedNote?.content)
    },
    SAVING_INTERVAL,
    {
      leading: false,
      trailing: true
    }
  )

  return {
    selectedNote,
    editorRef,
    handleAutoSaving
  }
}
