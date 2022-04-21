import classnames from '@utils/classnames';
import React, { PropsWithChildren } from 'react';

interface H3Props {
    className?: string;
}

const H3_CLASSES = `
font-semibold
leading-7
text-lg
text-primary-dark
`;

const H3 = ({ children, className }: PropsWithChildren<H3Props>) => (
    <h3 className={classnames(H3_CLASSES, className)}>{children}</h3>
);

export default H3;
