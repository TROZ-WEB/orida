import WithTheme, { Theme } from '@customTypes/theme';
import Label from '@design/Label';
import Space from '@design/Space';
import classnames from '@utils/classnames';
import { InputHTMLAttributes, ReactNode } from 'react';

export interface Option {
    label: string;
    value: string;
}

interface Props extends InputHTMLAttributes<HTMLInputElement>, WithTheme {
    label?: ReactNode;
    name: string;
    register: any;
    required?: boolean;
    options: Option[];
}

const classes = {
    input: `
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
    `,
    inputDarkTheme: `
    border-b-white
    text-white
    `,
    labelDarkTheme: `
    text-white
    `,
};

const SelectInput = ({
    className,
    label,
    name,
    register,
    required = false,
    theme = Theme.Light,
    options,
    ...props
}: Props) => (
    <div className='w-full'>
        {label && (
            <>
                <Label
                    className={theme === Theme.Dark ? classes.labelDarkTheme : undefined}
                    htmlFor={name}
                >
                    {label}
                </Label>
                <Space px={8} />
            </>
        )}
        <select
            className={classnames(
                classes.input,
                theme === Theme.Dark ? classes.inputDarkTheme : undefined,
                className
            )}
            id={name}
            {...register(name, { required })}
            {...props}
        >
            {options?.map((option) => (
                <option key={option.value?.toString()} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    </div>
);

export default SelectInput;
