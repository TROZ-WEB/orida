import useSelector from '@hooks/useSelector';
import { Poll } from '@services/polls';
import { Widget } from '@typeform/embed-react';
import classnames from '@utils/classnames';

interface PollComponentProps {
    className?: string;
    poll: Poll;
}

const PollComponent = ({ className, poll }: PollComponentProps) => {
    const userId = useSelector((state) => state.auth.data.id);

    return (
        <Widget
            className={classnames('w-full', className)}
            id={`${poll.pollId}#userid=${userId}`}
            style={{ height: '450px' }}
        />
    );
};

export default PollComponent;
