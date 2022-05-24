import Filters from '@components/filters';
import ProjectList from '@components/ProjectList';
import ProjectsMap from '@components/ProjectsMap';
import { Theme } from '@customTypes/theme';
import Divider from '@design/Divider';
import ThreeColsLayout, { MenuItem } from '@design/layouts/ThreeCols';
import { H2 } from '@design/titles';
import useSelector from '@hooks/useSelector';
import useThunkDispatch from '@hooks/useThunkDispatch';
import { castToExploreTab, ExploreTab, goToExplore } from '@router/AppRoutes';
import { filter } from '@store/projects/actions';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

const ExplorePage = () => {
    const dispatch = useThunkDispatch();
    const { t } = useTranslation();
    const projects = useSelector((state) => state.projects.filter);
    const filters = useSelector((state) => state.filters);

    const [query] = useSearchParams();
    const tab = query.get('tab') ? castToExploreTab(query.get('tab')!) : ExploreTab.list;

    useEffect(() => {
        dispatch(
            filter({
                status: filters.status,
                categories: filters.categories,
                budgets: filters.budgets,
            })
        );
    }, [filters]);

    const left = (
        <>
            <H2 className='pb-7'>{t('explore_title')}</H2>
            <Divider />
            <Filters />
            <Divider />
        </>
    );

    const menuItems: MenuItem[] = [
        { href: goToExplore(ExploreTab.list), iconName: 'list', isActive: tab === ExploreTab.list },
        { href: goToExplore(ExploreTab.map), iconName: 'map', isActive: tab === ExploreTab.map },
    ];

    return (
        <ThreeColsLayout left={left} menuItems={menuItems}>
            <div className='relative h-full w-full'>
                {tab === ExploreTab.list && <ProjectList projects={projects} theme={Theme.Dark} />}
                {tab === ExploreTab.map && <ProjectsMap projects={projects} />}
            </div>
        </ThreeColsLayout>
    );
};

export default ExplorePage;
