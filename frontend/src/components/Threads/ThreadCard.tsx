import Icon from '@design/Icon';
import { SmallGreyText } from '@design/texts';
import { Thread } from '@services/threads';
import ellipsis from '@utils/ellipsis';
import formatRelative from '@utils/formatRelativeLocalized';

const styles = {
    card: 'bg-white rounded-lg p-5 pb-3 flex flex-col h-[190px] shadow-card',
    subject: 'text-lg leading-6 h-full',
    footer: 'flex justify-between align-center',
    seeMore: 'text-sm text-primary font-bold',
};

interface ThreadCardProps {
    thread: Thread;
}

const ThreadCard = ({ thread }: ThreadCardProps) => {
    return (
        <div className={styles.card}>
            <SmallGreyText className='pb-7'>
                {formatRelative(thread.createdAt, new Date())}
            </SmallGreyText>
            <span className={styles.subject}>{ellipsis(thread.subject, 50)}</span>
            <div className={styles.footer}>
                <Icon name='cartoon-bubble' size={14} />
                <span className={styles.seeMore}>Voir plus</span>
            </div>
        </div>
    );
};

export default ThreadCard;
