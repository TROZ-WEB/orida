import React from "react";
import { TextInput } from "@design/inputs";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AppRoutes from "@router/AppRoutes";
import Space from "@design/Space";
import SubmitButton from "@design/buttons/SubmitButton";
import Layout from "@components/Layout";
import Auth from "@services/auth";
import "./style.scss";
import { useTranslation } from "react-i18next";

type Inputs = {
    email: string;
    password: string;
};

function LoginPage() {
    const { register, handleSubmit } = useForm<Inputs>();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const onLogin: SubmitHandler<Inputs> = async data => {
        try {
            await Auth.login(data);
            navigate(AppRoutes.Home);
        } catch (e) {
            window.alert(e);
        }
    };

    return (
        <Layout>
            <form className="login-form__form" onSubmit={handleSubmit(onLogin)}>
                <TextInput
                    label={t("login_email_label")}
                    name="email"
                    register={register}
                />
                <Space px={8} />
                <TextInput
                    label={t("login_password_label")}
                    name="password"
                    register={register}
                    type="password"
                />
                <Space px={12} />
                <SubmitButton value={t("login_submit") as string} />
            </form>
        </Layout>
    )
}

export default LoginPage;
