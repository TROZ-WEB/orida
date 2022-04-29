/* eslint-disable react/jsx-no-useless-fragment */
import Label from '@design/Label';
import Space from '@design/Space';
import classnames from '@utils/classnames';
import { InputHTMLAttributes, ReactNode } from 'react';

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label?: ReactNode;
    name: string;
    register: any;
    required?: boolean;
    theme?: 'light' | 'dark';
    options:
        | {
              label: string;
              value: string;
          }[]
        | null;
}

const classes = {
    wrapper: `
    inline-block
    mr-1
    mb-1
    `,
    input: `
    absolute
    left-[-100vw]
    opacity-0
    peer
    `,
    label: `
    cursor-pointer
    border
    border-black
    rounded-full
    py-0.5
    px-4
    transition-all

    focus:border-secondary
    focus:text-secondary
    
    hover:border-secondary
    hover:text-secondary

    peer-checked:border-secondary
    peer-checked:text-white
    peer-checked:bg-secondary
    `,
    inputDarkTheme: `
    border-b-white
    text-white
    `,
    labelDarkTheme: `
    text-white
    `,
};

const MultiSelectInput = ({
    className,
    label,
    name,
    register,
    required = false,
    theme = 'light',
    options,
    ...props
}: Props) => (
    <div className='w-full'>
        {label && (
            <>
                <Label
                    className={theme === 'dark' ? classes.labelDarkTheme : undefined}
                    htmlFor={name}
                >
                    {label}
                </Label>
                <Space px={8} />
            </>
        )}
        {options?.map((option) => (
            <label key={option.value} className={classes.wrapper} htmlFor={option.value}>
                <input
                    {...register(name, { required })}
                    className={classnames(
                        classes.input,
                        theme === 'dark' ? classes.inputDarkTheme : undefined,
                        className
                    )}
                    id={option.value}
                    name={name}
                    type='checkbox'
                    value={option.value}
                    {...props}
                />
                <span
                    className={classnames(
                        classes.label,
                        theme === 'dark' ? classes.labelDarkTheme : undefined
                    )}
                >
                    {option.label}
                </span>
            </label>
        ))}
    </div>
);

export default MultiSelectInput;
