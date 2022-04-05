import classnames from "classnames";
import React, { ButtonHTMLAttributes } from "react";
import './style.scss';

function SubmitButton({ className, ...props }: ButtonHTMLAttributes<HTMLInputElement>) {
    return <input className={classnames("submit-button", className)} {...props} type="submit" />;
}

export default SubmitButton;