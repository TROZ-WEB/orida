import ControllerProps from '@customTypes/controllerProps';
import InvisibleButton from '@design/buttons/InvisibleButton';
import Label from '@design/Label';
import Space from '@design/Space';
import classnames from '@utils/classnames';
import React from 'react';
import { Controller } from 'react-hook-form';

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

interface ToggleTextInputProps<T> extends ControllerProps<T> {
    label: string;
    trueText: string;
    falseText: string;
    labelClassName?: string;
}

function ToggleTextInput<T = any>({
    control,
    defaultValue,
    falseText,
    label,
    labelClassName,
    name,
    trueText,
}: ToggleTextInputProps<T>) {
    return (
        <Controller
            control={control}
            defaultValue={defaultValue as any}
            name={name as any}
            render={
                ({
                    field: { onChange, value, name: fieldName },
                }) => {
                    const booleanValue = !!value;

                    return (
                        <div className="flex flex-col">
                            <input
                                checked={booleanValue}
                                className="opacity-0 h-0 w-0"
                                id={fieldName}
                                name={fieldName}
                                type="checkbox"
                                readOnly
                            />
                            <Label className={labelClassName} htmlFor={fieldName}>{label}</Label>
                            <Space px={8} />
                            <InvisibleButton
                                className={`flex bg-white py-2 rounded-[20px] relative overflow-hidden cursor-pointer
                                hover:bg-white`}
                                onClick={() => onChange(!value)}
                            >
                                <span className={classnames(
                                    'absolute inset-0 bg-secondary w-1/2 rounded-[20px] duration-300',
                                    { [ON_FALSE]: !booleanValue },
                                )}
                                />
                                <span className={classnames(TEXT_CLASSES, { [SELECTED_TEXT]: booleanValue })}>
                                    {trueText}
                                </span>
                                <span className={classnames(TEXT_CLASSES, { [SELECTED_TEXT]: !booleanValue })}>
                                    {falseText}
                                </span>
                            </InvisibleButton>
                        </div>
                    );
                }
            }
        />
    );
}

export default ToggleTextInput;
