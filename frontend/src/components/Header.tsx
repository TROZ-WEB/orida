import { Button, ButtonLink } from '@design/buttons';
import Icon from '@design/Icon';
import Logo from '@design/Logo';
import useSelector from '@hooks/useSelector';
import useThunkDispatch from '@hooks/useThunkDispatch';
import AppRoutes from '@router/AppRoutes';
import { logout } from '@store/auth/actions';
import classnames from '@utils/classnames';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

const MENU_ITEM_CLASSES = `
bg-transparent
h-full
w-[120px]
rounded-none
px-2
py-2
flex
justify-center
items-center
font-semibold

hover:bg-primary
`;

const MENU_ITEM_ACTIVE_CLASSES = `
bg-primary
`;

const MENU_ITEMS_ICON_ONLY = `
px-6
py-6
w-auto
min-w-auto
`;

const Header = () => {
    const { t } = useTranslation();
    const dispatch = useThunkDispatch();
    const navigate = useNavigate();
    const isLoggedIn = !!useSelector((state) => state.auth.data.id);
    const { pathname } = useLocation();

    const onLogout = useCallback(async () => {
        await dispatch(logout());
        navigate(AppRoutes.Login);
    }, []);

    const exploreTabIsActive = pathname.includes('/project/');
    const searchTabIsActive = pathname.includes('/search');

    return (
        <div className='h-[70px] bg-primary-dark flex justify-between w-full'>
            <div className='flex flex-row'>
                <ButtonLink className={MENU_ITEM_CLASSES} to={AppRoutes.Home}>
                    <Logo />
                </ButtonLink>
                <ButtonLink
                    className={classnames(MENU_ITEM_CLASSES, {
                        [MENU_ITEM_ACTIVE_CLASSES]: exploreTabIsActive,
                    })}
                    to='#'
                >
                    {t('nav_explore')}
                </ButtonLink>
            </div>
            <div className='flex flex-row'>
                <ButtonLink
                    className={classnames(MENU_ITEM_CLASSES, MENU_ITEMS_ICON_ONLY, {
                        [MENU_ITEM_ACTIVE_CLASSES]: searchTabIsActive,
                    })}
                    to={AppRoutes.Search}
                >
                    <Icon color='#fff' name='search' />
                </ButtonLink>
                {isLoggedIn && (
                    <Button className={MENU_ITEM_CLASSES} onClick={onLogout}>
                        <Icon className='w-auto' color='#fff' name='logout' />
                        <span className='text-white font-normal'>{t('nav_logout')}</span>
                    </Button>
                )}
            </div>
        </div>
    );
};

export default Header;
