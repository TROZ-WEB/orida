import Icon from '@design/Icon';
import classnames from '@utils/classnames';

import TextInput, { TextInputProps } from './Text';

const SearchInput = ({ className, ...props }: TextInputProps) => (
    <div className='relative'>
        <Icon className='absolute pb-2' name='search' />
        <TextInput className={classnames('pl-9', className)} {...props} />
    </div>
);

export default SearchInput;
