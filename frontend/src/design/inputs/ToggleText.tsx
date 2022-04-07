import ControllerProps from '@customTypes/controllerProps';
import Label from '@design/Label';
import Space from '@design/Space';
import { classnames } from '@utils/classnames';
import React from 'react';
import { Controller } from 'react-hook-form';

interface ToggleTextInputProps {
    label: string;
    labelClassName?: string;
    trueText: string;
    falseText: string;
    onChange: any;
    value: boolean;
    name: string;
}

const ON_FALSE = `
top-0
bottom-0
right-0
left-1/2
`;

const TEXT_CLASSES = `
inline-block
relative
text-center
w-full
text-sm
duration-300
`;

const SELECTED_TEXT = `
font-bold
`;

function ToggleTextInput({ label, labelClassName, onChange, value, trueText, falseText, name }: ToggleTextInputProps) {
    const booleanValue = !!value;

    return (
        <div className="flex flex-col">
            <input id={name} className="opacity-0 h-0 w-0" type="checkbox" checked={booleanValue} name={name} readOnly />
            <Label htmlFor={name} className={labelClassName}>{label}</Label>
            <Space px={8} />
            <div
                className='flex bg-white py-2 rounded-[20px] relative overflow-hidden cursor-pointer'
                onClick={() => onChange(!value)}
            >
                <span className={classnames(
                    'absolute inset-0 bg-secondary w-1/2 rounded-[20px] duration-300',
                    { [ON_FALSE]: !booleanValue }
                )} />
                <span className={classnames(TEXT_CLASSES, { [SELECTED_TEXT]: booleanValue })}>{trueText}</span>
                <span className={classnames(TEXT_CLASSES, { [SELECTED_TEXT]: !booleanValue })}>{falseText}</span>
            </div>
        </div>
    );
}

interface ControlledToggleTextInput<T> extends ControllerProps<T> {
    label: string;
    trueText: string;
    falseText: string;
    labelClassName?: string;
}

function ControlledToggleTextInput<T = any>({ control, name, label, trueText, falseText, labelClassName, defaultValue }: ControlledToggleTextInput<T>) {
    return (
        <Controller
            control={control}
            name={name as any}
            defaultValue={defaultValue as any}
            render={
                ({
                    field: { onChange, value, name },
                }) => (
                    <ToggleTextInput
                        onChange={onChange}
                        value={value as any}
                        label={label}
                        trueText={trueText}
                        falseText={falseText}
                        labelClassName={labelClassName}
                        name={name}
                    />
                )}
        />
    )
}

export default ControlledToggleTextInput;
