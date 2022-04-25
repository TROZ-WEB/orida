import { Category } from '@services/categories';
import classnames from '@utils/classnames';
import React from 'react';

const classes = {
    wrapper: `
        flex
        flex-col
        items-center
        p-3
        rounded
        w-full

        hover:bg-background-hover
    `,
    wrapperActive: `
        bg-background
    `,
    image: `
        max-w-[45px]
        mb-2.5
        rounded-50%
        w-full
    `,
    label: `
        text-sm
        text-text-secondary
    `,
};

interface CategoryTileProps {
    active?: boolean;
    category: Category;
    onClick?: (category: Category, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const CategoryTile = ({ active = false, category, onClick }: CategoryTileProps) => {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (onClick) {
            onClick(category, event);
        }
    };

    return (
        <button
            className={classnames(classes.wrapper, { [classes.wrapperActive]: active })}
            onClick={handleClick}
        >
            <img alt='category' className={classes.image} src={category.picture} />
            <span className={classes.label}>{category.label}</span>
        </button>
    );
};

export default CategoryTile;
