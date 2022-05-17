import { BarChart } from '@design/charts';
import classnames from '@utils/classnames';
import { clamp } from 'ramda';

interface PollResultsRowProps {
    className?: string;
    label: string;
    value: number;
}

const PollResultsRow = ({ className, label, value }: PollResultsRowProps) => {
    const sanitizedValue = clamp(0, 100, value) || 0;

    return (
        <div className={classnames('flex flex-col', className)}>
            <div className='flex justify-between mb-1'>
                <span className='text-sm'>{label}</span>
                <span className='text-sm text-neutral-400'>{sanitizedValue} %</span>
            </div>
            <BarChart value={sanitizedValue} />
        </div>
    );
};

export default PollResultsRow;
