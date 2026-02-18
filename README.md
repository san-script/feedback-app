# Feedback App

A full-stack feedback board built with **React**, **TypeScript**, **tRPC**, **Drizzle ORM**, and **PostgreSQL**.

The application supports creating, reading, updating, and deleting feedback entries, with a typed end-to-end API and a clean separation between frontend and backend.

---

## Features

- Full CRUD functionality for feedback
- End-to-end type safety with tRPC
- PostgreSQL database access via Drizzle ORM
- Unit-tested backend logic
- Modern frontend tooling with Vite and React

---

## Project Structure

- `frontend/` – React + TypeScript client
- `backend/` – Express + tRPC API server

Each package contains its own README with setup and usage details.

---

## Getting Started

Follow these steps to run the project locally.

### 1. Clone the repository

```bash
git clone <repository-url>
cd feedback-app
```

---

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory and add your database connection string:

```env
DATABASE_URL=postgres://USER:PASSWORD@HOST:PORT/DATABASE_NAME
```

Run the backend in development mode:

```bash
npm run dev
```

The backend server will start on its configured port.

---

### 3. Set up the frontend

Open a new terminal window:

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at:

```
http://localhost:5173
```

---

### 4. (Optional) Production build

To build and run the apps in production mode:

**Backend**

```bash
cd backend
npm run build
npm start
```

**Frontend**

```bash
cd frontend
npm run build
npm run preview
```

The frontend preview will be available at:

```
http://localhost:4173
```

---

For more details, see the individual README files in the `frontend/` and `backend/` directories.
