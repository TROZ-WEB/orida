import Icons from '@assets/sprites.svg';
import classnames from '@utils/classnames';

const defaultStyle = `
  duration-100
  w-full
  h-full
`;

interface Props {
    name: string;
    color?: string;
    size?: number;
    className?: string;
}

const Icon = ({ name, color = '#000', size = 16, className }: Props) => (
    <svg
        className={classnames(defaultStyle, className)}
        fill={color}
        style={{ width: `${size}px`, height: `${size}px` }}
    >
        <use xlinkHref={`${Icons}#${name}`} />
    </svg>
);

export default Icon;
