import Filters from '@components/filters';
import ProjectList from '@components/ProjectList';
import { Theme } from '@customTypes/theme';
import Divider from '@design/Divider';
import ThreeColsLayout, { MenuItem } from '@design/layouts/ThreeCols';
import { H2 } from '@design/titles';
import useSelector from '@hooks/useSelector';
import useThunkDispatch from '@hooks/useThunkDispatch';
import { filter } from '@store/projects/actions';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const ExplorePage = () => {
    const dispatch = useThunkDispatch();
    const { t } = useTranslation();
    const projects = useSelector((state) => state.projects.filter);
    const filters = useSelector((state) => state.filters);

    useEffect(() => {
        dispatch(filter({ status: filters.status, categories: filters.categories }));
    }, [filters]);

    const left = (
        <>
            <H2 className='pb-7'>{t('explore_title')}</H2>
            <Divider />
            <Filters />
            <Divider />
        </>
    );

    const menuItems: MenuItem[] = [];

    return (
        <ThreeColsLayout left={left} menuItems={menuItems}>
            <ProjectList projects={projects} theme={Theme.Dark} />
        </ThreeColsLayout>
    );
};

export default ExplorePage;
