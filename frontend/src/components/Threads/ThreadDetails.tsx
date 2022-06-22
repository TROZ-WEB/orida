/* eslint-disable react/jsx-no-useless-fragment */
import Divider from '@design/Divider';
import Loader from '@design/Loader';
import { H2 } from '@design/titles';
import useSelector from '@hooks/useSelector';
import useThunkDispatch from '@hooks/useThunkDispatch';
import { Project } from '@services/projects';
import { getOne as getOneThread } from '@store/threads/actions';
import { useEffect, useRef } from 'react';

import MessageTile from './MessageTile';
import SendMessageForm from './SendMessageForm';

const classes = {
    subject: 'text-lg',
    title: 'mb-4',
    messagesWrapper: 'overflow-scroll max-h-40',
};

interface ThreadDetailsProps {
    threadId: string;
    project: Project;
}

const ThreadDetails = ({ threadId, project }: ThreadDetailsProps) => {
    const dispatch = useThunkDispatch();
    const thread = useSelector((state) => state.threads.data.find((t) => t.id === threadId));

    const messagesWrapper = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (messagesWrapper.current) {
            messagesWrapper.current.scrollTop = messagesWrapper.current.scrollHeight;
        }
    };

    scrollToBottom();

    useEffect(() => {
        dispatch(getOneThread(threadId));
    }, []);

    return (
        <>
            {thread ? (
                <>
                    <H2 className={classes.title}>Sujet</H2>
                    <span className={classes.subject}>{thread.subject}</span>
                    <Divider className='my-5' />
                    <H2 className={classes.title}>Échanges</H2>
                    <div ref={messagesWrapper} className={classes.messagesWrapper}>
                        {thread.messages.map((message) => (
                            <MessageTile
                                key={message.id}
                                message={message}
                                project={project}
                                threadId={threadId}
                            />
                        ))}
                    </div>
                    <SendMessageForm
                        onCreated={() => {
                            dispatch(getOneThread(threadId)).then(() => {
                                scrollToBottom();
                            });
                        }}
                        project={project}
                        thread={thread}
                    />
                </>
            ) : (
                <Loader />
            )}
        </>
    );
};

export default ThreadDetails;
