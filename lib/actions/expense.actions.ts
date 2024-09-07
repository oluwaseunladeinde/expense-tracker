"use server";

import { db } from "@/db/drizzle";
import { budgets, expenses } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";

export const createExpense = async (expense: AddExpenseParams) => {
    const user = await currentUser();

    if (!user || !expense.budgetId) {
        throw Error("No user exists!!!");
    }

    try {
        const response = await db
            .insert(expenses)
            .values({
                ...expense,
                budgetId: Number(expense.budgetId)
            })
            .returning({ insertedId: budgets.id });
        return response;
    } catch (error) {
        console.error("An error occurred while creating a new expense:", error);
    }
};

export const getExpenses = async () => {
    const user = await currentUser();
    if (!user) {
        throw Error("No budget exists!!!");
    }

    try {
        const response = await db.select({
            ...getTableColumns(budgets),
            totalSpend: sql`sum(${expenses.amount})`.mapWith(Number),
            totalItem: sql`count(${expenses.id})`.mapWith(Number),
        })
            .from(budgets)
            .leftJoin(expenses, eq(budgets.id, expenses.budgetId))
            .where(eq(budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
            .groupBy(budgets.id)
            .orderBy(desc(budgets.createdAt));

        return response;
    } catch (error) {
        console.error("An error occurred while getting all budgets:", error);
    }
}


export const getExpense = async ({ expenseId }: { expenseId: string }) => {
    const user = await currentUser();
    if (!user) {
        throw Error("No budget exists!!!");
    }

    try {
        const response = await db.select({
            ...getTableColumns(budgets),
            totalSpend: sql`sum(${expenses.amount})`.mapWith(Number),
            totalItem: sql`count(${expenses.id})`.mapWith(Number),
        })
            .from(budgets)
            .leftJoin(expenses, eq(budgets.id, expenses.budgetId))
            .where(eq(budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
            .where(eq(budgets.id, expenseId))
            .groupBy(budgets.id);

        return response
    } catch (error) {
        console.error("An error occurred while getting the budget:", error);
    }
}