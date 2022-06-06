import classnames from '@utils/classnames';
import React, { PropsWithChildren } from 'react';

interface ParagraphProps {
    className?: string;
}

const Paragraph = ({ children, className }: PropsWithChildren<ParagraphProps>) => (
    <p className={classnames('text-sm text-primary-dark leading-5', className)}>{children}</p>
);

export default Paragraph;
