import { IconList } from '@/lib/constants';
import { formatNaira } from '@/lib/utils';
import Image from 'next/image';
import React from 'react'

const BudgetItem = ({ budget }: BudgetItemProps) => {

    const bugdetIcon = IconList.find((icon) => icon.name === budget.icon) || IconList[0];

    const totalSpend = budget.totalSpend ? budget.totalSpend : 0;
    const totalRemaining = budget.amount - budget.totalSpend;

    return (
        <div className="p-5 border rounded-lg hover:shadow-md cursor-pointer">
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
                        <h2 className='text-sm text-gray-500'>{budget.totalItem} Item</h2>
                    </div>
                </div>
                <h2 className='font-bold text-primary text-lg'>{formatNaira(budget.amount)}</h2>
            </div>
            <div className='mt-5'>
                <div className='flex items-center justify-between mb-3'>
                    <h2 className='text-sm text-slate-500'>{formatNaira(totalSpend)} Spend</h2>
                    <h2 className='text-sm text-slate-500'>{formatNaira(totalRemaining)} Remaining</h2>
                </div>
                <div className='w-full bg-slate-300 h-2 rounded-full'>
                    <div className='w-[40%] bg-primary h-2 rounded-full'>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default BudgetItem