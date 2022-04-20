import Icons from '@assets/sprites.svg';
import classnames from '@utils/classnames';

const defaultStyle = `
  group-hover:fill-black
  group-hover:duration-100
  duration-100
  h-full
`;

interface Props {
    name: string;
    color?: string;
    size?: number;
    className?: string;
}

const Icon = ({ name, color = '#000', size = 20, className }: Props) => (
    <svg className={classnames(defaultStyle, className)} fill={color} width={size}>
        <use xlinkHref={`${Icons}#${name}`} />
    </svg>
);

export default Icon;
