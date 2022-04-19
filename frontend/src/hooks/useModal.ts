import { useState } from 'react';

const useModal = (initialState: boolean = false) => {
    const [isOpen, setIsOpen] = useState<boolean>(initialState);

    function toggle() {
        setIsOpen(!isOpen);
    }

    function open() {
        setIsOpen(true);
    }

    function close() {
        setIsOpen(false);
    }

    return {
        isOpen,
        toggle,
        open,
        close,
    };
};

export default useModal;
