import React from "react";
import { useTranslation } from "react-i18next";
import Layout from "@components/Layout";
import LoginForm from "@components/LoginForm";
import Space from "@design/Space";
import RegisterForm from "@components/RegisterForm";
import "./style.scss";

function LoginPage() {
    const { t } = useTranslation();

    return (
        <Layout className="login__layout">
            <div>
                <h1>{t("login_title")}</h1>
                <Space px={8} />
                <LoginForm />
            </div>
            <Space px={24} horizontal />
            <div>
                <h1>{t("register_title")}</h1>
                <Space px={8} />
                <RegisterForm />
            </div>
        </Layout>
    );
}

export default LoginPage;
