import { Sidebar, Content, RootLayout, DraggableTopBar } from '@/components'

function App(): JSX.Element {
  return (
    <>
      <DraggableTopBar />
      <RootLayout>
        <Sidebar className="p-2"></Sidebar>
        <Content className="border-l border-l-white/20 bg-zinc-900/50"></Content>
      </RootLayout>
    </>
  )
}

export default App
