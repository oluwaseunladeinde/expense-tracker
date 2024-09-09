/* eslint-disable no-unused-vars */

declare type SearchParamProps = {
    params: { [key: string]: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

// ========================================

declare type ExpenseProps = {
    id: number;
    name: string;
    amount: string;
    createdAt: Date | null;
}

declare type NewUserParams = {
    userId: string;
    email: string;
    name: string;
    password: string;
};


declare type CreateBudgetParams = {
    name: string;
    amount: number;
    icon?: string;
}

declare type AddExpenseParams = {
    name: string;
    amount: string;
    budgetId: string;
}

declare type BudgetItemProps = {
    budget: Budgets;
    height?: string;
}

declare type ExpenseItemProps = {
    budgetId: string;
}

declare type BudgetListProps = {
    totalSpend: number;
    totalItem: number;
    id: number;
    name: string;
    amount: number;
    icon: string | null;
    createdBy: string;
    createdAt: Date | null;
    updatedAt: Date | null;
}