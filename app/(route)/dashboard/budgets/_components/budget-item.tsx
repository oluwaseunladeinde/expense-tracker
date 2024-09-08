import { IconList } from '@/lib/constants';
import { formatNaira } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

export const BudgetItem = async ({ budget, height }: BudgetItemProps) => {

    if (!budget) {
        return null;
    }

    const bugdetIcon = IconList.find((icon) => icon.name === budget.icon) || IconList[0];

    const totalSpend = budget.totalSpend ? budget.totalSpend : 0;
    const totalRemaining = budget.amount - budget.totalSpend;

    const calcProgressPercentage = () => {
        const perc = (budget.totalSpend / budget.amount) * 100;
        return perc.toFixed(2);
    }

    return (
        <Link href={`/dashboard/expenses/${budget.id}`} className={`p-5 border rounded-lg hover:shadow-md cursor-pointer h-[${height}]`}>
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

export const BudgetItemSkeleton = () => {
    return (
        <div className="grid h-screen mt-20 bg-white px-4">
            <div className="text-center">
                <h1 className="text-9xl font-black text-gray-200">404</h1>

                <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Uh-oh!</p>

                <p className="mt-4 text-gray-500">We can&apos;t find that page.</p>

                <Link
                    href="/dashboard/budgets"
                    className="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring"
                >
                    Go Back Home
                </Link>
            </div>
        </div>
    )
}