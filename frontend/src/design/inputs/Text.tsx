import Label from '@design/Label';
import Space from '@design/Space';
import React, { InputHTMLAttributes } from 'react';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    labelClassNames?: string;
    name: string;
    register: any;
    required?: boolean;
}

const INPUT_BASE_CLASSES = `
w-full
bg-transparent
border-0
border-b-2
rounded-none
border-b-white
outline-none
text-white
duration-300

focus:border-b-secondary

hover:border-b-secondary
hover:cursor-text
`;

function TextInput({
    label,
    labelClassNames,
    name,
    register,
    required = false,
    type = 'text',
    ...props
}: TextInputProps) {
    return (
        <div className="w-full">
            {label && <Label className={labelClassNames} htmlFor={name}>{label}</Label>}
            <Space px={8} />
            <input
                className={INPUT_BASE_CLASSES}
                id={name}
                type={type}
                {...register(name, { required })}
                {...props}
            />
        </div>
    );
}

export default TextInput;
