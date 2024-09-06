"use server";

import { db } from "@/db/drizzle";
import { budgets } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";

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
}