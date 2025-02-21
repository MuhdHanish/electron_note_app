// import { ElectronAPI } from '@electron-toolkit/preload'

import { GetNotes, ReadNote } from '@shared/types'

export {}

declare global {
  interface Window {
    // electron: ElectronAPI
    context: {
      locale: string
      getNotes: GetNotes
      readNote: ReadNote
    }
  }
}
