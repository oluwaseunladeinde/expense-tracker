"use client";

import { z } from "zod";

import { useNewBudget } from "@/features/budgets/hooks/use-new-budget";
import { BudgetForm } from "@/features/budgets/components/budget-form";
import { useCreateBudget } from "@/features/budgets/api/use-create-budget";

import { insertBudgetSchema } from "@/db/schema";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle
} from "@/components/ui/sheet";
import { useRouter } from "next/navigation";


const formSchema = insertBudgetSchema.pick({
    name: true,
    amount: true,
});

type FormValues = z.input<typeof formSchema>;

export const NewBudgetSheet = () => {

    const { isOpen, onClose } = useNewBudget();
    const router = useRouter();

    const mutation = useCreateBudget();

    const onSubmit = (values: FormValues) => {
        mutation.mutate(values, {
            onSuccess: () => {
                onClose();
                router.refresh();
            },
        });
    }

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="bg-white space-y-4">
                <SheetHeader>
                    <SheetTitle>
                        New Budget
                    </SheetTitle>
                    <SheetDescription>
                        Create a new budget to track your expenses
                    </SheetDescription>
                </SheetHeader>
                <BudgetForm
                    onSubmit={onSubmit}
                    disabled={mutation.isPending}
                    defaultValues={{
                        name: "",
                        amount: 0,
                    }}
                />
            </SheetContent>
        </Sheet>
    )
};