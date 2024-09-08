import { getBudget } from "@/lib/actions/budget.actions";
import { useQuery } from "@tanstack/react-query";

export const useGetBudget = (budgetId: string | undefined) => {
    const query = useQuery({
        enabled: !!budgetId,
        queryKey: ['budget', { budgetId }],
        queryFn: async () => {
            const response = await getBudget(budgetId);

            if (!response) {
                throw new Error("Failed to retrieve individual budget");
            }

            return response;
        }
    });
    return query;
};