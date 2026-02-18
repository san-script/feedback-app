## About

This is the backend service for the Feedback App, generated with [express-generator-typescript](https://github.com/seanpmaxwell/express-generator-typescript).

It provides an Express-based API with TypeScript, unit testing via Vitest, and a standard build pipeline for development and production.

---

## Available Scripts

### `npm run clean-install`

Removes `node_modules/` and `package-lock.json`, then reinstalls all dependencies.

---

### `npm run dev` / `npm run dev:watch`

Runs the server in development mode with hot reloading.

> **Note**: Development mode uses `swc` for performance and **does not perform TypeScript type-checking**.
> Run `npm run type-check` or rely on your IDE for type safety.

---

### `npm test`

Runs unit tests using [Vitest](https://vitest.dev/guide/).

---

### `npm run lint`

Runs ESLint to check for linting issues.

---

### `npm run build`

Builds the project for production.

---

### `npm start`

Runs the production build (the project must be built first).

---

### `npm run type-check`

Runs the TypeScript compiler in type-checking mode.

---

## Additional Notes

* If you encounter issues with `bcrypt` on macOS during development, you may need to rebuild it from source:

  ```bash
  npm rebuild bcrypt --build-from-source
  ```
