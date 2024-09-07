import { getBudgets } from "@/lib/actions/budget.actions";
import { CreateBudget } from "./create-budget";
import { BudgetItem } from "./budget-item";

export const BudgetList = async () => {
    const budgets = await getBudgets();

    if (!budgets) {
        return [1, 2, 3, 4, 5, 6].map((item, index) => (
            <div
                key={index}
                className="w-full bg-slate-200 rounded-lg h-[150px] animate-pulse"
            />
        ));
    }

    return (
        <div className="mt-7">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <CreateBudget />
                {budgets?.map((budget, index) => (
                    <BudgetItem key={index} budget={budget} />
                ))}
            </div>

        </div>
    )
};