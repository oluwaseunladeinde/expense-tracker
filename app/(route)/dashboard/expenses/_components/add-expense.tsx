import React from 'react'
import AddExpenseForm from './forms/add-expense-form'

const AddExpense = ({ budgetId }: { budgetId: string }) => {
    return (
        <div className='border rounded-lg p-5'>
            <h2 className='font-bold text-lg'>Add Expense</h2>
            <AddExpenseForm budgetId={budgetId} />
        </div>
    )
}

export default AddExpense