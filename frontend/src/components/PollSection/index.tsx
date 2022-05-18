import Poll from '@components/Poll';
import PollCreateForm from '@components/PollCreateForm';
import { IconButton } from '@design/buttons';
import Carousel from '@design/Carousel';
import Icon from '@design/Icon';
import Modal from '@design/modals/DefaultModal';
import { H1 } from '@design/titles';
import useModal from '@hooks/useModal';
import useRole from '@hooks/useRole';
import { Poll as PollType } from '@services/polls';
import { Project } from '@services/projects';
import classnames from '@utils/classnames';
import { useTranslation } from 'react-i18next';

import PollResults from '../PollResults';
import PollSectionBlurred from './blurred';

interface PollSectionProps {
    project: Project;
    polls: PollType[];
    refresh: () => void;
}

const styles = {
    firstPoll: 'pl-0',
    lastPoll: 'pr-0',
};

const PollSection = ({ polls, project, refresh }: PollSectionProps) => {
    const { isAuthenticated, isManager } = useRole();
    const modalProps = useModal();
    const { t } = useTranslation();

    if (!isAuthenticated) {
        return <PollSectionBlurred />;
    }

    return (
        <>
            <div className='p-16'>
                <div className='flex justify-between mb-6'>
                    <H1>
                        {t('project_polls_title')} ({polls.length})
                    </H1>
                    {isManager && (
                        <IconButton
                            className='w-[35px] h-[35px]'
                            onClick={() => modalProps.open()}
                            secondary
                        >
                            <Icon className='stroke-white' color='#fff' name='plus' />
                        </IconButton>
                    )}
                </div>
                <div className='relative w-full'>
                    <Carousel>
                        {polls.map((poll, index) => (
                            <div
                                key={poll.id}
                                className={classnames(
                                    'pl-2 pr-2 h-full',
                                    { [styles.firstPoll]: index === 0 },
                                    { [styles.lastPoll]: index === polls.length - 1 }
                                )}
                            >
                                {poll.answered ? (
                                    <PollResults key={poll.id} poll={poll} />
                                ) : (
                                    <Poll key={poll.id} poll={poll} />
                                )}
                            </div>
                        ))}
                    </Carousel>
                </div>
            </div>
            <Modal {...modalProps}>
                <PollCreateForm
                    onSubmit={() => {
                        modalProps.close();
                        refresh();
                    }}
                    projectId={project.id}
                />
            </Modal>
        </>
    );
};

export default PollSection;
