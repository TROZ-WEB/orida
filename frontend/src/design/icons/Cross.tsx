/* eslint-disable max-len */
import IconProps from '@customTypes/iconProps';
import React from 'react';

import { defaultColor, defaultStyle } from './icon-style';

const Cross = ({ color = defaultColor }: IconProps) => (
    <svg className={defaultStyle} fill={color} version="1.1" viewBox="0 0 1000 1000" x="0px" y="0px">
        <path d="M976.3,97l-67.7-66.9c-18.3-18.3-48.6-18.3-67.7,0L503.2,367.8l-344-344c-18.3-18.3-48.6-18.3-67.7,0L23.7,91.4c-18.3,18.3-18.3,48.6,0,67.7L367,502.4L30.1,840.9c-18.3,18.3-18.3,48.6,0,67.7l67.7,67.7c18.3,18.3,48.6,18.3,67.7,0l337.7-337.7l337.7,337.7c18.3,18.3,48.6,18.3,67.7,0l67.7-67.7c18.3-18.3,18.3-48.6,0-67.7L637.8,503.2l337.7-337.7C994.6,146.4,994.6,116.1,976.3,97z" />
    </svg>
);

export default Cross;
