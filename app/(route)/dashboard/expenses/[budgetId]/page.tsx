import { getBudget } from '@/lib/actions/budget.actions';
import React from 'react'
import { BudgetItem, BudgetItemSkeleton } from '../../budgets/_components/budget-item';
import AddExpense from '../_components/add-expense';
import ExpenseList from '../_components/expense-list';
import { getExpenses } from '@/lib/actions/expense.actions';

const ExpensePage = async ({ params }: { params: ExpenseItemProps }) => {

    const budget = await getBudget({ budgetId: params.budgetId });

    const expensesList = await getExpenses(params.budgetId);

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
            <div className='mt-4'>
                <h2 className='font-bold text-lg'>Latest Expenses</h2>
                <ExpenseList expensesList={expensesList} />
            </div>
        </div>
    )
}

export default ExpensePage