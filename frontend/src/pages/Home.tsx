import Layout from "@components/Layout";
import LoginForm from "@components/LoginForm";
import Space from "@design/Space";
import React from "react";

function Home() {
    return (
        <Layout>
            <h1>Connexion</h1>
            <Space px={8} />
            <LoginForm />
        </Layout>
    );
}

export default Home;
