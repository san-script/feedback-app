import * as trpcExpress from '@trpc/server/adapters/express';
import cors from 'cors';
import 'dotenv/config';
import express, { Application, NextFunction, Request, Response } from 'express';
import morgan from 'morgan';

import { appRouter } from './trpc/router';

/* -----------------------------------------------------
   App & config
----------------------------------------------------- */

const app: Application = express();

const PORT: number = Number(process.env.PORT) || 4000;
const IS_PROD = process.env.NODE_ENV === 'production';

/* -----------------------------------------------------
   Middleware
----------------------------------------------------- */

app.use(cors());
app.use(express.json()); // body parser FIRST

if (!IS_PROD) {
  app.use(morgan('dev'));
}

/* -----------------------------------------------------
   Health check
----------------------------------------------------- */

app.get('/', (_req: Request, res: Response): void => {
  res.send('Backend running');
});

/* -----------------------------------------------------
   tRPC
----------------------------------------------------- */

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: ({ req, res }) => ({
      req,
      res,
    }),
  }),
);

/* -----------------------------------------------------
   Error handler
----------------------------------------------------- */

app.use(
  (err: unknown, _req: Request, res: Response, _next: NextFunction): void => {
    console.error(err);

    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Unknown server error' });
    }
  },
);

/* -----------------------------------------------------
   Start server
----------------------------------------------------- */

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});

export default app;
