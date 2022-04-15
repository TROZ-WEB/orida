import Label from '@design/Label';
import React from 'react';

interface CheckboxInputProps {
    label: string;
    name: string;
    register: any;
}

const CheckboxInput = ({ label, name, register }: CheckboxInputProps) => (
    <div className="flex">
        <Label htmlFor={name}>{label}</Label>
        <input className="ml-2" id={name} type="checkbox" {...register(name)} />
    </div>
);

export default CheckboxInput;
