"use client";

import { deleteExpense } from '@/lib/actions/expense.actions';
import { formatDateTime, formatNaira } from '@/lib/utils'
import { Loader2, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

export const ExpenseListSkeleton = () => {
    return (
        <div className='border rounded-lg p-5 items-center justify-center mt-5'>
            <h2 className='font-bold text-lg'>Latest Expenses</h2>
            <div className='h-[200px] bg-gray-200 animate-pulse items-center justify-center ' />
        </div>
    )
}

const ExpenseList = ({ expensesList }: any) => {

    const route = useRouter();
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);

    const onDeleteExpense = async (expense: ExpenseProps) => {
        setIsDeleteLoading(true);
        try {
            console.log(`delete expense: ${expense.name}`);
            await deleteExpense(expense);
            toast.success("Expense deleted successfully");
            route.refresh();
        } catch (error) {
            console.error("Error deleting expense");
            toast.error("Error deleting expense");
        }
        setIsDeleteLoading(false);
    }

    return (
        <div className='mt-5'>
            <h2 className='font-bold text-lg'>Latest Expenses</h2>
            <div className='grid grid-cols-1 md:grid-cols-4 bg-slate-200 p-2 mt-3'>
                <h2 className='font-semibold'>Name</h2>
                <h2 className='font-semibold'>Amount</h2>
                <h2 className='font-semibold'>Date</h2>
                <h2 className='font-semibold'>Action</h2>
            </div>

            {expensesList?.map((expense: ExpenseProps, index: number) => (
                <div key={index} className='grid grid-cols-1 md:grid-cols-4 border-b p-2'>
                    <p className='font-normal'>{expense.name}</p>
                    <p className='font-normal'>{formatNaira(expense.amount)}</p>
                    <p className='font-normal'>{formatDateTime(expense.createdAt).dateTime}</p>
                    <div className='flex text-red-500 font-normal items-center justify-start cursor-pointer' title={`Delete ${expense.name}`} >
                        {isDeleteLoading ?
                            <Loader2 className='text-primary animate-spin' /> :
                            <Trash className='w-4 h-4 text-red-500 hover:text-red-700 mr-2' onClick={() => onDeleteExpense(expense)} />
                        }
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ExpenseList