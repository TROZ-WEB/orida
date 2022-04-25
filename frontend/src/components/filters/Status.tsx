import StatusTile from '@components/filters/StatusTile';
import H3 from '@design/titles/H3';
import { Status } from '@services/status';

interface StatusFilterProps {
    title: string;
    options: Status[];
    select: (status: Status) => void;
    selection: Status[];
    unselect: (status: Status) => void;
}

const classes = {
    wrapper: `pt-6 pb-5`,
    title: `mb-3.5`,
};

const StatusFilter = ({ options, select, title, unselect, selection }: StatusFilterProps) => (
    <div className={classes.wrapper}>
        <H3 className={classes.title}>{title}</H3>
        <div className='grid grid-cols-3'>
            {options.map((status) => {
                const isActive = selection.map((element) => element.id).includes(status.id);

                const toggleStatus = (clickedStatus: Status) => {
                    const toCall = isActive ? unselect : select;
                    toCall(clickedStatus);
                };

                return (
                    <StatusTile
                        key={status.id}
                        active={isActive}
                        onClick={toggleStatus}
                        status={status}
                    />
                );
            })}
        </div>
    </div>
);

export default StatusFilter;
