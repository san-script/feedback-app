import * as trpcExpress from '@trpc/server/adapters/express';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';

import { appRouter } from './trpc/router';

const app = express();
const PORT = 4000;

// --------------------
// Middleware
// --------------------
app.use(cors());
app.use(express.json()); //  body parser FIRST

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// --------------------
// Routes
// --------------------
app.get('/', (_req, res) => {
  res.send('Backend running');
});

app.post('/test', (req, res) => {
  console.log('headers:', req.headers);
  console.log('test body:', req.body);
  res.json(req.body);
});

//  tRPC MUST come before error handler
app.use('/trpc', (req, _res, next) => {
  console.log('tRPC request:', req.method, req.url);
  console.log('tRPC body:', JSON.stringify(req.body, null, 2));
  next();
});
app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
  }),
);

// --------------------
// Error handler
// --------------------
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

// --------------------
// Start server
// --------------------
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});

export default app;
