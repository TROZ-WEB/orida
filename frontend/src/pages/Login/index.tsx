import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import Layout from "@components/Layout";
import LoginForm from "@components/LoginForm";
import Space from "@design/Space";
import RegisterForm from "@components/RegisterForm";
import "./style.scss";
import { Button } from "@design/buttons";

enum Mode {
    Login = "LOGIN",
    Register = "REGISTER",
}

function LoginPage() {
    const { t } = useTranslation();
    const [mode, setMode] = useState<Mode>(Mode.Login);

    const switchToMode = (newMode: Mode) => {
        setMode(newMode);
    }

    return (
        <Layout className="login__layout">
            <div className="login__wrapper">
                {
                    mode === Mode.Login && (
                        <div>
                            <h1>{t("login_title")}</h1>
                            <Space px={8} />
                            <LoginForm />
                            <Space px={8} />
                            <Button className="login__switch-mode" onClick={() => switchToMode(Mode.Register)}>
                                {t("register_title")}
                            </Button>
                        </div>
                    )
                }
                {
                    mode === Mode.Register && (
                        <div>
                            <h1>{t("register_title")}</h1>
                            <Space px={8} />
                            <RegisterForm />
                            <Space px={8} />
                            <Button className="login__switch-mode" onClick={() => switchToMode(Mode.Login)}>
                                {t("register_toLogin")}
                            </Button>
                        </div>
                    )
                }
            </div>
        </Layout>
    );
}

export default LoginPage;
