import classnames from '@utils/classnames';

interface DividerProps {
    className?: string;
}

const Divider = ({ className }: DividerProps) => (
    <hr className={classnames('border-border w-full', className)} />
);

export default Divider;
