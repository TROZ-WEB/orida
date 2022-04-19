/* eslint-disable max-len */
import IconProps from '@customTypes/iconProps';
import classnames from '@utils/classnames';
import React from 'react';

import { defaultStyle } from './icon-style';

const Search = ({ className }: IconProps) => (
    <svg className={classnames(defaultStyle, className)} fill="none" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.5 16.5C19.5376 13.4624 19.5376 8.53757 16.5 5.5C13.4624 2.46243 8.53757 2.46243 5.5 5.5C2.46243 8.53757 2.46243 13.4624 5.5 16.5C8.53757 19.5376 13.4624 19.5376 16.5 16.5Z" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        <path d="M20.9034 20.9029L16.5039 16.5034" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>

);

export default Search;
