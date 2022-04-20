import classnames from '@utils/classnames';
import React, { PropsWithChildren } from 'react';

interface TagProps {
    className?: string;
}

const TAG_CLASSES = `
bg-success
inline-block
px-4
py-1
rounded-xl
text-white
text-xs
w-fit
`;

const Tag = ({ children, className }: PropsWithChildren<TagProps>) => (
    <span className={classnames(TAG_CLASSES, className)}>{children}</span>
);

export default Tag;
