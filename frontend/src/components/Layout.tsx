import Header from '@components/Header';
import classnames from '@utils/classnames';
import React, { PropsWithChildren } from 'react';

interface LayoutProps {
    backgroundClassName?: string;
    className?: string;
    header?: boolean;
}

const Layout = ({ backgroundClassName, className, children, header = true }: PropsWithChildren<LayoutProps>) => (
    <div className={classnames('flex flex-col h-full items-center', backgroundClassName)}>
        {header ? <Header /> : null}
        <div className={classnames(
            'flex flex-col items-start justify-start w-full max-w-[1100px]',
            className,
        )}
        >
            {children}
        </div>
    </div>
);

export default Layout;
