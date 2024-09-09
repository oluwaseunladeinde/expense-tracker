import { getBudgets } from "@/lib/actions/budget.actions";
import { useQuery } from "@tanstack/react-query";

export const useGetBudgets = () => {
    const query = useQuery({
        queryKey: ['budget'],
        queryFn: async () => {
            const response = await getBudgets();

            if (!response) {
                throw new Error("Failed to retrieve budget list");
            }

            return response;
        }
    });
    return query;
};