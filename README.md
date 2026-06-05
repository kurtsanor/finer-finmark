# Finer-FinMark

Prerequisites

- Node.js and npm
- Git
- Docker Desktop (running)
- VS Code

Running the application

1. Clone the repo

```bash
git clone https://github.com/kurtsanor/finer-finmark.git
cd finer-finmark
```

2. Start local MongoDB (Docker Compose)

```bash
docker compose up -d
```

3. Open the project in VS Code and use two terminals

- In VS Code open the project.
- In the first terminal (frontend):

```bash
cd frontend
npm install
npm run dev
```

- In the second terminal (backend):

```bash
cd backend
npm install
npm run dev
```

Accessing the frontend

- Open your browser at `http://localhost:5173/sign-in`.

Notes

- No `.env` edits are required for a basic local run; the Docker Compose MongoDB is used by default.
- Start Docker first, then the frontend/backend processes in separate terminals.

The app will be available locally after the frontend and backend are running.
