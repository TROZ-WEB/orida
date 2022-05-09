import Poll from '@components/Poll';
import PollCreateForm from '@components/PollCreateForm';
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

interface PollSectionProps {
    project: Project;
    posts: Post[];
    refresh: () => void;
}

const styles = {
    firstPoll: 'pl-0',
    lastPoll: 'pr-0',
};

const PollSection = ({ posts, project, refresh }: PollSectionProps) => {
    const { isManager } = useRole();
    const modalProps = useModal();

    return (
        <>
            <div className='p-16'>
                <div className='flex justify-between mb-6'>
                    <H1>Sondages ({posts.length})</H1>
                    {isManager && (
                        <IconButton
                            className='w-[35px] h-[35px]'
                            onClick={() => modalProps.open()}
                            secondary
                        >
                            <Icon color='#fff' name='plus' />
                        </IconButton>
                    )}
                </div>
                <div className='relative w-full'>
                    <Carousel>
                        {posts.map((post, index) => (
                            <div
                                key={post.id}
                                className={classnames(
                                    'pl-2 pr-2',
                                    { [styles.firstPoll]: index === 0 },
                                    { [styles.lastPoll]: index === posts.length - 1 }
                                )}
                            >
                                {post.poll?.answered ? (
                                    <span>résultats</span>
                                ) : (
                                    <Poll key={post.id} pollId={post.poll!.pollId} />
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
