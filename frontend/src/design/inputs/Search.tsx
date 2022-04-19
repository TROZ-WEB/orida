import { SearchIcon } from '@design/icons';
import classnames from '@utils/classnames';
import React from 'react';

import TextInput, { TextInputProps } from './Text';

const SearchInput = ({ className, ...props }: TextInputProps) => (
    <div className="relative">
        <SearchIcon className="absolute pb-2" />
        <TextInput className={classnames('pl-9', className)} {...props} />
    </div>
);

export default SearchInput;
