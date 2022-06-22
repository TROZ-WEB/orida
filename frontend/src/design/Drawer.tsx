import { Button } from '@design/buttons';
import classnames from '@utils/classnames';
import { PropsWithChildren, ReactElement, useState } from 'react';

interface DrawerProps {
    drawerClassName?: string;
    buttonClassName?: string;
    button: ReactElement;
    title: ReactElement;
    onOpen?: () => void;
}

const classes = {
    button: `
        relative
        bg-transparent
        flex
        flex-col
        font-bold
        h-full
        items-center
        justify-center
        px-2
        py-2
        rounded-none
        w-[120px]

        hover:bg-primary
    `,
    drawer: 'absolute z-50 bg-white rounded w-80 h-96 top-full right-0 py-2 flex flex-col',
    scroll: 'overflow-y-scroll',
    title: 'px-4 pb-2',
    wrapper: 'relative',
};

const Drawer = ({
    drawerClassName,
    buttonClassName,
    button,
    title,
    children,
    onOpen = () => {},
}: PropsWithChildren<DrawerProps>) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDrawer = () => {
        if (isOpen) {
            onOpen();
        }
        setIsOpen(!isOpen);
    };

    return (
        <div className={classes.wrapper}>
            <Button className={classnames(classes.button, buttonClassName)} onClick={toggleDrawer}>
                {button}
            </Button>
            {isOpen && (
                <div className={classnames(classes.drawer, drawerClassName)}>
                    <div className={classes.title}>{title}</div>
                    <div className={classes.scroll}>{children}</div>
                </div>
            )}
        </div>
    );
};

export default Drawer;
