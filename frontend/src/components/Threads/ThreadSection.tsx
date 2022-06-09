import { IconButton } from '@design/buttons';
import Carousel from '@design/Carousel';
import Icon from '@design/Icon';
import Modal from '@design/modals/DefaultModal';
import { H1 } from '@design/titles';
import useModal from '@hooks/useModal';
import useRole from '@hooks/useRole';
import { Project } from '@services/projects';
import { Thread } from '@services/threads';
import colors from '@styles/colors';
import classnames from '@utils/classnames';
import { useTranslation } from 'react-i18next';

import ThreadCard from './ThreadCard';
import ThreadCreateForm from './ThreadCreateForm';

interface ThreadSectionProps {
    project: Project;
    threads: Thread[];
    refresh: () => void;
}

const styles = {
    firstPoll: 'pl-0',
    lastPoll: 'pr-0',
};

const ThreadSection = ({ threads, project, refresh }: ThreadSectionProps) => {
    const modalProps = useModal();
    const { t } = useTranslation();
    const { isProjectAdmin } = useRole({ project });

    return (
        <>
            <div className='p-16'>
                <div className='flex justify-between mb-6'>
                    <H1>
                        {t('project_thread_section_title')} ({threads.length})
                    </H1>
                    {isProjectAdmin && (
                        <IconButton
                            className='w-[35px] h-[35px]'
                            onClick={() => modalProps.open()}
                            secondary
                        >
                            <Icon className='stroke-white' color={colors.secondary} name='plus' />
                        </IconButton>
                    )}
                </div>
                <div className='relative w-full'>
                    <Carousel>
                        {threads.map((thread, index) => (
                            <div
                                key={thread.id}
                                className={classnames(
                                    'pl-2 pr-2 h-full',
                                    { [styles.firstPoll]: index === 0 },
                                    { [styles.lastPoll]: index === threads.length - 1 }
                                )}
                            >
                                <ThreadCard thread={thread!} />
                            </div>
                        ))}
                    </Carousel>
                </div>
            </div>
            <Modal {...modalProps}>
                <ThreadCreateForm
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

export default ThreadSection;
