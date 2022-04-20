import { PropsWithChildren } from 'react';

interface PageTitleProps {}

const PageTitle = ({ children }: PropsWithChildren<PageTitleProps>) => (
    <h1 className='text-3xl'>{children}</h1>
);

export default PageTitle;
