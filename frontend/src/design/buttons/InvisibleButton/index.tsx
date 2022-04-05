import React, { ButtonHTMLAttributes, PropsWithChildren } from "react";
import classNames from "classnames";

import "./style.scss";

function InvisibleButton({ children, className, ...props }: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) {
    return (
        <button
            className={classNames("button-invisible", className)}
            {...props}
        >
            {children}
        </button>
    );
}

export default InvisibleButton;