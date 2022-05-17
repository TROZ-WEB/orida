import Post from '@customTypes/post';
import { IconButton } from '@design/buttons';
import Carousel from '@design/Carousel';
import Icon from '@design/Icon';
import Modal from '@design/modals/DefaultModal';
import { H1 } from '@design/titles';
import useModal from '@hooks/useModal';
import useRole from '@hooks/useRole';
import { Project } from '@services/projects';
import classnames from '@utils/classnames';
import { useTranslation } from 'react-i18next';

import ThreadCreateForm from './ThreadCreateForm';

interface ThreadSectionProps {
    project: Project;
    posts: Post[];
    refresh: () => void;
}

const styles = {
    card: 'bg-white rounded-lg p-5 pb-3 h-full flex flex-col justify-between',
    firstPoll: 'pl-0',
    lastPoll: 'pr-0',
};

const ThreadSection = ({ posts, project, refresh }: ThreadSectionProps) => {
    const { isManager } = useRole();
    const modalProps = useModal();
    const { t } = useTranslation();

    return (
        <>
            <div className='p-16'>
                <div className='flex justify-between mb-6'>
                    <H1>
                        {t('project_thread_section_title')} ({posts.length})
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
                        {posts.map((post, index) => (
                            <div
                                key={post.id}
                                className={classnames(
                                    'pl-2 pr-2 h-full',
                                    { [styles.firstPoll]: index === 0 },
                                    { [styles.lastPoll]: index === posts.length - 1 }
                                )}
                            >
                                <div className={styles.card}>
                                    <span>{post.thread?.id}</span>
                                </div>
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
