import { Sidebar, Content, RootLayout, DraggableTopBar, ActionButtonsRow } from '@/components'

function App(): JSX.Element {
  return (
    <>
      <DraggableTopBar />
      <RootLayout>
        <Sidebar className="p-2">
          <ActionButtonsRow className='flex justify-between mt-1'/>
        </Sidebar>
        <Content className="border-l border-l-white/20 bg-zinc-900/50"></Content>
      </RootLayout>
    </>
  )
}

export default App
