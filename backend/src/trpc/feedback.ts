import { TRPCError } from '@trpc/server';
import { desc, eq } from 'drizzle-orm';
import { z } from 'zod';

import { db } from '../db';
import { feedback } from '../db/schema';
import { publicProcedure, router } from './trpc';

/* -----------------------------------------------------
   Zod schemas (single source of truth)
----------------------------------------------------- */

const feedbackIdSchema = z.object({
  id: z.number().int(),
});

const feedbackCreateSchema = z.object({
  message: z.string().min(1),
  rating: z.number().int().min(1).max(10),
  author: z.string().optional(),
});

const feedbackUpdateSchema = z.object({
  id: z.number().int(),
  message: z.string().min(1).optional(),
  rating: z.number().int().min(1).max(10).optional(),
  author: z.string().optional(),
});

/* -----------------------------------------------------
   Inferred input types (frontend-safe exports)
----------------------------------------------------- */

export type FeedbackIdInput = z.infer<typeof feedbackIdSchema>;
export type FeedbackCreateInput = z.infer<typeof feedbackCreateSchema>;
export type FeedbackUpdateInput = z.infer<typeof feedbackUpdateSchema>;

/* -----------------------------------------------------
   Router
----------------------------------------------------- */

export const feedbackRouter = router({
  // READ: list all
  getAll: publicProcedure.query(async () => {
    return db.select().from(feedback).orderBy(desc(feedback.createdAt));
  }),

  // READ: single item
  getById: publicProcedure.input(feedbackIdSchema).query(async ({ input }) => {
    const [item] = await db
      .select()
      .from(feedback)
      .where(eq(feedback.id, input.id));

    if (!item) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Feedback not found',
      });
    }

    return item;
  }),

  // CREATE
  create: publicProcedure
    .input(feedbackCreateSchema)
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

  // UPDATE (partial updates allowed)
  update: publicProcedure
    .input(feedbackUpdateSchema)
    .mutation(async ({ input }) => {
      const { id, ...data } = input;

      if (Object.keys(data).length === 0) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'No fields provided for update',
        });
      }

      const [updated] = await db
        .update(feedback)
        .set(data)
        .where(eq(feedback.id, id))
        .returning();

      if (!updated) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Feedback not found',
        });
      }

      return updated;
    }),

  // DELETE
  delete: publicProcedure
    .input(feedbackIdSchema)
    .mutation(async ({ input }) => {
      const result = await db
        .delete(feedback)
        .where(eq(feedback.id, input.id))
        .returning({ id: feedback.id });

      if (result.length === 0) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Feedback not found',
        });
      }

      return { success: true } as const;
    }),
});
