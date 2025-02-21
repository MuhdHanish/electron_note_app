import { APP_DIRECTORY_NAME, FILE_ENCODING } from '@shared/constance'
import { NoteInfo } from '@shared/models'
import { GetNotes } from '@shared/types'
import { ensureDir, readdir, stat } from 'fs-extra'
import { homedir } from 'os'

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
