import { create } from "zustand";

type OpenBudgetState = {
    budgetId?: string;
    isOpen: boolean;
    onOpen: (budgetId: string) => void;
    onClose: () => void;
}

export const useOpenBudget = create<OpenBudgetState>((set) => ({
    budgetId: undefined,
    isOpen: false,
    onOpen: (budgetId: string) => set({ isOpen: true, budgetId }),
    onClose: () => set({ isOpen: false, budgetId: undefined }),
}))