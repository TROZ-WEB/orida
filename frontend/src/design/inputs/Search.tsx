import { Theme } from '@customTypes/theme';
import Icon from '@design/Icon';
import classnames from '@utils/classnames';

import TextInput, { TextInputProps } from './Text';

const SearchInput = ({ className, theme = Theme.Light, ...props }: TextInputProps) => (
    <div className='relative'>
        <Icon
            className='absolute pb-2 w-auto'
            color={theme === Theme.Dark ? '#fff' : '#000'}
            name='search'
        />
        <TextInput className={classnames('pl-9', className)} theme={theme} {...props} />
    </div>
);

export default SearchInput;
