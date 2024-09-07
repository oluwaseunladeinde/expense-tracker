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

export const getExpenses = async (budgetId: string) => {
    const user = await currentUser();
    if (!user) {
        throw Error("Not authorized");
    }

    try {
        const response = await db.select()
            .from(expenses)
            .where(eq(expenses.budgetId, budgetId))
            .orderBy(desc(expenses.createdAt));
        return response;
    } catch (error) {
        console.error("An error occurred while getting all budgets:", error);
    }
}


export const deleteExpense = async (expense: ExpenseProps) => {
    const user = await currentUser();
    if (!user) {
        throw Error("Not authorized");
    }

    try {
        const resp = await db
            .delete(expenses)
            .where(eq(expenses.id, expense.id))
            .returning();
        return resp;
    } catch (error) {
        console.error("An error occurred while getting the budget:", error);
    }
}