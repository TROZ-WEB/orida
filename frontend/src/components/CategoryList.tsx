import Tag from '@design/Tag';
import { Category } from '@services/categories';

const classes = {
    tag: 'mb-1 ml-1',
};

interface CategoryListProps {
    categories: Category[];
    className?: string;
}

const CategoryList = ({ categories, className }: CategoryListProps) => (
    <div className={className}>
        {categories.map((category) => (
            <Tag key={category.id} className={classes.tag} color={category.color}>
                {category.label}
            </Tag>
        ))}
    </div>
);

export default CategoryList;
