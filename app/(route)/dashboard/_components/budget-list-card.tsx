import React from 'react'
import { BudgetItem } from '../budgets/_components/budget-item'

export const BudgetListCard = ({ budgetList }: any) => {
    return (
        <div className='grid grid-cols-1 gap-y-5'>
            <h2 className="font-bold text-lg">Latest Budget</h2>
            {budgetList?.map((budget: any, index: number) => (
                <BudgetItem key={index} budget={budget} />
            ))}
        </div>
    )
};