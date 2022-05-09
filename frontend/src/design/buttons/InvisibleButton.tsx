import classnames from '@utils/classnames';

import Button, { ButtonProps } from './Button';

export type InvisibleButtonProps = ButtonProps;

const InvisibleButton = ({
    children,
    className,
    type = 'button',
    ...props
}: InvisibleButtonProps) => (
    <Button
        className={classnames(
            `
                bg-transparent
                text-black

                hover:bg-transparent
            `,
            className
        )}
        type={type}
        {...props}
    >
        {children}
    </Button>
);

export default InvisibleButton;
