import IconButton from '@design/buttons/IconButton';
import { PropsWithChildren } from 'react';

import Icon from '../Icon';
import Backdrop from './Backdrop';

interface ModalProps {
    close: () => void;
    isOpen: boolean;
}

const classes = {
    modal: `
        box-border
        max-h-screen
        max-w-[500px]
        mx-2
        overflow-auto
        w-full
        z-900
    `,
    inner: `
        bg-white
        p-5
        relative
        rounded
        w-full
    `,
    close: `
        absolute
        bg-transparent
        h-[30px]
        px-2
        py-2
        right-0
        top-0
        w-[30px]

        hover:bg-transparent
    `,
};

const Modal = ({ children, close, isOpen }: PropsWithChildren<ModalProps>) => {
    if (!isOpen) {
        return null;
    }

    return (
        <Backdrop>
            <div className={classes.modal}>
                <div className={classes.inner}>
                    <IconButton className={classes.close} onClick={close}>
                        <Icon color='grey' name='cross' />
                    </IconButton>
                    {children}
                </div>
            </div>
        </Backdrop>
    );
};

export default Modal;
