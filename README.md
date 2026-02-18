# Feedback App

A full-stack feedback board built with **React**, **TypeScript**, **tRPC**, **Drizzle ORM**, and **PostgreSQL**.

The application allows users to submit feedback and provides an admin interface to manage feedback entries, with end-to-end type safety across the stack.

---

## What This App Does

### User-facing experience

- The **home page** is a public feedback form.
- Any user can:
    - Submit feedback
    - Give a rating
    - Optionally include their name

- No authentication is required to submit feedback.

### Admin experience

- Clicking **Admin login** navigates to the admin dashboard.
- Admins can:
    - View all submitted feedback
    - Edit feedback entries
    - Delete feedback entries

- Clicking **Logout** returns the user to the public feedback form.

This separation keeps the user experience simple while giving admins full control.

---

## Features

- Public feedback submission form
- Admin dashboard for managing feedback
- Full CRUD functionality
- End-to-end type safety with tRPC
- PostgreSQL database access via Drizzle ORM
- Unit-tested backend logic
- Modern frontend tooling with Vite and React

---

## Project Structure

- `frontend/` – React + TypeScript client (Vite)
- `backend/` – Express + tRPC API server

Each package contains its own README with setup and usage details.

---

## Getting Started

Follow these steps to run the project locally.

---

### 1. Clone the repository

```bash
git clone <repository-url>
cd feedback-app
```

---

### 2. Set up the database

Make sure you have **PostgreSQL** running locally or remotely.

Create a new database:

```sql
CREATE DATABASE feedback_app;
```

---

### 3. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
DATABASE_URL=postgres://USER:PASSWORD@HOST:PORT/feedback_app
NODE_ENV=development
```

#### Environment variables

| Variable       | Description                                             |
| -------------- | ------------------------------------------------------- |
| `DATABASE_URL` | PostgreSQL connection string                            |
| `NODE_ENV`     | Application environment (`development` or `production`) |

- `development` enables detailed error messages and stack traces.
- `production` hides internal errors and stack traces from API responses.

---

### 4. Create database tables (Drizzle)

Push the schema to the database using Drizzle Kit:

```bash
npx drizzle-kit push
```

This will:

- Create the required tables
- Sync your schema with the database
- Run safely without data loss in development

---

### 5. Run the backend server

```bash
npm run dev
```

The backend server will start on its configured port.

---

### 6. Set up the frontend

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

## Usage Flow

1. Visit `http://localhost:5173`
2. Submit feedback as a normal user
3. Click **Admin login** to access the admin dashboard
4. View, edit, or delete feedback
5. Click **Logout** to return to the public feedback form

---

## Production Build (Optional)

### Backend

Set the environment to production:

```bash
export NODE_ENV=production
```

Then build and start the server:

```bash
cd backend
npm run build
npm start
```

### Frontend

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

## Notes

- Ensure `NODE_ENV=production` is set in production deployments to prevent internal errors from being exposed.
- Database migrations should be reviewed before running `drizzle-kit push` in production environments.

---

For more details, see the individual README files in the `frontend/` and `backend/` directories.
