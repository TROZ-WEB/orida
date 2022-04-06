import './style.scss';

import classNames from 'classnames';
import React, { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type InvisibleButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>;

function InvisibleButton({ children, className, type = 'button', ...props }: InvisibleButtonProps) {
    return (
        <button
            className={classNames('button-invisible', className)}
            type={type}
            {...props}
        >
            {children}
        </button>
    );
}

export default InvisibleButton;
