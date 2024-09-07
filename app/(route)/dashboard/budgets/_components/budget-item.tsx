import { getExpenses } from '@/lib/actions/expense.actions';
import { IconList } from '@/lib/constants';
import { formatNaira } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export const BudgetItem = async ({ budget }: BudgetItemProps) => {

    const bugdetIcon = IconList.find((icon) => icon.name === budget.icon) || IconList[0];

    const totalSpend = budget.totalSpend ? budget.totalSpend : 0;
    const totalRemaining = budget.amount - budget.totalSpend;

    const calcProgressPercentage = () => {
        const perc = (budget.totalSpend / budget.amount) * 100;
        return perc.toFixed(2);
    }

    return (
        <Link href={`/dashboard/expenses/${budget.id}`} className="p-5 border rounded-lg hover:shadow-md cursor-pointer h-[150px]">
            <div className='flex gap-2 items-center justify-between'>
                <div className='flex gap-2 items-center'>
                    <Image
                        src={bugdetIcon.image}
                        width={32}
                        height={32}
                        alt={bugdetIcon.name}
                        className="rounded-full border border-gray-300"
                    />
                    <div>
                        <h2 className='font-bold'>{budget.name}</h2>
                        <h2 className='text-sm text-gray-500'>{budget.totalItem} {budget.totalItem <= 1 ? 'Item' : 'Items'}</h2>
                    </div>
                </div>
                <h2 className='font-bold text-primary text-lg'>{formatNaira(budget.amount)}</h2>
            </div>
            <div className='mt-5'>
                <div className='flex items-center justify-between mb-3'>
                    <h2 className='text-sm text-slate-500'>Spent: {formatNaira(totalSpend)} </h2>
                    <h2 className='text-sm text-slate-500'>Remaining: {formatNaira(totalRemaining)}</h2>
                </div>
                <div className='w-full bg-slate-300 h-2 rounded-full'>
                    <div
                        className='bg-primary h-2 rounded-full'
                        style={{
                            width: `${calcProgressPercentage()}%`,
                        }}
                    >

                    </div>
                </div>
            </div>
        </Link>
    )
}

export const BudgetItemSkeleton = ({ height }: { height: string }) => {
    return (
        <div
            className={`w-full bg-slate-200 rounded-lg h-[${height}] animate-pulse`}
        />
    )
}