/* eslint-disable max-len */
import logoSrc from '@assets/logo-text.svg';
import IconProps from '@customTypes/iconProps';
import classnames from '@utils/classnames';
import React from 'react';

import { defaultStyle } from './icon-style';

const Logo = ({ className }: IconProps) => (
    <img alt="logo" className={classnames(defaultStyle, className)} src={logoSrc} />
);

export default Logo;
