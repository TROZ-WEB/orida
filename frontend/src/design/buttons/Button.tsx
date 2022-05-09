import classnames from '@utils/classnames';
import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

export interface ButtonProps extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
    secondary?: boolean;
}

const Button = ({
    children,
    className,
    secondary = false,
    type = 'button',
    ...props
}: ButtonProps) => (
    <button
        className={classnames(
            `
        ${secondary ? 'bg-secondary' : 'bg-primary'}
        border-0
        cursor-pointer
        min-w-[100px]
        no-underline
        py-2 px-3
        rounded
        text-white text-xs font-normal text center
        duration-300
        box-border
        flex
        flex-col
        justify-center
        items-center

        ${secondary ? 'hover:bg-secondary-hover' : 'hover:bg-primary-hover'}
        `,
            className
        )}
        type={type}
        {...props}
    >
        {children}
    </button>
);

export default Button;
