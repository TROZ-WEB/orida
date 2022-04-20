/* eslint-disable max-len */
import logoSrc from '@assets/logo-text.svg';
import classnames from '@utils/classnames';

const defaultStyle = `
  group-hover:fill-black
  group-hover:duration-100
  duration-100
  w-auto
  h-full
`;

interface Props {
    className?: string;
}

const Logo = ({ className }: Props) => (
    <img alt='logo' className={classnames(defaultStyle, className)} src={logoSrc} />
);

export default Logo;
