import { BarChart } from '@design/charts';
import classnames from '@utils/classnames';

interface PollResultsRowProps {
    className?: string;
    label: string;
    value: number;
}

const PollResultsRow = ({ className, label, value }: PollResultsRowProps) => {
    return (
        <div className={classnames('flex flex-col', className)}>
            <div className='flex justify-between mb-1'>
                <span className='text-sm'>{label}</span>
                <span className='text-sm text-neutral-400'>{value} %</span>
            </div>
            <BarChart value={value} />
        </div>
    );
};

export default PollResultsRow;
