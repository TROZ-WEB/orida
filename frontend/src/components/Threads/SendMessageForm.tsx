/* eslint-disable react/jsx-no-useless-fragment */
import Avatar from '@design/Avatar';
import { SubmitButton } from '@design/buttons';
import { TextAreaInput } from '@design/inputs';
import Space from '@design/Space';
import UnauthenticatedCTA from '@design/UnauthenticatedCTA';
import useRole from '@hooks/useRole';
import useSelector from '@hooks/useSelector';
import useThunkDispatch from '@hooks/useThunkDispatch';
import notify, { NotificationType } from '@services/notifications';
import { Thread } from '@services/threads';
import { create } from '@store/messages/actions';
import getInitials from '@utils/getInitials';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type Inputs = {
    content: string;
};
interface SendMessageFormProps {
    thread: Thread;
    onCreated: () => void;
}

const SendMessageForm = ({ thread, onCreated }: SendMessageFormProps) => {
    const { register, handleSubmit, reset, formState } = useForm<Inputs>({ mode: 'onChange' });
    const userName = useSelector((state) => state.auth.data.fullname);
    const { t } = useTranslation();
    const dispatch = useThunkDispatch();
    const auth = useSelector((state) => state.auth.data);
    const { isAuthenticated } = useRole();

    const onCreate: SubmitHandler<Inputs> = async (data: Inputs) => {
        try {
            await dispatch(
                create({
                    ...data,
                    threadId: thread.id,
                    authorId: auth.id,
                })
            );
            reset();
            onCreated();
        } catch (e: any) {
            notify(NotificationType.Error, e.message);
        }
    };

    return (
        <>
            {isAuthenticated ? (
                <form className='max-w-[500px]' onSubmit={handleSubmit(onCreate)}>
                    <Avatar initials={getInitials(userName)} />
                    <TextAreaInput
                        label={t('thread_message_content_label')}
                        name='content'
                        placeholder={t('thread_message_content_placeholder')}
                        register={register}
                        required
                    />
                    <Space px={8} />
                    <SubmitButton
                        className='bg-secondary hover:bg-secondary-hover'
                        disabled={!formState.isValid}
                        value={t('thread_message_button') as string}
                    />
                </form>
            ) : (
                <UnauthenticatedCTA />
            )}
        </>
    );
};

export default SendMessageForm;
