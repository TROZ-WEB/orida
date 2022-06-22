import RoleType from '@customTypes/RoleType';
import Avatar from '@design/Avatar';
import { Paragraph, SmallGreyText } from '@design/texts';
import { H3 } from '@design/titles';
import useRole from '@hooks/useRole';
import useSelector from '@hooks/useSelector';
import useThunkDispatch from '@hooks/useThunkDispatch';
import { Message } from '@services/messages';
import { Project } from '@services/projects';
import notify, { ToastNotificationType } from '@services/toastNotifications';
import { getAuth } from '@store/auth/actions';
import { deleteMessage, toggleMessageModeration } from '@store/messages/actions';
import { getOne as getOneThread } from '@store/threads/actions';
import formatRelative from '@utils/formatRelativeLocalized';
import getInitials from '@utils/getInitials';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface MessageTileProps {
    message: Message;
    threadId: string;
    project: Project;
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

const MessageTile = ({ message, threadId, project }: MessageTileProps) => {
    const dispatch = useThunkDispatch();
    const initials = getInitials(message.author.fullname);
    const auth = useSelector((state) => state.auth.data);
    const { isProjectAdmin } = useRole({ role: RoleType.Admin, project });

    const { t } = useTranslation();

    useEffect(() => {
        dispatch(getAuth());
    }, []);

    const isAuthor = auth.id === message.author.id;

    const handleDelete = async () => {
        try {
            await dispatch(deleteMessage({ id: message.id }));
            await dispatch(getOneThread(message.thread.id));
            notify(ToastNotificationType.Success, t('success_message_deleted'));
        } catch (e: any) {
            notify(ToastNotificationType.Error, e.message);
        }
    };

    const handleModerate = async () => {
        try {
            await dispatch(toggleMessageModeration({ id: message.id }));
            await dispatch(getOneThread(threadId));
        } catch (e: any) {
            notify(ToastNotificationType.Error, e.message);
        }
    };

    return isProjectAdmin || !message.isModerated ? (
        <div className='flex mb-3'>
            <div>
                {/* TODO : add picture in avatar */}
                <Avatar initials={initials} pictureURL={null} size={30} />
            </div>
            <div className='pl-3 w-full'>
                <div className={classes.message}>
                    <H3 className={message.isModerated && 'text-gray-400'}>
                        {message.author.fullname}
                    </H3>
                    <Paragraph className={message.isModerated && 'text-gray-400'}>
                        {message.content}
                    </Paragraph>
                </div>
                <SmallGreyText>{formatRelative(message.createdAt, new Date())} </SmallGreyText>
                {isAuthor && (
                    <button onClick={handleDelete}>
                        <SmallGreyText>| {t('delete_message')} </SmallGreyText>
                    </button>
                )}
                {isProjectAdmin && (
                    <button onClick={handleModerate}>
                        <SmallGreyText>
                            | {message.isModerated ? t('restore_message') : t('moderate_message')}{' '}
                        </SmallGreyText>
                    </button>
                )}
            </div>
        </div>
    ) : null;
};

export default MessageTile;
