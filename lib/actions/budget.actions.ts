"use server";

import { db } from "@/db/drizzle";
import { budgets, expenses } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { and, desc, eq, getTableColumns, sql } from "drizzle-orm";

export const createBudget = async (budget: CreateBudgetParams) => {
    const user = await currentUser();

    if (!user) {
        throw Error("No user exists!!!");
    }

    try {
        const response = await db
            .insert(budgets)
            .values({
                ...budget,
                createdBy: user.primaryEmailAddress?.emailAddress || 'sean.legend@gmail.com'
            })
            .returning({ insertedId: budgets.id });
        return response;
    } catch (error) {
        console.error("An error occurred while creating a new budget:", error);
    }
};

export const getBudgets = async () => {
    const user = await currentUser();
    if (!user || !user.primaryEmailAddress) {
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


export const getBudget = async (budgetId: string | undefined) => {
    const user = await currentUser();
    if (!user || !user.primaryEmailAddress || !budgetId) {
        throw Error("No budget exists!!!");
    }

    try {
        let result = null;
        const response = await db
            .select({
                ...getTableColumns(budgets),
                totalSpend: sql`sum(${expenses.amount})`.mapWith(Number),
                totalItem: sql`count(${expenses.id})`.mapWith(Number),
            })
            .from(budgets)
            .leftJoin(expenses, eq(budgets.id, expenses.budgetId))
            .where(
                and(
                    eq(budgets.id, Number(budgetId)),
                    eq(budgets.createdBy, user?.primaryEmailAddress?.emailAddress)
                )
            )
            .groupBy(budgets.id);

        if (response && response.length > 0) {
            result = response[0];
        }
        return result;
    } catch (error) {
        console.error("An error occurred while getting the budget:", error);
        return null;
    }
}


export const updateBudget = async (budgetId: string | undefined, values: any) => {
    const user = await currentUser();
    if (!user || !user.primaryEmailAddress || !budgetId) {
        throw Error("No budget exists!!!");
    }

    try {
        const response = await db
            .update(budgets)
            .set(values)
            .where(
                and(
                    eq(budgets.createdBy, user.primaryEmailAddress.emailAddress),
                    eq(budgets.id, Number(budgetId)),
                )
            )
            .returning();
        return response;
    } catch (error) {
        console.error("An error occurred while getting the budget:", error);
        return null;
    }
}


export const deleteBudget = async (budgetId: string | undefined) => {
    const user = await currentUser();
    if (!user || !user.primaryEmailAddress || !budgetId) {
        throw Error("No budget exists!!!");
    }

    try {
        const deleteBudget = await db
            .delete(expenses)
            .where(eq(expenses.budgetId, Number(budgetId)))
            .returning();
        if (deleteBudget) {
            const res = await db
                .delete(budgets)
                .where(
                    and(
                        eq(budgets.id, Number(budgetId)),
                        eq(budgets.createdBy, user?.primaryEmailAddress?.emailAddress)
                    )
                )
                .returning({ deletedId: budgets.id });

            return res;
        } else {
            throw Error("Budget deletion failed");
        }
    } catch (error) {

    }
}
