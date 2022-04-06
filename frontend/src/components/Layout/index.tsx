import NavBar from "@components/NavBar";
import classnames from "classnames";
import React, { PropsWithChildren } from "react";
import "./style.scss";

interface LayoutProps {
    className?: string;
}

function Layout({ className, children }: PropsWithChildren<LayoutProps>) {
    return (
        <>
            <NavBar />
            <div className={classnames("layout", className)}>
                {children}
            </div>
        </>
    )
}

export default Layout;
