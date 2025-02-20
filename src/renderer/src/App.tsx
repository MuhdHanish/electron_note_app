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

function App(): JSX.Element {
  return (
    <>
      <DraggableTopBar />
      <RootLayout>
        <Sidebar className="p-2">
          <ActionButtonsRow className="flex justify-between mt-1" />
          <NotePreviewList className="mt-4 space-y-1" />
        </Sidebar>
        <Content className="border-l border-l-white/20 bg-zinc-900/50">
          <FloatingNoteTitle className="pt-2.5" />
          <MarkdownEditor />
        </Content>
      </RootLayout>
    </>
  )
}

export default App
