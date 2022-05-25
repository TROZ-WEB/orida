import classnames from '@utils/classnames';

import Button from './Button';
import { InvisibleButtonProps } from './InvisibleButton';

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

hover:bg-background-hover

group
`;

type IconButtonProps = InvisibleButtonProps;

const IconButton = ({ children, className, ...props }: IconButtonProps) => (
    <Button className={classnames(CLASSES, className)} {...props}>
        {children}
    </Button>
);

export default IconButton;
