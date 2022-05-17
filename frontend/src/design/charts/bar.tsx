import classnames from '@utils/classnames';

interface BarChartClasses {
    bar?: string;
    track?: string;
    wrapper?: string;
}

const classes = {
    bar: 'h-[6px] bg-secondary absolute inset-0',
    track: 'h-[6px] bg-background absolute inset-0',
    wrapper: 'h-[6px] relative w-full overflow-hidden',
};

interface BarChartProps {
    classes?: BarChartClasses;
    className?: string;
    value: number;
}

const BarChart = ({ classes: styleClasses, className, value }: BarChartProps) => {
    return (
        <div className={className}>
            <div className={classnames(classes.wrapper, styleClasses)}>
                <div className={classnames(classes.track, styleClasses)} />
                <div
                    className={classnames(classes.bar, styleClasses)}
                    style={{ width: `${value}%` }}
                />
            </div>
        </div>
    );
};

export default BarChart;
