import { PropsWithChildren } from 'react';

interface BackdropProps {
    zIndex?: number;
}

const BACKDROP_CLASSES = `
bg-backdrop
h-full
w-full
inset-0
z-200
fixed
overflow-auto
`;

const CONTENT_CLASSES = `
flex
items-center
justify-center
w-full
h-full
`;

const Backdrop = ({ children, zIndex }: PropsWithChildren<BackdropProps>) => (
    <div className={BACKDROP_CLASSES} style={{ zIndex }}>
        <div className={CONTENT_CLASSES}>{children}</div>
    </div>
);

export default Backdrop;
