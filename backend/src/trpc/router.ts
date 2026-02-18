import { feedbackRouter } from './feedback';
import { router } from './trpc';

export const appRouter = router({
  feedback: feedbackRouter,
});

export type AppRouter = typeof appRouter;
