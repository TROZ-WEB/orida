import React from "react";
import { Routes, Route } from 'react-router-dom';
import AppRoutes from "./AppRoutes";
import Home from "@pages/Home";
import Login from "@pages/Login";

function Router() {
    return (
        <Routes>
            <Route path={AppRoutes.Login} element={<Login />} />
            <Route path={AppRoutes.Home} element={<Home />} />
        </Routes>
    );
}

export default Router;
