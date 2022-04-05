import React from "react";
import { Routes, Route } from 'react-router-dom';
import AppRoutes from "./AppRoutes";
import Home from "@pages/Home";

function Router() {
    return (
        <Routes>
            <Route path={AppRoutes.Home} element={<Home />} />
        </Routes>
    );
}

export default Router;
