import { MDXEditorMethods } from '@mdxeditor/editor'
import { saveNoteAtom, selectedNoteAtom } from '@renderer/store'
import { useAtomValue, useSetAtom } from 'jotai'
import { useRef } from 'react'

export const useMarkdownEditor = () => {
  const selectedNote = useAtomValue(selectedNoteAtom)
  const saveNote = useSetAtom(saveNoteAtom)
  const editorRef = useRef<MDXEditorMethods | null>(null)

  const handleAutoSaving = async () => { 
    if (!selectedNote) return
    
    console.info(`Auto saving: ${selectedNote?.title}`)

    await saveNote(selectedNote?.content)
  }

  return {
    selectedNote,
    editorRef,
    handleAutoSaving
  }
}
