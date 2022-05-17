import Icon from '@design/Icon';
import classnames from '@utils/classnames';
import { ChangeEvent } from 'react';

const classes = {
    label: `
        block
        cursor-pointer
        group
        leading-4
        mb-3
        pl-8
        relative
        text-sm
        text-text-secondary
    `,
    checkmark: `
        absolute
        bg-background
        h-[25px]
        left-0
        p-1
        top-0
        w-[25px]

        group-hover:bg-background-hover
    `,
    checkmarkActive: `
        bg-primary

        group-hover:bg-primary-dark
    `,
    input: `
        absolute
        custor-pointer
        h-0
        opacity-0
        w-0
    `,
    icon: `
        group-hover:fill-white
        h-full
    `,
};

interface CheckboxInputProps {
    className?: string;
    label: string;
    onChange?: (newValue: boolean, event: ChangeEvent<HTMLInputElement>) => void;
    value: boolean;
}

const CheckboxInput = ({ className, label, onChange, value }: CheckboxInputProps) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(!value, event);
        }
    };

    return (
        <label className={classnames(classes.label, className)} htmlFor={label}>
            {label}
            <input
                checked={value}
                className={classes.input}
                id={label}
                onChange={handleChange}
                type='checkbox'
            />
            <span className={classnames(classes.checkmark, { [classes.checkmarkActive]: value })}>
                {value && <Icon className={classes.icon} color='#fff' name='checkmark' />}
            </span>
        </label>
    );
};

export default CheckboxInput;
