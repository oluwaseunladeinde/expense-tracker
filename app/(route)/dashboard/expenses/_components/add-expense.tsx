import AddExpenseFormSlim from './forms/add-expense-form-slim';

const AddExpense = ({ budgetId }: { budgetId: string }) => {
    return (
        <div className='border rounded-lg p-5'>
            {/* <AddExpenseForm budgetId={budgetId} /> */}
            <AddExpenseFormSlim budgetId={budgetId} />
        </div>
    )
}

export default AddExpense