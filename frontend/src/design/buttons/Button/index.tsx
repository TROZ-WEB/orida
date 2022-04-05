import React, { ButtonHTMLAttributes, PropsWithChildren } from "react";
import classNames from "classnames";

import "./style.scss";

function Button({ children, className, ...props }: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) {
    return (
        <button
            className={classNames("button", className)}
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;