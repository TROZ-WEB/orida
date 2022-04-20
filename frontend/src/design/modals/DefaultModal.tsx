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
z-900
overflow-auto
`;

const INNER_CLASSES = `
p-5
bg-white
rounded
w-[500px]
relative
`;

const CLOSE_CLASSES = `
absolute
right-0
top-0
w-[30px]
h-[30px]
px-2
py-2
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
