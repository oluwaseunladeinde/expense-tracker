import { CreateBudget } from "./create-budget";

export const BudgetList = () => {
    return (
        <div className="mt-7">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <CreateBudget />
            </div>

        </div>
    )
};