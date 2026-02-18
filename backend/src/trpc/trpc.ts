import { initTRPC } from '@trpc/server';

const t = initTRPC.create({
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      message:
        process.env.NODE_ENV === 'production'
          ? 'Internal server error'
          : error.message,
    };
  },
});

export const router = t.router;
export const publicProcedure = t.procedure;
