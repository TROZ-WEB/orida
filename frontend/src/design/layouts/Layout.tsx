import Header from '@components/Header';
import classnames from '@utils/classnames';
import { PropsWithChildren } from 'react';

interface LayoutProps {
    backgroundClassName?: string;
    className?: string;
    header?: boolean;
    fullWith?: boolean;
}

const classes = {
    wrapper: `
        flex
        flex-col
        h-full
        items-center
        w-full
    `,
    inner: `
        flex
        flex-col
        h-full
        items-start
        justify-start
        px-4
        w-full

        lg:px-0
    `,
};

const Layout = ({
    backgroundClassName,
    className,
    children,
    fullWith = false,
    header = true,
}: PropsWithChildren<LayoutProps>) => (
    <div className={classnames(classes.wrapper, backgroundClassName)}>
        {header ? <Header /> : null}
        <div className={classnames(classes.inner, { 'max-w-lg': !fullWith }, className)}>
            {children}
        </div>
    </div>
);

export default Layout;
