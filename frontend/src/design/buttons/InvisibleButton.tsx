import classnames from '@utils/classnames';
import React, { ButtonHTMLAttributes, PropsWithChildren } from 'react';

import Button from './Button';

type InvisibleButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>;

function InvisibleButton({ children, className, type = 'button', ...props }: InvisibleButtonProps) {
    return (
        <Button
            className={classnames(`
                bg-transparent
                text-black
            `, className)}
            type={type}
            {...props}
        >
            {children}
        </Button>
    );
}

export default InvisibleButton;
