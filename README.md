# ToDoApp-Fullstack
A fullstack ToDo application built with a modern frontend (Vue 3 + Vite + TypeScript) and a simple Node.js/Express backend. This project demonstrates a basic yet complete workflow for managing tasks with a RESTful API and a reactive frontend.

## Features
- Add, edit, delete, and list to-do items
- Persistent storage via backend API
- Modern UI with Vue 3 Composition API
- Easy local development and deployment

- Project Structure
- ToDoApp-Fullstack/
├── backEndServer/    # Node.js + Express backend
└── todo-app/         # Vue 3 + Vite frontend

## Tech Stack
- Frontend: Vue 3, Vite, TypeScript
- Backend: Node.js, Express
- database:MongoDB
## Getting Started
### Prerequisites
- Node.js (v14 or higher recommended)
- npm

### 1. Clone the repository
  
`git clone https://github.com/your-username/ToDoApp-Fullstack.git`

`cd ToDoApp-Fullstack`
### 2. Setup and Run Backend

`cd backEndServer`

`npm install`

 `npm start`

The backend server will start (default: http://localhost:3000/ ).

### 3. Setup and Run Frontend
Open a new terminal:

`cd todo-app`

`npm install`

`npm run dev`

### 4.usage
- Open your browser and navigate to http://localhost:5173/
- Add, edit, or delete your to-do items. All changes are synced with the backend.
## Configuration
- Backend API URL and port can be configured in backEndServer/.env .
- Frontend API endpoint can be set in todo-app/src/api/todoApi.ts or via environment variables.
## License
MIT

Feel free to customize this README for your own project or add more details as needed.
