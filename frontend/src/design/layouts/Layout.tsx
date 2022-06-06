import placeholderCoverSrc from '@assets/placeholder-cover.jpg';
import Header from '@components/Header';
import classnames from '@utils/classnames';
import { PropsWithChildren } from 'react';

interface LayoutProps {
    backgroundClassName?: string;
    className?: string;
    header?: boolean;
    fullWith?: boolean;
    cover?: boolean;
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
    cover = false,
}: PropsWithChildren<LayoutProps>) => (
    <div className={classnames(classes.wrapper, backgroundClassName)}>
        {header && <Header />}
        {cover && <img alt='cover' className='w-full h-56 mb-[-3rem]' src={placeholderCoverSrc} />}
        <div className={classnames(classes.inner, { 'max-w-lg': !fullWith }, className)}>
            {children}
        </div>
    </div>
);

export default Layout;
