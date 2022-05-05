import IconButton from '@design/buttons/IconButton';
import { PropsWithChildren } from 'react';

import Icon from '../Icon';
import Backdrop from './Backdrop';

interface ModalProps {
    close: () => void;
    isOpen: boolean;
}

const MODAL_CLASSES = `
box-border
max-w-[500px]
mx-2
overflow-auto
w-full
z-900
max-h-screen
`;

const INNER_CLASSES = `
bg-white
p-5
relative
rounded
w-full
`;

const CLOSE_CLASSES = `
absolute
h-[30px]
px-2
py-2
right-0
top-0
w-[30px]
`;

const Modal = ({ children, close, isOpen }: PropsWithChildren<ModalProps>) => {
    if (!isOpen) {
        return null;
    }

    return (
        <Backdrop>
            <div className={MODAL_CLASSES}>
                <div className={INNER_CLASSES}>
                    <IconButton className={CLOSE_CLASSES} onClick={close}>
                        <Icon color='grey' name='cross' />
                    </IconButton>
                    {children}
                </div>
            </div>
        </Backdrop>
    );
};

export default Modal;
