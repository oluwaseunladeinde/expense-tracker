import { deleteBudget } from "@/lib/actions/budget.actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useDeleteBudget = (budgetId: string | undefined) => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async () => {
            const response = await deleteBudget(budgetId);
            return response;
        },
        onSuccess: () => {
            toast.success("Budget updated")
            queryClient.invalidateQueries({ queryKey: ["budget", { budgetId }] });
        },
        onError: (response) => {
            console.log("Error", response);
            toast.error("Failed to update budget");
        }
    });

    return mutation;
}