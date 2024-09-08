"use client";

import { useRouter } from "next/navigation";
import { z } from "zod";

import { Loader2 } from "lucide-react";
import { insertBudgetSchema } from "@/db/schema";

import { BudgetForm } from "@/features/budgets/components/budget-form";
import { useOpenBudget } from "@/features/budgets/hooks/use-open-budget";
import { useGetBudget } from "@/features/budgets/api/use-get-budget";
import { useEditBudget } from "@/features/budgets/api/use-edit-budget";
import { useDeleteBudget } from "@/features/budgets/api/use-delete-budget";

import { useConfirm } from "@/hooks/use-confirm";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle
} from "@/components/ui/sheet";


const formSchema = insertBudgetSchema.pick({
    name: true,
    amount: true,
});

type FormValues = z.input<typeof formSchema>;

export const EditBudgetSheet = () => {
    const router = useRouter();
    const { isOpen, onClose, budgetId } = useOpenBudget();

    const [ConfirmDaiog, confirm] = useConfirm(
        "Are you sure",
        "You are about to delete this budget."
    )

    const budgetQuery = useGetBudget(budgetId);
    const budgetMutation = useEditBudget(budgetId);
    const deleteMutation = useDeleteBudget(budgetId);

    const isPending = budgetMutation.isPending || deleteMutation.isPending;
    const isLoading = budgetQuery.isLoading;

    const onSubmit = (values: FormValues) => {
        budgetMutation.mutate(values, {
            onSuccess: () => {
                onClose();
                router.refresh();
            },
        });
    };

    const onDelete = async () => {
        const ok = await confirm();
        if (ok) {
            deleteMutation.mutate(undefined, {
                onSuccess: () => {
                    onClose();
                    router.push('/dashboard/budgets');
                }
            });
        }
    };

    const defaultValues = budgetQuery.data ?
        {
            name: budgetQuery.data?.name,
            amount: budgetQuery.data?.amount,
            icon: budgetQuery.data?.icon,
        } : {
            name: "",
            amount: 0,
            icon: ""
        }

    return (
        <>
            <ConfirmDaiog />
            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent className="bg-white space-y-4">
                    <SheetHeader>
                        <SheetTitle>
                            Edit Budget
                        </SheetTitle>
                        <SheetDescription>
                            Update this budget to track your expenses
                        </SheetDescription>
                    </SheetHeader>

                    {isLoading
                        ? (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Loader2 className="size-8 text-muted-foreground animate-spin mr-2 text-primary" />
                                Loading...
                            </div>
                        ) : (
                            <BudgetForm
                                id={budgetId}
                                onSubmit={onSubmit}
                                disabled={isPending}
                                defaultValues={defaultValues}
                                onDelete={onDelete}
                            />
                        )
                    }
                </SheetContent>
            </Sheet>
        </>
    )
};