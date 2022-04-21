import React, { PropsWithChildren } from 'react';

interface ParagraphProps {}

const Paragraph = ({ children }: PropsWithChildren<ParagraphProps>) => (
    <p className='text-sm text-primary-dark leading-5'>{children}</p>
);

export default Paragraph;
