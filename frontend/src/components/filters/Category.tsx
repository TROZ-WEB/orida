import H3 from '@design/titles/H3';
import { Category } from '@services/categories';

import CategoryTile from './CategoryTile';

interface CategoryFilterProps {
    title: string;
    options: Category[];
    select: (category: Category) => void;
    selection: Category[];
    unselect: (category: Category) => void;
}

const classes = {
    wrapper: `pt-6 pb-5`,
    title: `mb-3.5`,
    scroller: `
        flex
        overflow-scroll
    `,
};

const CategoryFilter = ({ options, select, unselect, selection, title }: CategoryFilterProps) => (
    <div className={classes.wrapper}>
        <H3 className={classes.title}>{title}</H3>
        <div className={classes.scroller}>
            {options.map((category) => {
                const isActive = selection.map((element) => element.id).includes(category.id);

                const toggleCategory = (clickedCategory: Category) => {
                    const toCall = isActive ? unselect : select;
                    toCall(clickedCategory);
                };

                return (
                    <CategoryTile
                        key={category.id}
                        active={isActive}
                        category={category}
                        onClick={toggleCategory}
                    />
                );
            })}
        </div>
    </div>
);

export default CategoryFilter;
