import './style.scss';

import classNames from 'classnames';
import React, { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type ButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>;

function Button({ children, className, type = 'button', ...props }: ButtonProps) {
    return (
        <button
            className={classNames('button', className)}
            type={type}
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;
