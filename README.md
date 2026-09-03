# Todo-App

A simple, local-first TODO list web app built with [Next.js](https://nextjs.org) (App Router), React, TypeScript, and [Tailwind CSS](https://tailwindcss.com).

## Features

- Create new tasks via an input field
- See the list of tasks at a glance
- Mark tasks as completed with a checkbox
- Delete tasks
- Progress summary (x of y tasks completed)
- Tasks persist in the browser via `localStorage`
- Loading, empty, and error states with accessible markup

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command       | Description                  |
| ------------- | ---------------------------- |
| `npm run dev` | Start the development server |
| `npm run build` | Build the production bundle  |
| `npm run start` | Run the production build     |
| `npm run lint` | Run ESLint                   |

## Stack

- Next.js 15 (App Router) + React 19
- TypeScript (strict mode)
- Tailwind CSS 4
- No backend or database — data lives in the browser.