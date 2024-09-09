import { useQuery } from "@tanstack/react-query";
import { db } from "@/db/drizzle";
import { budgets } from "@/db/schema";
import { eq } from "drizzle-orm";

export const useCreateBudgets = (user_email: string) => {
    const query = useQuery({
        queryKey: ['budgets'],
        queryFn: async () => {
            const response = await db
                .select()
                .from(budgets)
                .where(eq(budgets.createdBy, user_email));

            if (!response) {
                throw new Error("Failed to retrieve individual account");
            }
            return response;
        }
    });
    return query;
};