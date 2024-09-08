"use client";

import { useNewBudget } from "@/features/budgets/hooks/use-new-budget";

export const CreateBudget = () => {
    const newBudget = useNewBudget();
    return (
        <div className="rounded-lg">
            <div
                className="flex flex-col bg-slate-100 p-10 rounded-lg items-center border-2 border-dashed cursor-pointer hover:shadow-sm h-[150px]"
                onClick={newBudget.onOpen}
            >
                <h2 className="text-3xl">+</h2>
                <h2>Create New Budget </h2>
            </div>
        </div>
    )
};