import Label from '@design/Label';
import Space from '@design/Space';
import classnames from '@utils/classnames';
import { InputHTMLAttributes, ReactNode } from 'react';

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string | ReactNode;
    name: string;
    register: any;
    required?: boolean;
    theme?: 'light' | 'dark';
}

const INPUT_BASE_CLASSES = `
w-full
bg-transparent
border-0
border-b-2
rounded-none
border-b-grey
outline-none
text-black
duration-300

focus:border-b-secondary

hover:border-b-secondary
hover:cursor-text
`;

const INPUT_DARK_THEME = `
border-b-white
text-white
`;

const LABEL_DARK_THEME = 'text-white';

const TextInput = ({
    className,
    label,
    name,
    register,
    required = false,
    theme = 'light',
    type = 'text',
    ...props
}: TextInputProps) => (
    <div className='w-full'>
        {label && (
            <>
                <Label className={theme === 'dark' ? LABEL_DARK_THEME : undefined} htmlFor={name}>
                    {label}
                </Label>
                <Space px={8} />
            </>
        )}
        <input
            className={classnames(
                INPUT_BASE_CLASSES,
                theme === 'dark' ? INPUT_DARK_THEME : undefined,
                className
            )}
            id={name}
            type={type}
            {...register(name, { required })}
            {...props}
        />
    </div>
);

export default TextInput;
