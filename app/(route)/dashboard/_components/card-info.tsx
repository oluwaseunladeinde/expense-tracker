import { formatNaira } from '@/lib/utils';
import { PiggyBank, ReceiptText, Wallet } from 'lucide-react';
import React, { useEffect, useState } from 'react';

export const CardInfo = ({ budgetList }: any) => {
    const [finalTotalBudget, setFinaTotalBudget] = useState<number>(0);
    const [finalTotalSpend, setFinaTotalSpend] = useState<number>(0);
    const [finalTotalCount, setFinaTotalCount] = useState<number>(0);
    const _budgetList = budgetList.budgetList;

    useEffect(() => {
        calculateCardData();
    }, []);

    const calculateCardData = () => {
        console.log({ budgetList });
        let totalBuget = 0;
        let totalSpend = 0;
        let totalCount = 0;
        _budgetList.forEach((budget) => {
            totalBuget = totalBuget + budget.amount;
            totalSpend = totalSpend + budget.totalSpend;
            totalCount = totalCount + 1;
        });
        console.log({ totalBuget, totalSpend });

        setFinaTotalBudget(totalBuget);
        setFinaTotalSpend(totalSpend);
        setFinaTotalCount(totalCount);
    }

    return (
        <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            <div className='p-7 border rounded-lg flex items-center justify-between'>
                <div>
                    <h2 className='text-sm'>Total Budget</h2>
                    <h2 className='font-bold text-2xl'>{formatNaira(finalTotalBudget)}</h2>
                </div>
                <PiggyBank className='bg-primary p-3 size-12 rounded-full text-white' />
            </div>
            <div className='p-7 border rounded-lg flex items-center justify-between'>
                <div>
                    <h2 className='text-sm'>Total Spend</h2>
                    <h2 className='font-bold text-2xl'>{formatNaira(finalTotalSpend)}</h2>
                </div>
                <ReceiptText className='bg-primary p-3 size-12 rounded-full text-white' />
            </div>
            <div className='p-7 border rounded-lg flex items-center justify-between'>
                <div>
                    <h2 className='text-sm'>No. Of Budget</h2>
                    <h2 className='font-bold text-2xl'>{finalTotalCount}</h2>
                </div>
                <Wallet className='bg-primary p-3 size-12 rounded-full text-white' />
            </div>
        </div>
    )
};

export const CardInfoSkeleton = () => {
    return (
        <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            <div className='p-7 border rounded-lg flex items-center justify-between'>
                <div className='flex flex-col gap-2'>
                    <div className='h-4 w-40 bg-gray-300 animate-pulse' />
                    <div className='h-4 w-60 bg-gray-300 animate-pulse' />
                </div>
                <div className='bg-gray-300 animate-pulse p-3 size-12 rounded-full' />
            </div>
            <div className='p-7 border rounded-lg flex items-center justify-between'>
                <div className='flex flex-col gap-2'>
                    <div className='h-4 w-40 bg-gray-300 animate-pulse' />
                    <div className='h-4 w-60 bg-gray-300 animate-pulse' />
                </div>
                <div className='bg-gray-300 animate-pulse p-3 size-12 rounded-full' />
            </div>
            <div className='p-7 border rounded-lg flex items-center justify-between'>
                <div className='flex flex-col gap-2'>
                    <div className='h-4 w-40 bg-gray-300 animate-pulse' />
                    <div className='h-4 w-60 bg-gray-300 animate-pulse' />
                </div>
                <div className='bg-gray-300 animate-pulse p-3 size-12 rounded-full' />
            </div>
        </div>
    )
};
