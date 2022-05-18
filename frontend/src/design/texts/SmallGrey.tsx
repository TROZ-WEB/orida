import classnames from '@utils/classnames';
import { PropsWithChildren } from 'react';

interface SmallGreyProps {
    className?: string;
}

const SmallGrey = ({ children, className }: PropsWithChildren<SmallGreyProps>) => (
    <span className={classnames('text-sm text-neutral-400', className)}>{children}</span>
);

export default SmallGrey;
