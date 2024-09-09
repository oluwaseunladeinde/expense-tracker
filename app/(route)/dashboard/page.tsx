'use client';

import { useUser } from "@clerk/nextjs"
import { CardInfo, CardInfoSkeleton } from "./_components/card-info";
import { useGetBudgets } from "@/features/budgets/api/use-get-budgets";
import BarChartCard from "./_components/bar-chart-card";

const DashboardPage = () => {
    const { user } = useUser();
    const { data, isLoading } = useGetBudgets();

    console.log(data);

    return (
        <div className="p-8">
            <h2 className="font-bold text-3xl">Hi, {user?.fullName} ✌️</h2>
            <p className="text-gray-500">Here is the detail on your expense.</p>
            {isLoading ? (
                <CardInfoSkeleton />
            ) : (
                <CardInfo budgetList={data} />
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 mt-6">
                <div className="md:col-span-2">
                    <BarChartCard budgetList={data} />
                </div>
                <div>
                    Other content
                </div>
            </div>

        </div>
    )
}

export default DashboardPage