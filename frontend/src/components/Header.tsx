import { Button, ButtonLink } from '@design/buttons';
import { Logo, LogoutIcon, SearchIcon } from '@design/icons';
import useSelector from '@hooks/useSelector';
import useThunkDispatch from '@hooks/useThunkDispatch';
import AppRoutes from '@router/AppRoutes';
import { logout } from '@store/auth/actions';
import classnames from '@utils/classnames';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const MENU_ITEM_CLASSES = `
bg-transparent
h-full
w-[120px]
rounded-none
px-2
py-2
hover:bg-primary
flex
justify-center
items-center
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

    const onLogout = useCallback(async () => {
        await dispatch(logout());
        navigate(AppRoutes.Login);
    }, []);

    return (
        <div className='h-[70px] bg-primary-dark flex justify-between w-full'>
            <ButtonLink className={MENU_ITEM_CLASSES} to={AppRoutes.Home}>
                <Logo />
            </ButtonLink>
            <div className='flex flex-row'>
                <ButtonLink className={classnames(MENU_ITEM_CLASSES, MENU_ITEMS_ICON_ONLY)} to={AppRoutes.Search}>
                    <SearchIcon color="#fff" />
                </ButtonLink>
                {isLoggedIn && (
                    <Button className={MENU_ITEM_CLASSES} onClick={onLogout}>
                        <LogoutIcon color='#fff' />
                        <span className='text-white'>{t('nav_logout')}</span>
                    </Button>
                )}
            </div>
        </div>
    );
};

export default Header;
