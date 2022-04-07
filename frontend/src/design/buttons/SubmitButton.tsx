import { classnames } from '@utils/classnames';
import React, { ButtonHTMLAttributes } from 'react';

function SubmitButton({ className, ...props }: ButtonHTMLAttributes<HTMLInputElement>) {
    return <input className={classnames(`
        bg-primary
        block
        border-0
        cursor-pointer
        min-w-[100px]
        no-underline
        py-2 px-3
        rounded
        text-white text-xs font-normal text center
        w-full
        duration-300

        hover:bg-primary-hover
    `, className)} {...props} type="submit" />;
}

export default SubmitButton;
