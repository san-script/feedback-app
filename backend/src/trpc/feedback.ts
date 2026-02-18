import { desc, eq } from 'drizzle-orm';
import { z } from 'zod';

import { db } from '../db';
import { feedback } from '../db/schema';
import { publicProcedure, router } from './trpc';

export const feedbackRouter = router({
  // READ: list all
  getAll: publicProcedure.query(async () => {
    return db.select().from(feedback).orderBy(desc(feedback.createdAt));
  }),

  // READ: single item (optional but good)
  getById: publicProcedure
    .input(z.object({ id: z.number().int() }))
    .query(async ({ input }) => {
      const [item] = await db
        .select()
        .from(feedback)
        .where(eq(feedback.id, input.id));

      return item;
    }),

  // CREATE
  create: publicProcedure
    .input(
      z.object({
        message: z.string().min(1),
        rating: z.number().int().min(1).max(10),
        author: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const [created] = await db
        .insert(feedback)
        .values({
          message: input.message,
          rating: input.rating,
          author: input.author,
        })
        .returning();

      return created;
    }),

  // UPDATE
  update: publicProcedure
    .input(
      z.object({
        id: z.number().int(),
        message: z.string().min(1),
        rating: z.number().int().min(1).max(10),
        author: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;

      const [updated] = await db
        .update(feedback)
        .set(data)
        .where(eq(feedback.id, id))
        .returning();

      return updated;
    }),

  // DELETE
  delete: publicProcedure
    .input(z.object({ id: z.number().int() }))
    .mutation(async ({ input }) => {
      await db.delete(feedback).where(eq(feedback.id, input.id));
      return { success: true };
    }),
});
