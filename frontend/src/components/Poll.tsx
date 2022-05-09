import useSelector from '@hooks/useSelector';
import { Widget } from '@typeform/embed-react';
import classnames from '@utils/classnames';

interface PollComponentProps {
    className?: string;
    pollId: string;
}

const PollComponent = ({ className, pollId }: PollComponentProps) => {
    const userId = useSelector((state) => state.auth.data.id);

    return (
        <Widget
            className={classnames('w-full', className)}
            id={`${pollId}#userid=${userId}`}
            style={{ height: '450px' }}
        />
    );
};

export default PollComponent;
