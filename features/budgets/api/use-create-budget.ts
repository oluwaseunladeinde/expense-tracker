import { createBudget } from "@/lib/actions/budget.actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useCreateBudget = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (budget: CreateBudgetParams) => {
            const response = await createBudget(budget);
            return response ? response[0] : null;
        },
        onSuccess: () => {
            toast.success("Account created")
            queryClient.invalidateQueries({ queryKey: ["accounts"] });
        },
        onError: (response) => {
            console.log("Error: ", response);
            toast.error("Failed to create account");
        }
    });

    return mutation;
}