import classnames from '@utils/classnames';
import { PropsWithChildren } from 'react';

interface H1Props {
    className?: string;
}

const H1 = ({ children, className }: PropsWithChildren<H1Props>) => (
    <h1 className={classnames('text-3xl text-primary-dark font-bold', className)}>{children}</h1>
);

export default H1;
