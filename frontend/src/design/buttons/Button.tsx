import classnames from '@utils/classnames';
import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type ButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>;

const Button = ({ children, className, type = 'button', ...props }: ButtonProps) => (
    <button
        className={classnames(
            `
        bg-primary
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

        hover:bg-primary-hover
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
