import { Message } from '@services/threads';

interface MessageTileProps {
    message: Message;
}

const MessageTile = ({ message }: MessageTileProps) => {
    return <span>{message.content}</span>;
};

export default MessageTile;
