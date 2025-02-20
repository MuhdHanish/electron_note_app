import {
  Sidebar,
  Content,
  RootLayout,
  DraggableTopBar,
  ActionButtonsRow,
  NotePreviewList,
  MarkdownEditor,
  FloatingNoteTitle
} from '@/components'
import { useRef } from 'react'

function App(): JSX.Element {
  const contentContainerRef = useRef<HTMLDivElement | null>(null)

  const resetScroll = () => {
    if (contentContainerRef?.current) {
      contentContainerRef.current.scrollTop = 0
    }
  }

  return (
    <>
      <DraggableTopBar />
      <RootLayout>
        <Sidebar className="p-2">
          <ActionButtonsRow className="flex justify-between mt-1" />
          <NotePreviewList className="mt-4 space-y-1" onSelect={resetScroll} />
        </Sidebar>
        <Content ref={contentContainerRef} className="border-l border-l-white/20 bg-zinc-900/50">
          <FloatingNoteTitle className="pt-2.5" />
          <MarkdownEditor />
        </Content>
      </RootLayout>
    </>
  )
}

export default App
