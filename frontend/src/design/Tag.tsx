import classnames from '@utils/classnames';
import React, { PropsWithChildren } from 'react';

interface TagProps {
    className?: string;
    color?: string;
}

const TAG_CLASSES = `
inline-block
px-4
py-1
rounded-xl
text-white
text-xs
w-fit
`;

const Tag = ({ children, className, color = '#cccccc' }: PropsWithChildren<TagProps>) => {
    return (
        <span className={classnames(TAG_CLASSES, className)} style={{ backgroundColor: color }}>
            {children}
        </span>
    );
};
export default Tag;
