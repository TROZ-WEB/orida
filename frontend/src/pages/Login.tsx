import Logo from '@assets/logo.svg';
import Layout from '@components/Layout';
import LoginForm from '@components/LoginForm';
import RegisterForm from '@components/RegisterForm';
import { Button } from '@design/buttons';
import InvisibleButton from '@design/buttons/InvisibleButton';
import Space from '@design/Space';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

enum Mode {
    Login = 'LOGIN',
    Register = 'REGISTER',
}

const LoginPage = () => {
    const { t } = useTranslation();
    const [mode, setMode] = useState<Mode>(Mode.Login);

    const switchToMode = (newMode: Mode) => {
        setMode(newMode);
    };

    return (
        <Layout className="items-center justify-center bg-primary">
            <img alt="logo-orida" className='max-w-[120px]' src={Logo} />
            <Space px={150} />
            {
                mode === Mode.Login && (
                    <div>
                        <Space px={8} />
                        <LoginForm />
                        <Space px={8} />
                        <InvisibleButton className="w-full text-white" onClick={() => switchToMode(Mode.Register)}>
                            {t('register_title')}
                        </InvisibleButton>
                    </div>
                )
            }
            {
                mode === Mode.Register && (
                    <div>
                        <Space px={8} />
                        <RegisterForm />
                        <Space px={8} />
                        <Button className="w-full" onClick={() => switchToMode(Mode.Login)}>
                            {t('register_toLogin')}
                        </Button>
                    </div>
                )
            }
        </Layout>
    );
};

export default LoginPage;
