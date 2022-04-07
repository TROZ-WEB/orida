import Label from '@design/Label';
import Space from '@design/Space';
import React, { InputHTMLAttributes } from 'react';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    labelClassNames?: string;
    name: string;
    register: any;
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

focus:border-b-secondary

hover:border-b-secondary
hover:cursor-text
`;

function TextInput({ label, labelClassNames, name, register, type = 'text', ...props }: TextInputProps) {
    return (
        <div className="w-full">
            {label && <Label className={labelClassNames} htmlFor={name}>{label}</Label>}
            <Space px={8} />
            <input id={name} className={INPUT_BASE_CLASSES} type={type} {...register(name)} {...props} />
        </div>
    );
}

export default TextInput;
