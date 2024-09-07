import { getBudget } from '@/lib/actions/budget.actions';
import React from 'react'
import { BudgetItem, BudgetItemSkeleton } from '../../budgets/_components/budget-item';
import AddExpense from '../_components/add-expense';

const ExpensePage = async ({ params }: { params: ExpenseItemProps }) => {

    const budget = await getBudget({ expenseId: params.budgetId });

    if (!budget) {
        return (
            <BudgetItemSkeleton height={'200px'} />
        )
    }

    return (
        <div className='p-10'>
            <h2 className='font-bold text-3xl'>My Expenses</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 mt-6 gap-5'>
                <BudgetItem budget={budget[0]} />
                <AddExpense budgetId={params.budgetId} />
            </div>
        </div>
    )
}

export default ExpensePage