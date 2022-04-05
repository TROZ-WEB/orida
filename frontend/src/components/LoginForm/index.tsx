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

type Inputs = {
    email: string;
    password: string;
};

function LoginPage() {
    const { register, handleSubmit } = useForm<Inputs>();
    const navigate = useNavigate();

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
                    label="Email"
                    name="email"
                    register={register}
                />
                <Space px={8} />
                <TextInput
                    label="Mot de passe"
                    name="password"
                    register={register}
                    type="password"
                />
                <Space px={12} />
                <SubmitButton value="Connexion" />
            </form>
        </Layout>
    )
}

export default LoginPage;
