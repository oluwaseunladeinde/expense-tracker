"use client";

import { deleteExpense } from '@/lib/actions/expense.actions';
import { formatDateTime, formatNaira } from '@/lib/utils'
import { Loader2, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

export const ExpenseListSkeleton = () => {
    return (
        <div>

        </div>
    )
}


const ExpenseList = ({ expensesList }: ExpenseListProps) => {

    const route = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const onDeleteExpense = async (expense: ExpenseProps) => {
        setIsLoading(true);
        try {
            console.log(`delete expense: ${expense.name}`);
            const response = await deleteExpense(expense);
            toast.success("Expense deleted successfully");
            route.refresh();
        } catch (error) {
            console.error("Error deleting expense");
            toast.error("Error deleting expense");
        }
        setIsLoading(false);
    }

    return (
        <div className='mt-3'>
            <div className='grid grid-cols-1 md:grid-cols-4 bg-slate-200 p-2'>
                <h2 className='font-semibold'>Name</h2>
                <h2 className='font-semibold'>Amount</h2>
                <h2 className='font-semibold'>Date</h2>
                <h2 className='font-semibold'>Action</h2>
            </div>

            {expensesList.map((expense: ExpenseProps, index: number) => (
                <div key={index} className='grid grid-cols-1 md:grid-cols-4 border-b p-2'>
                    <h2 className='font-normal'>{expense.name}</h2>
                    <h2 className='font-normal'>{formatNaira(expense.amount)}</h2>
                    <h2 className='font-normal'>{formatDateTime(expense.createdAt).dateTime}</h2>
                    <h2 className='font-normal' title={`Delete ${expense.name}`} >
                        {isLoading ?
                            <Loader2 className='text-primary animate-spin' /> :
                            <Trash className='text-red-500 hover:text-red-700 cursor-pointer' onClick={() => onDeleteExpense(expense)} />
                        }
                    </h2>
                </div>
            ))}

        </div>
    )
}

export default ExpenseList