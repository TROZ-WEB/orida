import './style.scss';

import Label from '@design/Label';
import React, { InputHTMLAttributes } from 'react';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    name: string;
    register: any;
}

function TextInput({ label, name, register, type = 'text', ...props }: TextInputProps) {
    return (
        <div className="text-input">
            {label && <Label htmlFor={name}>{label}</Label>}
            <input id={name} type={type} {...register(name)} {...props} />
        </div>
    );
}

export default TextInput;
