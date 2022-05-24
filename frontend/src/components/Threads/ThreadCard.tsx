import { InvisibleButton } from '@design/buttons';
import Icon from '@design/Icon';
import Modal from '@design/modals/DefaultModal';
import { SmallGreyText } from '@design/texts';
import useModal from '@hooks/useModal';
import { Thread } from '@services/threads';
import ellipsis from '@utils/ellipsis';
import formatRelative from '@utils/formatRelativeLocalized';

import ThreadDetails from './ThreadDetails';

const styles = {
    card: 'bg-white rounded-lg p-5 pb-3 h-[190px] shadow-card w-full items-start',
    subject: 'text-lg leading-6 h-full w-full text-left',
    footer: 'flex justify-between align-center w-full',
    seeMore: 'text-sm text-primary font-bold',
};

interface ThreadCardProps {
    thread: Thread;
}

const ThreadCard = ({ thread }: ThreadCardProps) => {
    const modalProps = useModal();
    const { open } = modalProps;

    return (
        <>
            <InvisibleButton className={styles.card} onClick={() => open()}>
                <SmallGreyText className='pb-7'>
                    {formatRelative(thread.createdAt, new Date())}
                </SmallGreyText>
                <span className={styles.subject}>{ellipsis(thread.subject, 50)}</span>
                <div className={styles.footer}>
                    <Icon name='cartoon-bubble' size={14} />
                    <span className={styles.seeMore}>Voir plus</span>
                </div>
            </InvisibleButton>
            <Modal {...modalProps}>
                <ThreadDetails threadId={thread.id} />
            </Modal>
        </>
    );
};

export default ThreadCard;
