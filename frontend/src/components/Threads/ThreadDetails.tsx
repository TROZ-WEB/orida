import Divider from '@design/Divider';
import { H2 } from '@design/titles';
import ThreadService, { Message, Thread } from '@services/threads';
import { useEffect, useState } from 'react';

import MessageTile from './Message';
import SendMessageForm from './SendMessageForm';

const classes = {
    subject: 'text-lg',
    title: 'mb-4',
};

interface ThreadDetailsProps {
    thread: Thread;
}

const ThreadDetails = ({ thread }: ThreadDetailsProps) => {
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        async function getMessages() {
            const fullThread = await ThreadService.getOne(thread.id);
            setMessages(fullThread.messages);
        }

        getMessages();
    }, []);

    return (
        <>
            <H2 className={classes.title}>Sujet</H2>
            <span className={classes.subject}>{thread.subject}</span>
            <Divider className='my-5' />
            <H2 className={classes.title}>Échanges</H2>
            <div>
                {messages.map((message) => (
                    <MessageTile message={message} />
                ))}
            </div>
            <SendMessageForm />
        </>
    );
};

export default ThreadDetails;
