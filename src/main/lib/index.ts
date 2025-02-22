import { APP_DIRECTORY_NAME, FILE_ENCODING } from '@shared/constance'
import { NoteInfo } from '@shared/models'
import { CreateNote, GetNotes, ReadNote, WriteNote } from '@shared/types'
import { dialog } from 'electron'
import { ensureDir, readdir, readFile, stat, writeFile } from 'fs-extra'
import { homedir } from 'os'
import path from 'path'

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
