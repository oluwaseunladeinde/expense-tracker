"use client";

import { useMountedState } from "react-use";

import { NewBudgetSheet } from "@/features/budgets/components/new-budget-sheet";
import { EditBudgetSheet } from "@/features/budgets/components/edit-budget-sheet";


export const SheetProvider = () => {
    const isMounted = useMountedState();
    if (!isMounted) return null;

    return (
        <>
            <NewBudgetSheet />
            <EditBudgetSheet />
        </>
    )
}