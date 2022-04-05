import React, { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";

import './style.scss';

interface ButtonLinkProps {
    className?: string;
    invisible?: boolean;
    to: string;
}

function ButtonLink({ children, className = "", invisible = false, to }: PropsWithChildren<ButtonLinkProps>) {
    return (
        <Link className={classnames("button-link", { "button-link--invisible": invisible }, className)} to={to}>{children}</Link>
    );
}

export default ButtonLink;