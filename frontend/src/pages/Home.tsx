import { useTranslation } from "react-i18next";
import Layout from "@components/Layout";
import LoginForm from "@components/LoginForm";
import Space from "@design/Space";
import React from "react";

function Home() {
    const { t } = useTranslation();

    return (
        <Layout>
            <h1>{t("home_login")}</h1>
            <Space px={8} />
            <LoginForm />
        </Layout>
    );
}

export default Home;
