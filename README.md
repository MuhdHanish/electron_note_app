# Electron Note App

A Markdown note-taking application built with Electron, React, and TypeScript. This project was created as a learning exercise to understand Electron and desktop application development while implementing practical features like real-time Markdown editing and file system operations.

## About

This project serves as a hands-on exploration of:

- Building cross-platform desktop applications with Electron
- Implementing file system operations in a desktop environment
- Managing application state with Jotai
- Creating a responsive UI with React and Tailwind CSS
- Working with TypeScript in a full-stack application
- Real-time markdown editing and preview functionality

## Features

- Real-time Markdown editing and preview
- Clean, minimal interface
- Automatic saving
- Organized note management
- Fast and lightweight

## Technologies

- Electron
- React
- TypeScript
- Tailwind CSS
- MDX Editor
- Jotai
- Vite
- Lucide React

## Installation

1. Clone the repository:

```bash
git clone https://github.com/MuhdHanish/electron_note_app.git
cd electron_note_app
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

## Build Commands

Build for all platforms:

```bash
npm run build
```

Platform-specific builds:

```bash
npm run build:win    # Windows
npm run build:mac    # macOS
npm run build:linux  # Linux
```

## Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run typecheck` - Run TypeScript type checking

## Project Structure

```
.
├── README.md
├── build/
│   ├── entitlements.mac.plist
│   ├── icon.icns
│   ├── icon.ico
│   └── icon.png
├── electron-builder.yml
├── electron.vite.config.ts
├── eslint.config.mjs
├── src/
│   ├── main/
│   │   ├── index.ts
│   │   └── lib/
│   ├── preload/
│   │   ├── index.d.ts
│   │   └── index.ts
│   ├── renderer/
│   │   ├── index.html
│   │   └── src/
│   │       ├── App.tsx
│   │       ├── components/
│   │       ├── hooks/
│   │       ├── store/
│   │       └── utils/
│   └── shared/
│       ├── constance.ts
│       ├── models.ts
│       └── types.ts
├── tailwind.config.js
└── tsconfig.json
```

## Feedback

If you have any feedback, please reach me at [muhammedhanish11@gmail.com](mailto:muhammedhanish11@gmail.com) or connect with me on [LinkedIn](https://www.linkedin.com/in/muhdhanish/).

## Support

Show your support by 🌟 the project!!
