import React, { LabelHTMLAttributes, PropsWithChildren } from "react";

import './style.scss';

interface LabelProps extends PropsWithChildren<LabelHTMLAttributes<HTMLLabelElement>> {
}

function Label({ children, ...props }: LabelProps) {
    return <label className="label" {...props}> {children}</label>
}

export default Label;
