import Option from '@customTypes/Option';
import WithTheme, { Theme } from '@customTypes/theme';
import Label from '@design/Label';
import Space from '@design/Space';
import classnames from '@utils/classnames';
import { InputHTMLAttributes, ReactNode } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement>, WithTheme {
    label?: ReactNode;
    name: string;
    register: any;
    required?: boolean;
    options: Option[];
    emptyChoice?: boolean;
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
    inputDisabled: 'hover:cursor-not-allowed',
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
    emptyChoice = false,
    disabled,
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
                { [classes.inputDisabled]: disabled },
                theme === Theme.Dark ? classes.inputDarkTheme : undefined,
                className
            )}
            defaultValue={emptyChoice ? '' : undefined}
            disabled={disabled}
            id={name}
            {...register(name, { required })}
            {...props}
        >
            {emptyChoice && (
                <option value='' disabled hidden>
                    Choisir
                </option>
            )}
            {options?.map((option) => (
                <option key={option.value?.toString()} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    </div>
);

export default SelectInput;
