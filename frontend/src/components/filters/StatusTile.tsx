import { CheckboxInput } from '@design/inputs';
import { Status } from '@services/status';

interface StatusTileProps {
    active?: boolean;
    status: Status;
    onClick?: (status: Status) => void;
}

const StatusTile = ({ active = false, onClick, status }: StatusTileProps) => {
    const handleChange = () => {
        if (onClick) {
            onClick(status);
        }
    };

    return <CheckboxInput label={status.label} onChange={handleChange} value={active} />;
};

export default StatusTile;
