import { SubmitButton } from '@design/buttons';
import { TextInput } from '@design/inputs';
import Space from '@design/Space';
import useSelector from '@hooks/useSelector';
import { goToProject } from '@router/AppRoutes';
import NotificationService, { NotificationType } from '@services/notifications';
import PollService from '@services/polls';
import { Project } from '@services/projects';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type Inputs = {
    question: string;
    responses: string;
};

interface PollCreateFormProps {
    project: Project;
    onSubmit: () => void;
}

const PollCreateForm = ({ project, onSubmit }: PollCreateFormProps) => {
    const { register, handleSubmit } = useForm<Inputs>();
    const auth = useSelector((state) => state.auth.data);
    const { t } = useTranslation();

    const onCreate = async (data: Inputs) => {
        await PollService.create({
            project: project.id,
            question: data.question,
            responses: data.responses.split(','),
        });
        await NotificationService.create({
            usersIds: project.contributors
                .map((contributor) => contributor.user.id)
                .filter((id) => id !== auth.id),
            type: NotificationType.project,
            link: goToProject(project.id),
            text: t('notification_new_project_poll', {
                pollTitle: data.question,
                projectTitle: project.title,
            }),
            projectId: project.id,
        });
        onSubmit();
    };

    return (
        <form className='max-w-[500px]' onSubmit={handleSubmit(onCreate)}>
            <TextInput
                label='Question'
                name='question'
                placeholder='Quel emplacement pour le street workout ?'
                register={register}
                required
            />
            <Space px={16} />
            <TextInput
                label='Réponses (séparées par une virgule)'
                name='responses'
                placeholder='rue nationale, place saint marc, avenue de la paix'
                register={register}
                required
            />
            <Space px={8} />
            <SubmitButton
                className='bg-secondary hover:bg-secondary-hover'
                value='Créer le sondage'
            />
        </form>
    );
};

export default PollCreateForm;
