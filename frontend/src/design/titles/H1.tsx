import React, { PropsWithChildren } from 'react';

interface H1Props {}

const H1 = ({ children }: PropsWithChildren<H1Props>) => (
    <h1 className='text-3xl text-primary-dark font-semibold'>{children}</h1>
);

export default H1;
