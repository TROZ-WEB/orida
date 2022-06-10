import Avatar from '@design/Avatar';
import { Paragraph, SmallGreyText } from '@design/texts';
import { H3 } from '@design/titles';
import useSelector from '@hooks/useSelector';
import useThunkDispatch from '@hooks/useThunkDispatch';
import { Message } from '@services/messages';
import notify, { NotificationType } from '@services/notifications';
import { getAuth } from '@store/auth/actions';
import { deleteMessage } from '@store/messages/actions';
import { getOne as getOneThread } from '@store/threads/actions';
import formatRelative from '@utils/formatRelativeLocalized';
import getInitials from '@utils/getInitials';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface MessageTileProps {
    message: Message;
}

const classes = {
    message: `
        py-2
        px-3
        bg-background
        rounded-lg
    `,
    metadatas: `
        flex
        align-center
        justify-between
    `,
};

const MessageTile = ({ message }: MessageTileProps) => {
    const dispatch = useThunkDispatch();
    const initials = getInitials(message.author.fullname);
    const auth = useSelector((state) => state.auth.data);

    const { t } = useTranslation();

    useEffect(() => {
        dispatch(getAuth());
    }, []);

    const isAuthor = auth.id === message.author.id;

    const handleDelete = async () => {
        try {
            await dispatch(deleteMessage({ id: message.id }));
            await dispatch(getOneThread(message.thread.id));
            notify(NotificationType.Success, t('success_message_deleted'));
        } catch (e: any) {
            notify(NotificationType.Error, e.message);
        }
    };

    return (
        <div className='mb-3'>
            <div className='flex'>
                <div>
                    {/* TODO : add picture in avatar */}
                    <Avatar initials={initials} pictureURL={null} size={30} />
                </div>
                <div className='pl-3 w-full'>
                    <div className={classes.message}>
                        <H3>{message.author.fullname}</H3>
                        <Paragraph>{message.content}</Paragraph>
                    </div>
                    <SmallGreyText>{formatRelative(message.createdAt, new Date())} </SmallGreyText>
                    {isAuthor && (
                        <button onClick={handleDelete}>
                            <SmallGreyText>| {t('delete_message')}</SmallGreyText>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MessageTile;
