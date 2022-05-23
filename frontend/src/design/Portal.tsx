/* SOURCE: https://www.jayfreestone.com/writing/react-portals-with-hooks/ */
import usePortal from '@hooks/usePortal';
import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

/**
 * @example
 * <Portal id="modal">
 *   <p>Thinking with portals</p>
 * </Portal>
 */
interface PortalProps {
    id: string;
}
const Portal = ({ id, children }: PropsWithChildren<PortalProps>) => {
    const target = usePortal(id) as any;

    return createPortal(children, target);
};

export default Portal;
