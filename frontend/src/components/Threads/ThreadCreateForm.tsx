import { SubmitButton } from '@design/buttons';
import { TextInput } from '@design/inputs';
import Space from '@design/Space';
import ThreadService from '@services/threads';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type Inputs = {
    subject: string;
};

interface ThreadCreateFormProps {
    projectId: string;
    onSubmit: () => void;
}

const ThreadCreateForm = ({ projectId, onSubmit }: ThreadCreateFormProps) => {
    const { register, handleSubmit } = useForm<Inputs>();
    const { t } = useTranslation();

    const onCreate = async (data: Inputs) => {
        await ThreadService.create({
            project: projectId,
            subject: data.subject,
        });
        onSubmit();
    };

    return (
        <form className='max-w-[500px]' onSubmit={handleSubmit(onCreate)}>
            <TextInput
                label={t('project_thread_field_subject_label')}
                name='subject'
                placeholder={t('project_thread_field_subject_placeholder')}
                register={register}
                required
            />
            <Space px={8} />
            <SubmitButton
                className='bg-secondary hover:bg-secondary-hover'
                value={t('project_thread_create_button')}
            />
        </form>
    );
};

export default ThreadCreateForm;
