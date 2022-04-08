import NavBar from '@components/NavBar';
import classnames from '@utils/classnames';
import React, { PropsWithChildren } from 'react';

interface LayoutProps {
    className?: string;
}

function Layout({ className, children }: PropsWithChildren<LayoutProps>) {
    return (
        <>
            <NavBar />
            <div className={classnames(
                'flex flex-col items-start justify-start w-full min-h-full',
                className,
            )}
            >
                {children}
            </div>
        </>
    );
}

export default Layout;
