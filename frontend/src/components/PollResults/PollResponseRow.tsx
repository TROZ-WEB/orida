import { BarChart } from '@design/charts';
import { SmallGreyText } from '@design/texts';
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
                <SmallGreyText>{sanitizedValue} %</SmallGreyText>
            </div>
            <BarChart value={sanitizedValue} />
        </div>
    );
};

export default PollResultsRow;
