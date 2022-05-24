import Budget from '@customTypes/budget';
import { CheckboxInput } from '@design/inputs';
import formatBudget from '@utils/formatBudget';

interface BudgetTileProps {
    active?: boolean;
    budget: Budget;
    onClick?: (budget: Budget) => void;
}

const BudgetTile = ({ active = false, budget, onClick }: BudgetTileProps) => {
    const handleChange = () => {
        if (onClick) {
            onClick(budget);
        }
    };

    return (
        <CheckboxInput
            label={`${formatBudget(budget.min)} € - ${
                budget.max === undefined ? '∞' : `${formatBudget(budget.max)} €`
            }`}
            onChange={handleChange}
            value={active}
        />
    );
};

export default BudgetTile;
