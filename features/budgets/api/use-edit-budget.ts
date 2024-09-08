import { updateBudget } from "@/lib/actions/budget.actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useEditBudget = (budgetId: string | undefined) => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (values) => {
            console.log({ values });
            const response = await updateBudget(budgetId, values);
            return response;
        },
        onSuccess: () => {
            toast.success("Budget updated");
            queryClient.invalidateQueries({ queryKey: ["budget", { budgetId }] });
        },
        onError: (response) => {
            console.log("Error", response);
            toast.error("Failed to update budget");
        }
    });

    return mutation;
}