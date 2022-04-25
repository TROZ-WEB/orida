import Icon from '@design/Icon';
import Layout from '@design/layouts/Layout';
import classnames from '@utils/classnames';
import { PropsWithChildren, ReactNode } from 'react';
import { Link } from 'react-router-dom';

const classes = {
    wrapper: `
        flex-row
        max-h-full
        overflow-hidden
    `,
    left: `
        bg-white
        flex
        flex-col
        h-full
        max-w-[33%]
        p-8
        w-full
    `,
    menu: `
        border-border
        border-x-2
        h-full
        flex
        flex-col
        max-w-[50px]
    `,
    right: `
        h-full
        overflow-auto
        w-full
    `,
    button: `
        bg-secondary
        h-[50px]
        overflow-hidden
        w-[50px]
    `,
    buttonActive: 'bg-secondary-dark',
};

export interface MenuItem {
    href: string;
    iconName: string;
    isActive?: boolean;
}

interface ThreeColsLayoutProps {
    left: ReactNode;
    menuItems: MenuItem[];
}

const ThreeColsLayout = ({
    menuItems,
    children,
    left,
}: PropsWithChildren<ThreeColsLayoutProps>) => (
    <Layout className={classes.wrapper} fullWith>
        <aside className={classes.left}>{left}</aside>
        <div className={classes.menu}>
            {menuItems.map((item) => (
                <Link
                    key={item.href}
                    className={classnames(classes.button, {
                        [classes.buttonActive]: item.isActive,
                    })}
                    to={item.href}
                >
                    <Icon name={item.iconName} />
                </Link>
            ))}
        </div>
        <main className={classes.right}>{children}</main>
    </Layout>
);

export default ThreeColsLayout;
