import { classnames } from '@utils/classnames';
import React, { LabelHTMLAttributes, PropsWithChildren } from 'react';

type LabelProps = PropsWithChildren<LabelHTMLAttributes<HTMLLabelElement>>

function Label({ children, className, htmlFor, ...props }: LabelProps) {
    return <label className={classnames("text-xs", className)} htmlFor={htmlFor} {...props}> {children}</label>;
}

export default Label;
