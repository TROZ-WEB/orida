import { SubmitButton } from '@design/buttons';
import { TextInput } from '@design/inputs';
import Space from '@design/Space';
import useSelector from '@hooks/useSelector';
import { goToProject } from '@router/AppRoutes';
import NotificationService from '@services/notifications';
import { NotificationType } from '@services/notifications/types';
import { Project } from '@services/projects';
import ThreadService from '@services/threads';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type Inputs = {
    subject: string;
};

interface ThreadCreateFormProps {
    project: Project;
    onSubmit: () => void;
}

const ThreadCreateForm = ({ project, onSubmit }: ThreadCreateFormProps) => {
    const { register, handleSubmit } = useForm<Inputs>();
    const { t } = useTranslation();
    const auth = useSelector((state) => state.auth.data);

    const onCreate = async (data: Inputs) => {
        await ThreadService.create({
            project: project.id,
            subject: data.subject,
        });
        await NotificationService.create({
            usersIds: project.contributors
                .map((contributor) => contributor.user.id)
                .filter((id) => id !== auth.id),
            type: NotificationType.project,
            link: goToProject(project.id),
            text: t('notification_new_project_thread', {
                threadTitle: data.subject,
                projectTitle: project.title,
            }),
            projectId: project.id,
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
