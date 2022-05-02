import classnames from '@utils/classnames';
import { PropsWithChildren } from 'react';

interface WithClassName {
    className?: string;
}

export const Table = ({ className, children }: PropsWithChildren<WithClassName>) => (
    <div
        className={classnames(
            'border-border border-2 w-full bg-white rounded overflow-hidden border-b-0',
            className
        )}
    >
        <table className='border-collapse table-auto w-full text-sm'>{children}</table>
    </div>
);

export const Thead = ({ children, className }: PropsWithChildren<WithClassName>) => (
    <thead className={className}>{children}</thead>
);

export const Th = ({ children, className }: PropsWithChildren<WithClassName>) => (
    <th className={classnames('border-b font-bold p-4 pl-8 pb-3 text-left bg-border', className)}>
        {children}
    </th>
);

export const Tbody = ({ children, className }: PropsWithChildren<WithClassName>) => (
    <tbody className={className}>{children}</tbody>
);

export const Tr = ({ children, className }: PropsWithChildren<WithClassName>) => (
    <tr className={className}>{children}</tr>
);

export const Td = ({ children, className }: PropsWithChildren<WithClassName>) => (
    <td className={classnames('p-4 pl-8 border-b-2 border-border', className)}>{children}</td>
);
