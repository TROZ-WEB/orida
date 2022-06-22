import ProjectForm from '@components/ProjectForm';
import { Button, ButtonLink } from '@design/buttons';
import Drawer from '@design/Drawer';
import Icon from '@design/Icon';
import Logo from '@design/Logo';
import Modal from '@design/modals/DefaultModal';
import Notification from '@design/Notification';
import { SmallGreyText } from '@design/texts';
import { H3 } from '@design/titles';
import useModal from '@hooks/useModal';
import useRole from '@hooks/useRole';
import useSelector from '@hooks/useSelector';
import useThunkDispatch from '@hooks/useThunkDispatch';
import AppRoutes, { goToExplore, goToLogin, goToProfile, LoginTab } from '@router/AppRoutes';
import NotificationService from '@services/notifications';
import { getAuth, logout } from '@store/auth/actions';
import { getAll as getAllNotifications } from '@store/notifications/actions';
import classnames from '@utils/classnames';
import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

const classes = {
    menuItem: `
        relative
        bg-transparent
        flex
        flex-col
        font-bold
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
    notificationCount: `
        absolute
        h-3
        w-3
        bg-error
        rounded-full
        bottom-0
        right-0
        translate-x-[50%]
        translate-y-[50%]
        flex
        items-center
        justify-center
        text-white
    `,
    wrapper: 'h-[70px] bg-primary-dark flex justify-between w-full',
};

const Header = () => {
    const { t } = useTranslation();
    const dispatch = useThunkDispatch();
    const navigate = useNavigate();
    const { isAdmin, isAuthenticated, isAdminOfAtLeastOneOrganization } = useRole();
    const { pathname } = useLocation();
    const projectModalProps = useModal();
    const auth = useSelector((state) => state.auth.data);
    const notifications = useSelector((state) => state.notifications.data);

    const onLogout = useCallback(async () => {
        await dispatch(logout());
        navigate(AppRoutes.Login);
    }, []);

    const exploreTabIsActive = pathname.includes('/project/') || pathname.includes('/explore');
    const searchTabIsActive = pathname.includes('/search');
    const accountTabIsActive = pathname.includes('/accounts');

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(getAuth());
            dispatch(getAllNotifications());
        }
    }, []);

    const newNotifications = notifications.filter((notification) => notification.isNew === true);

    const handleOpenNotifications = async () => {
        const notificationStateIds = newNotifications.map(
            (notificationState) => notificationState.id
        );
        await NotificationService.update({ notificationStateIds });
        dispatch(getAllNotifications());
    };

    return (
        <div className={classes.wrapper}>
            <div className='flex flex-row'>
                <ButtonLink className={classes.menuItem} to={goToProfile(auth.id)}>
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
                {isAdminOfAtLeastOneOrganization && (
                    <Button className={classes.menuItem} onClick={() => projectModalProps.open()}>
                        <Icon className='stroke-white' color='#fff' name='plus' size={20} />
                        <span className='text-white font-normal mt-2'>
                            {t('header_create_project')}
                        </span>
                    </Button>
                )}
                <ButtonLink
                    className={classnames(classes.menuItem, {
                        [classes.menuItemActive]: searchTabIsActive,
                    })}
                    to={AppRoutes.Search}
                >
                    <Icon color='#fff' name='search' size={20} />
                    <span className='text-white font-normal mt-2'>{t('header_search')}</span>
                </ButtonLink>

                {isAuthenticated && (
                    <Drawer
                        button={
                            <>
                                <div className='relative'>
                                    <Icon color='#fff' name='bell' size={20} />
                                    {newNotifications.length > 0 && (
                                        <span className={classes.notificationCount}>
                                            {newNotifications.length}
                                        </span>
                                    )}
                                </div>
                                <span className='text-white font-normal mt-2'>
                                    {t('header_notifications')}
                                </span>
                            </>
                        }
                        buttonClassName={classnames(classes.menuItem, {
                            [classes.menuItemActive]: searchTabIsActive,
                        })}
                        onOpen={handleOpenNotifications}
                        title={<H3>{t('header_notifications_drawer')}</H3>}
                    >
                        {notifications.length === 0 && (
                            <SmallGreyText className='px-4 pb-2'>
                                {t('header_no_notifications')}
                            </SmallGreyText>
                        )}
                        {notifications
                            .slice(0)
                            .reverse()
                            .map((notificationState) => (
                                <Notification
                                    key={notificationState.id}
                                    imageURL={
                                        notificationState.notification.project?.images?.[0]?.url
                                    }
                                    isNew={notificationState.isNew}
                                    link={notificationState.notification.link}
                                    text={notificationState.notification.text}
                                />
                            ))}
                    </Drawer>
                )}
                {isAuthenticated && (
                    <Button className={classes.menuItem} onClick={onLogout}>
                        <Icon color='#fff' name='logout' size={20} />
                        <span className='text-white font-normal mt-2'>{t('nav_logout')}</span>
                    </Button>
                )}
                {!isAuthenticated && (
                    <ButtonLink
                        className={classes.menuItem}
                        to={goToLogin(LoginTab.Register, pathname)}
                    >
                        {t('CTA_button')}
                    </ButtonLink>
                )}
            </div>
            <Modal {...projectModalProps}>
                <ProjectForm onCreated={() => projectModalProps.close()} />
            </Modal>
        </div>
    );
};

export default Header;
