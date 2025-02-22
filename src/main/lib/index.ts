import { APP_DIRECTORY_NAME, FILE_ENCODING, WELCOME_NOTE_FILE_NAME } from '@shared/constance'
import { NoteInfo } from '@shared/models'
import { CreateNote, DeleteNote, GetNotes, ReadNote, WriteNote } from '@shared/types'
import { dialog } from 'electron'
import { isEmpty} from 'lodash'
import { ensureDir, readdir, readFile, remove, stat, writeFile } from 'fs-extra'
import { homedir } from 'os'
import path from 'path'
import welcomeNoteFile from "../../../resources/welcome-note.md?asset"

export const getRootDir = () => {
  return `${homedir}/${APP_DIRECTORY_NAME}`
}

export const getNotes: GetNotes = async () => {
  const rootDir = getRootDir()

  await ensureDir(rootDir)

  const notesFileNames = await readdir(rootDir, {
    encoding: FILE_ENCODING,
    withFileTypes: false
  })

  const notes = notesFileNames?.filter((fileName) => fileName?.endsWith('.md'))

  if (isEmpty(notes)) {
    console.info('No notes found, creating a welcome note')

    const content = await readFile(welcomeNoteFile, FILE_ENCODING)

    await writeFile(`${rootDir}/${WELCOME_NOTE_FILE_NAME}`, content, FILE_ENCODING)

    notes.push(`${WELCOME_NOTE_FILE_NAME}`)
  }

  return Promise.all(notes?.map(getNoteInfoFromFileName))
}

export const getNoteInfoFromFileName = async (fileName: string): Promise<NoteInfo> => {
  const fileStats = await stat(`${getRootDir()}/${fileName}`)

  return {
    title: fileName.replace(/\.md$/, ''),
    updatedAt: fileStats.mtimeMs
  }
}

export const readNote: ReadNote = async (fileName) => {
  const rootDir = getRootDir()

  return readFile(`${rootDir}/${fileName}.md`, FILE_ENCODING)
}

export const writeNote: WriteNote = async (fileName, content) => {
  const rootDir = getRootDir()

  return writeFile(`${rootDir}/${fileName}.md`, content, FILE_ENCODING)
}

export const createNote: CreateNote = async () => {
  const rootDir = getRootDir()

  await ensureDir(rootDir)

  const { filePath, canceled } = await dialog.showSaveDialog({
    title: 'New note',
    defaultPath: `${rootDir}/Untitled.md`,
    buttonLabel: 'Create',
    properties: ['showOverwriteConfirmation'],
    showsTagField: false,
    filters: [
      {
        name: 'Markdown',
        extensions: ['md']
      }
    ]
  })

  if (canceled || !filePath) {
    console.info('Note creation canceled')
    return false
  }

  const { name: fileName, dir: parentDir } = path.parse(filePath)

  if (parentDir !== rootDir) {
    await dialog.showMessageBox({
      type: 'error',
      title: 'Creation failed',
      message: `All notes must be saved under ${rootDir}, 
      Avoid using other directories.`
    })

    return false
  }

  console.info(`Creating note: ${filePath}`)

  await writeFile(filePath, '')

  return fileName
}

export const deleteNote: DeleteNote = async (fileName) => {
  const rootDir = getRootDir()

  await ensureDir(rootDir)

  const { response } = await dialog.showMessageBox({
    type: 'warning',
    title: 'Delete note',
    message: `Are you sure you want to delete ${fileName}?`,
    buttons: ['Delete', 'Cancel'],
    defaultId: 1,
    cancelId: 1
  })

  if (response === 1) {
    console.info(`Note deletion canceled`)
    return false
  }

  console.info(`Deleting note: ${fileName}`)

  await remove(`${rootDir}/${fileName}.md`)

  return true
}
