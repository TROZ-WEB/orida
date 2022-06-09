import IconButton from '@design/buttons/IconButton';
import Portal from '@design/Portal';
import colors from '@styles/colors';
import classnames from '@utils/classnames';
import { PropsWithChildren } from 'react';

import Icon from '../Icon';
import Backdrop from './Backdrop';

interface ModalProps {
    close: () => void;
    isOpen: boolean;
    classname?: string;
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
        z-10

        hover:bg-transparent
    `,
};

const Modal = ({ children, close, isOpen, classname }: PropsWithChildren<ModalProps>) => {
    if (!isOpen) {
        return null;
    }

    return (
        <Portal id='modal-root'>
            <Backdrop>
                <div className={classnames(classes.modal, classname)}>
                    <IconButton className={classes.close} onClick={close}>
                        <Icon color={colors.grey} name='cross' />
                    </IconButton>
                    {children}
                </div>
            </Backdrop>
        </Portal>
    );
};

export default Modal;
