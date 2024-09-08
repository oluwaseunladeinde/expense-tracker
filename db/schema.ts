import {
    integer,
    numeric,
    pgTable,
    serial,
    text,
    timestamp,
    varchar
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";


export const budgets = pgTable("budgets", {
    id: serial("id").primaryKey(),
    name: varchar("name").notNull().unique(),
    amount: integer("amount").notNull(),
    icon: text("icon"),
    createdBy: varchar("created_by").notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at', { mode: 'date', precision: 3 }).$onUpdate(() => new Date()),
});
export const insertBudgetSchema = createInsertSchema(budgets);

export const expenses = pgTable("expenses", {
    id: serial("id").primaryKey(),
    name: varchar("name").notNull().unique(),
    amount: numeric("amount").notNull(),
    budgetId: integer("budget_id").references(() => budgets.id),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at', { mode: 'date', precision: 3 }).$onUpdate(() => new Date()),
})
export const insertExpenseSchema = createInsertSchema(expenses);


