import CategoryFilter from '@components/filters/Category';
import Divider from '@design/Divider';
import useSelector from '@hooks/useSelector';
import useThunkDispatch from '@hooks/useThunkDispatch';
import { getAll as getAllCategories } from '@store/categories/actions';
import {
    selectCategory,
    selectStatus,
    unselectCategory,
    unselectStatus,
} from '@store/filters/actions';
import { getAll as getAllStatus } from '@store/status/actions';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import StatusFilter from './Status';

const Filters = () => {
    const dispatch = useThunkDispatch();
    const { t } = useTranslation();
    // categories
    const categories = useSelector((state) => state.categories.data);
    const selectedCategories = useSelector((state) => state.filters.categories);
    // status
    const status = useSelector((state) => state.status.data);
    const selectedStatus = useSelector((state) => state.filters.status);

    useEffect(() => {
        if (categories.length === 0) {
            dispatch(getAllCategories());
        }
        if (status.length === 0) {
            dispatch(getAllStatus());
        }
    }, []);

    return (
        <>
            <CategoryFilter
                options={categories}
                select={(category) => dispatch(selectCategory(category))}
                selection={selectedCategories}
                title={t('filters_categories_title')}
                unselect={(category) => dispatch(unselectCategory(category))}
            />
            <Divider />
            <StatusFilter
                options={status}
                select={(newStatus) => dispatch(selectStatus(newStatus))}
                selection={selectedStatus}
                title={t('filters_status_title')}
                unselect={(toRemove) => dispatch(unselectStatus(toRemove))}
            />
        </>
    );
};

export default Filters;
