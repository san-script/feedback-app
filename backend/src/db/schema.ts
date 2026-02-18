import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const feedback = pgTable('feedback', {
  id: serial('id').primaryKey(),
  message: text('message').notNull(),
  rating: integer('rating').notNull(),
  author: text('author'),
  createdAt: timestamp('created_at').defaultNow(),
});
