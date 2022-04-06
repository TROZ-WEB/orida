import React, { LabelHTMLAttributes, PropsWithChildren } from 'react';

type LabelProps = PropsWithChildren<LabelHTMLAttributes<HTMLLabelElement>>

function Label({ children, htmlFor, ...props }: LabelProps) {
    return <label className="text-xs" htmlFor={htmlFor} {...props}> {children}</label>;
}

export default Label;
