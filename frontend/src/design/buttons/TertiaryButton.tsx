import classnames from '@utils/classnames';

import Button, { ButtonProps } from './Button';

export type TertiaryButtonProps = Omit<ButtonProps, 'secondary'>;

const classes = {
    tertiary:
        'bg-transparent border-dashed border-2 text-primary border-primary hover:bg-primary-transparent',
};

const TertiaryButton = ({
    children,
    className,
    type = 'button',
    ...props
}: TertiaryButtonProps) => (
    <Button className={classnames(classes.tertiary, className)} type={type} {...props}>
        {children}
    </Button>
);

export default TertiaryButton;
