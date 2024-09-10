"use client";

import { ArrowLeft } from 'lucide-react';
import ExpenseList, { ExpenseListSkeleton } from './_components/expense-list';
import { useGetUserExpenses } from '@/features/expenses/use-get-user-expenses';
import { useRouter } from 'next/navigation';

const ExpensesPage = () => {
    const router = useRouter();
    const { data: expensesList, isLoading: expensesDataLoading } = useGetUserExpenses();

    return (
        <div className='p-8'>
            <div className='flex gap-2 items-center'>
                <ArrowLeft className='text-gray-700 cursor-pointer hover:text-primary' onClick={() => router.back()} />
                <h2 className="flex gap-2 font-bold text-3xl">My Expenses ✌️</h2>
            </div>

            {expensesDataLoading ? (
                <>
                    <ExpenseListSkeleton />
                </>
            ) : (
                <>
                    <ExpenseList showtitle={false} expensesList={expensesList} />
                </>
            )}
        </div>
    )
}

export default ExpensesPage