import classnames from '@utils/classnames';
import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

import Button from './Button';

type InvisibleButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>;

const InvisibleButton = ({
    children,
    className,
    type = 'button',
    ...props
}: InvisibleButtonProps) => (
    <Button
        className={classnames(
            `
                bg-transparent
                text-black

                hover:bg-transparent
            `,
            className
        )}
        type={type}
        {...props}
    >
        {children}
    </Button>
);

export default InvisibleButton;
