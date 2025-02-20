import { NoteInfo } from '@shared/models'

const randomDate = () => Date.now() - Math.floor(Math.random() * 1000000000)

export const NOTES_MOCK: NoteInfo[] = [
  { title: 'Welcome 👋', updatedAt: new Date().getTime() },
  { title: 'Understanding Closures', updatedAt: randomDate() },
  { title: 'Async vs Sync in JS', updatedAt: randomDate() },
  { title: 'Docker Basics', updatedAt: randomDate() },
  { title: 'REST vs GraphQL', updatedAt: randomDate() }
]
