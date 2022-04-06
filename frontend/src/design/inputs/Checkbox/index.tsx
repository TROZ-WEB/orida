import './style.scss';

import Label from '@design/Label';
import React from 'react';

interface CheckboxInputProps {
    label: string;
    name: string;
    register: any;
}

function CheckboxInput({ label, name, register }: CheckboxInputProps) {
    return (
        <div className="checkbox-input">
            <Label htmlFor={name}>{label}</Label>
            <input id={name} type="checkbox" {...register(name)} />
        </div>
    );
}

export default CheckboxInput;
