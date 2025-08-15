import { jsonb, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { user } from '@/db/schema/better-auth';
import { relations, sql } from 'drizzle-orm';

export const notebooks = pgTable('notebooks', {
    id: text('id')
        .primaryKey()
        .default(sql`gen_random_uuid()`),
    name: text('name').notNull(),
    userId: text('user_id')
        .notNull()
        .references(() => user.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').$defaultFn(() => new Date()),
    updatedAt: timestamp('updated_at').$defaultFn(() => new Date()),
});

export const notes = pgTable('notes', {
    id: text('id')
        .primaryKey()
        .default(sql`gen_random_uuid()`),
    title: text('title').notNull(),
    content: jsonb('content').notNull(),
    notebookId: text('notebook_id')
        .notNull()
        .references(() => notebooks.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').$defaultFn(() => new Date()),
    updatedAt: timestamp('updated_at').$defaultFn(() => new Date()),
});

export type Notebook = typeof notebooks.$inferSelect & {
    notes: Note[];
};
export type InsertNotebook = typeof notebooks.$inferInsert;
export type Note = typeof notes.$inferSelect;
export type InsertNote = typeof notes.$inferInsert;

export const notebookRelations = relations(notebooks, ({ many, one }) => ({
    notes: many(notes),
    user: one(user, {
        fields: [notebooks.userId],
        references: [user.id],
    }),
}));

export const noteRelations = relations(notes, ({ one }) => ({
    notebook: one(notebooks, {
        fields: [notes.notebookId],
        references: [notebooks.id],
    }),
}));