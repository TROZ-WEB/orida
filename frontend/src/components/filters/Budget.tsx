import Budget from '@customTypes/budget';
import H3 from '@design/titles/H3';

import BudgetTile from './BudgetTile';

interface BudgetFilterProps {
    title: string;
    options: Budget[];
    select: (budget: Budget) => void;
    selection: Budget[];
    unselect: (budget: Budget) => void;
}

const classes = {
    wrapper: `pt-6 pb-5`,
    title: `mb-3.5`,
};

const BudgetFilter = ({ options, select, unselect, selection, title }: BudgetFilterProps) => (
    <div className={classes.wrapper}>
        <H3 className={classes.title}>{title}</H3>
        <div className='flex flex-col'>
            {options.map((budget) => {
                const isActive = selection.map((element) => element.min).includes(budget.min);

                const toggleBudget = (clickedBudget: Budget) => {
                    const toCall = isActive ? unselect : select;
                    toCall(clickedBudget);
                };

                return (
                    <BudgetTile
                        key={budget.min}
                        active={isActive}
                        budget={budget}
                        onClick={toggleBudget}
                    />
                );
            })}
        </div>
    </div>
);

export default BudgetFilter;
