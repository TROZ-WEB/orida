import classnames from '@utils/classnames';
import React, { PropsWithChildren } from 'react';

interface H2Props {
    className?: string;
}

const H2_CLASSES = `
font-semibold
leading-8
text-2xl
text-primary-dark
`;

const H2 = ({ children, className }: PropsWithChildren<H2Props>) => (
    <h2 className={classnames(H2_CLASSES, className)}>{children}</h2>
);

export default H2;
