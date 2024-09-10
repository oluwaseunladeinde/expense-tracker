'use client';

import { useUser } from "@clerk/nextjs"
import { CardInfo, CardInfoSkeleton } from "./_components/card-info";
import { useGetBudgets } from "@/features/budgets/api/use-get-budgets";
import { BarChartCard, BarChartCardSkeleton } from "./_components/bar-chart-card";
import { useGetUserExpenses } from "@/features/expenses/use-get-user-expenses";
import ExpenseList, { ExpenseListSkeleton } from "./expenses/_components/expense-list";
import { BudgetListCard } from "./_components/budget-list-card";

const DashboardPage = () => {
    const { user } = useUser();
    const { data: budgetList, isLoading } = useGetBudgets();
    const { data: expensesList } = useGetUserExpenses();

    return (
        <div className="p-8">
            <h2 className="font-bold text-3xl">Hi, {user?.fullName} ✌️</h2>
            <p className="text-gray-500">Here is the detail on your expense.</p>
            {isLoading ? (
                <CardInfoSkeleton />
            ) : (
                <CardInfo budgetList={budgetList} />
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 mt-6 gap-5">
                <div className="md:col-span-2">
                    {isLoading ? (
                        <>
                            <BarChartCardSkeleton />
                            <ExpenseListSkeleton />
                        </>
                    ) : (
                        <>
                            <BarChartCard budgetList={budgetList} />
                            <ExpenseList expensesList={expensesList} />
                        </>
                    )}

                </div>
                <div className="flex flex-col gap-y-5">

                    {isLoading ? (
                        <div className='border rounded-lg p-5 items-center justify-center mt-5'>
                            <h2 className='font-bold text-lg'>Latest Budget</h2>
                            <div className='h-[200px] bg-gray-200 animate-pulse items-center justify-center ' />
                        </div>
                    ) : (
                        <BudgetListCard budgetList={budgetList} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default DashboardPage