import { getBudgets } from "@/lib/actions/budget.actions";
import { CreateBudget } from "./create-budget";
import BudgetItem from "./budget-item";

export const BudgetList = async () => {
    const budgets = await getBudgets();

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