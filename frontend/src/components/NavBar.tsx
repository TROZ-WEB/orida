import { Button } from '@design/buttons';
import useSelector from '@hooks/useSelector';
import useThunkDispatch from '@hooks/useThunkDispatch';
import AppRoutes from '@router/AppRoutes';
import { logout } from '@store/auth/actions';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

function NavBar() {
    const { t } = useTranslation();
    const dispatch = useThunkDispatch();
    const navigate = useNavigate();
    const isLoggedIn = !!useSelector((state) => state.auth.id);

    const onLogout = useCallback(async () => {
        await dispatch(logout());
        navigate(AppRoutes.Login);
    }, []);

    return (
        <nav>
            {isLoggedIn && <Button onClick={onLogout}>{t('nav_logout')}</Button>}
        </nav>
    );
}

export default NavBar;
