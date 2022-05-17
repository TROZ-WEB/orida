import LoginForm from '@components/LoginForm';
import RegisterForm from '@components/RegisterForm';
import { Button } from '@design/buttons';
import InvisibleButton from '@design/buttons/InvisibleButton';
import Logo from '@design/Logo';
import Space from '@design/Space';
import { castToLoginTab, LoginTab } from '@router/AppRoutes';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

const LoginPage = () => {
    const { t } = useTranslation();
    const { search } = useLocation();
    const tab = castToLoginTab(new URLSearchParams(search).get('tab'));
    const redirectTo = new URLSearchParams(search).get('redirectTo');
    const [mode, setMode] = useState<LoginTab>(tab);

    const switchToMode = (newMode: LoginTab) => {
        setMode(newMode);
    };

    return (
        <div className='items-center justify-center bg-primary flex flex-col h-full'>
            <Logo className='max-w-[120px] h-auto' />
            <Space px={150} />
            {mode === LoginTab.Login && (
                <div>
                    <Space px={8} />
                    <LoginForm />
                    <Space px={8} />
                    <InvisibleButton
                        className='w-full text-white'
                        onClick={() => switchToMode(LoginTab.Register)}
                    >
                        {t('register_title')}
                    </InvisibleButton>
                </div>
            )}
            {mode === LoginTab.Register && (
                <div>
                    <Space px={8} />
                    <RegisterForm redirectTo={redirectTo ?? undefined} />
                    <Space px={8} />
                    <Button className='w-full' onClick={() => switchToMode(LoginTab.Login)}>
                        {t('register_toLogin')}
                    </Button>
                </div>
            )}
        </div>
    );
};

export default LoginPage;
