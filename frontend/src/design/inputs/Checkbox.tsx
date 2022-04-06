import Label from '@design/Label';
import React from 'react';

interface CheckboxInputProps {
    label: string;
    name: string;
    register: any;
}

function CheckboxInput({ label, name, register }: CheckboxInputProps) {
    return (
        <div className="flex">
            <Label htmlFor={name}>{label}</Label>
            <input className="ml-2" id={name} type="checkbox" {...register(name)} />
        </div>
    );
}

export default CheckboxInput;
