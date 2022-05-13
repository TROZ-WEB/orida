import { Button, ButtonLink } from '@design/buttons';
import Icon from '@design/Icon';
import Logo from '@design/Logo';
import useRole from '@hooks/useRole';
import useSelector from '@hooks/useSelector';
import useThunkDispatch from '@hooks/useThunkDispatch';
import AppRoutes, { goToExplore } from '@router/AppRoutes';
import { logout } from '@store/auth/actions';
import classnames from '@utils/classnames';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

const classes = {
    menuItem: `
        bg-transparent
        flex
        font-semibold
        h-full
        items-center
        justify-center
        px-2
        py-2
        rounded-none
        w-[120px]

        hover:bg-primary
    `,
    menuItemActive: `
        bg-primary
    `,
    menuItemIconOnly: `
        min-w-auto
        px-6
        py-6
        w-auto
    `,
    wrapper: 'h-[70px] bg-primary-dark flex justify-between w-full',
};

const Header = () => {
    const { t } = useTranslation();
    const dispatch = useThunkDispatch();
    const navigate = useNavigate();
    const isLoggedIn = !!useSelector((state) => state.auth.data.id);
    const { isAdmin } = useRole();
    const { pathname } = useLocation();

    const onLogout = useCallback(async () => {
        await dispatch(logout());
        navigate(AppRoutes.Login);
    }, []);

    const exploreTabIsActive = pathname.includes('/project/') || pathname.includes('/explore');
    const searchTabIsActive = pathname.includes('/search');
    const accountTabIsActive = pathname.includes('/accounts');

    return (
        <div className={classes.wrapper}>
            <div className='flex flex-row'>
                <ButtonLink className={classes.menuItem} to={AppRoutes.Home}>
                    <Logo />
                </ButtonLink>
                <ButtonLink
                    className={classnames(classes.menuItem, {
                        [classes.menuItemActive]: exploreTabIsActive,
                    })}
                    to={goToExplore()}
                >
                    {t('nav_explore')}
                </ButtonLink>
                {isAdmin && (
                    <ButtonLink
                        className={classnames(classes.menuItem, classes.menuItemIconOnly, {
                            [classes.menuItemActive]: accountTabIsActive,
                        })}
                        to={AppRoutes.Accounts}
                    >
                        {t('nav_accounts')}
                    </ButtonLink>
                )}
            </div>
            <div className='flex flex-row'>
                <ButtonLink
                    className={classnames(classes.menuItem, classes.menuItemIconOnly, {
                        [classes.menuItemActive]: searchTabIsActive,
                    })}
                    to={AppRoutes.Search}
                >
                    <Icon color='#fff' name='search' size={20} />
                </ButtonLink>
                {isLoggedIn && (
                    <Button className={classes.menuItem} onClick={onLogout}>
                        <Icon color='#fff' name='logout' size={20} />
                        <span className='text-white font-normal mt-2'>{t('nav_logout')}</span>
                    </Button>
                )}
            </div>
        </div>
    );
};

export default Header;
