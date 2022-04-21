import Icon from '@design/Icon';
import classnames from '@utils/classnames';

import TextInput, { TextInputProps } from './Text';

const SearchInput = ({ className, theme, ...props }: TextInputProps) => (
    <div className='relative'>
        <Icon className='absolute pb-2' color={theme === 'dark' ? '#fff' : '#000'} name='search' />
        <TextInput className={classnames('pl-9', className)} {...props} />
    </div>
);

export default SearchInput;
