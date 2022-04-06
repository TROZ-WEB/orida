import Label from '@design/Label';
import React, { InputHTMLAttributes } from 'react';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    name: string;
    register: any;
}

function TextInput({ label, name, register, type = 'text', ...props }: TextInputProps) {
    return (
        <div className="w-full">
            {label && <Label htmlFor={name}>{label}</Label>}
            <input id={name} className="w-full" type={type} {...register(name)} {...props} />
        </div>
    );
}

export default TextInput;
