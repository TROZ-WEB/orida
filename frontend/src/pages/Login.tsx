import Layout from '@components/Layout';
import LoginForm from '@components/LoginForm';
import RegisterForm from '@components/RegisterForm';
import { Button } from '@design/buttons';
import Space from '@design/Space';
import PageTitle from '@design/titles/PageTitle';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

enum Mode {
    Login = 'LOGIN',
    Register = 'REGISTER',
}

function LoginPage() {
    const { t } = useTranslation();
    const [mode, setMode] = useState<Mode>(Mode.Login);

    const switchToMode = (newMode: Mode) => {
        setMode(newMode);
    };

    return (
        <Layout className="items-center">
            <div className="flex">
                {
                    mode === Mode.Login && (
                        <div>
                            <PageTitle>{t('login_title')}</PageTitle>
                            <Space px={8} />
                            <LoginForm />
                            <Space px={8} />
                            <Button className="w-full" onClick={() => switchToMode(Mode.Register)}>
                                {t('register_title')}
                            </Button>
                        </div>
                    )
                }
                {
                    mode === Mode.Register && (
                        <div>
                            <PageTitle>{t('register_title')}</PageTitle>
                            <Space px={8} />
                            <RegisterForm />
                            <Space px={8} />
                            <Button className="w-full" onClick={() => switchToMode(Mode.Login)}>
                                {t('register_toLogin')}
                            </Button>
                        </div>
                    )
                }
            </div>
        </Layout>
    );
}

export default LoginPage;
