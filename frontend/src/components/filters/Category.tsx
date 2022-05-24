import H3 from '@design/titles/H3';
import { Category } from '@services/categories';
import { useState } from 'react';

import CategoryTile from './CategoryTile';

const FAKE_CATEGORY_PLUS_BUTTON: Category = {
    color: '#718391',
    id: 'three-dots',
    label: 'Plus',
};

interface CategoryFilterProps {
    title: string;
    options: Category[];
    select: (category: Category) => void;
    selection: Category[];
    unselect: (category: Category) => void;
}

const classes = {
    wrapper: 'pt-6 pb-5',
    title: 'mb-3.5',
    scroller: 'flex overflow-auto',
};

const CategoryFilter = ({ options, select, unselect, selection, title }: CategoryFilterProps) => {
    const [displayAll, setDisplayAll] = useState(false);
    const handleClick = () => {
        setDisplayAll(!displayAll);
    };

    const showCategories = displayAll ? options : options.slice(0, 3);

    return (
        <div className={classes.wrapper}>
            <H3 className={classes.title}>{title}</H3>
            <div className={classes.scroller}>
                {showCategories.map((category) => {
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
                {!displayAll && (
                    <CategoryTile
                        key='fake-category'
                        category={FAKE_CATEGORY_PLUS_BUTTON}
                        onClick={handleClick}
                    />
                )}
            </div>
        </div>
    );
};

export default CategoryFilter;
