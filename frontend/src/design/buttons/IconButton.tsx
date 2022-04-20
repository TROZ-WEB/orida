import classnames from '@utils/classnames';
import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

import InvisibleButton from './InvisibleButton';

const CLASSES = `
px-1
py-1
w-auto
min-w-auto
w-[30px]
h-[30px]
flex
items-center
justify-center

group
`;

type IconButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>;

const IconButton = ({ children, className, ...props }: PropsWithChildren<IconButtonProps>) => (
    <InvisibleButton className={classnames(CLASSES, className)} {...props}>
        {children}
    </InvisibleButton>
);

export default IconButton;
