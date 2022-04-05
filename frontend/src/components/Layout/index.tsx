import React, { PropsWithChildren } from "react";
import "./style.scss";

interface LayoutProps {}

function Layout({ children }: PropsWithChildren<LayoutProps>) {
    return (
        <div className="layout">
            {children}
        </div>
    )
}

export default Layout;
