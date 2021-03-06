import classnames from '@utils/classnames';
import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';

interface ButtonLinkProps {
    className?: string;
    invisible?: boolean;
    to: string;
}

const BASE_CLASSES: string = `
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
    text-center
    flex
    justify-center
    duration-300

    hover:bg-primary-hover
`;

const INVISIBLE_CLASSES: string = `
    border-0
    p-0
`;

const ButtonLink = ({
    children,
    className = '',
    invisible = false,
    to,
}: PropsWithChildren<ButtonLinkProps>) => (
    <Link
        className={classnames(
            BASE_CLASSES,
            {
                [INVISIBLE_CLASSES]: invisible,
            },
            className
        )}
        to={to}
    >
        {children}
    </Link>
);

export default ButtonLink;
