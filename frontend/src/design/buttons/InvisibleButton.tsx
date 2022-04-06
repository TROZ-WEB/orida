import classNames from 'classnames';
import React, { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type InvisibleButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>;

const BASE_CLASSES = `
bg-none
border-0
rounded-lg
py-2 px-3
`;

function InvisibleButton({ children, className, type = 'button', ...props }: InvisibleButtonProps) {
    return (
        <button
            className={classNames(BASE_CLASSES, className)}
            type={type}
            {...props}
        >
            {children}
        </button>
    );
}

export default InvisibleButton;
