import Avatar from '@design/Avatar';
import { Paragraph, SmallGreyText } from '@design/texts';
import { H3 } from '@design/titles';
import { Message } from '@services/messages';
import formatRelative from '@utils/formatRelativeLocalized';
import getInitials from '@utils/getInitials';

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
    const initials = getInitials(message.author.fullname);

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
                    <SmallGreyText>{formatRelative(message.createdAt, new Date())}</SmallGreyText>
                </div>
            </div>
        </div>
    );
};

export default MessageTile;
