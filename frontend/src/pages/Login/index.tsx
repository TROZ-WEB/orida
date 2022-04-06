import './style.scss';

import Layout from '@components/Layout';
import LoginForm from '@components/LoginForm';
import RegisterForm from '@components/RegisterForm';
import { Button } from '@design/buttons';
import Space from '@design/Space';
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
        <Layout className="login__layout">
            <div className="login__wrapper">
                {
                    mode === Mode.Login && (
                        <div>
                            <h1>{t('login_title')}</h1>
                            <Space px={8} />
                            <LoginForm />
                            <Space px={8} />
                            <Button className="login__switch-mode" onClick={() => switchToMode(Mode.Register)}>
                                {t('register_title')}
                            </Button>
                        </div>
                    )
                }
                {
                    mode === Mode.Register && (
                        <div>
                            <h1>{t('register_title')}</h1>
                            <Space px={8} />
                            <RegisterForm />
                            <Space px={8} />
                            <Button className="login__switch-mode" onClick={() => switchToMode(Mode.Login)}>
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
