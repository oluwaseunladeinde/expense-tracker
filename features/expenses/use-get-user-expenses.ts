
import { getUserExpenses } from "@/lib/actions/expense.actions";
import { useQuery } from "@tanstack/react-query";

export const useGetUserExpenses = () => {
    const query = useQuery({
        queryKey: ['expenses'],
        queryFn: async () => {
            const response = await getUserExpenses();
            if (!response) {
                throw new Error("Failed to retrieve expenses list");
            }
            return response;
        }
    });
    return query;
};