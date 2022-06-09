import './index.css';

import classnames from '@utils/classnames';
import { PropsWithChildren } from 'react';

interface ParsedHTMLProps {
    className?: string;
}

const ParsedHTML = ({ children, className }: PropsWithChildren<ParsedHTMLProps>) => (
    <div className={classnames('parsed-html', className)}>{children}</div>
);

export default ParsedHTML;
