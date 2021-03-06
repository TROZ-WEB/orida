import { SubmitButton } from '@design/buttons';
import { FileInput } from '@design/inputs';
import Space from '@design/Space';
import useSelector from '@hooks/useSelector';
import useThunkDispatch from '@hooks/useThunkDispatch';
import { goToProject } from '@router/AppRoutes';
import NotificationService, { NotificationType } from '@services/notifications';
import { Project } from '@services/projects';
import notify, { ToastNotificationType } from '@services/toastNotifications';
import { getAuth } from '@store/auth/actions';
import { addImages } from '@store/projects/actions';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type Inputs = {
    images: string[];
};

interface AddProjectImagesFormProps {
    onCreated: () => void;
    project: Project;
}

const AddProjectImagesForm = ({ onCreated, project }: AddProjectImagesFormProps) => {
    const { control, handleSubmit, reset } = useForm<Inputs>();
    const { t } = useTranslation();
    const dispatch = useThunkDispatch();
    const auth = useSelector((state) => state.auth.data);

    useEffect(() => {
        dispatch(getAuth());
    }, []);

    const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
        try {
            await dispatch(addImages({ ...data, id: project.id }));
            await NotificationService.create({
                usersIds: project.contributors
                    .map((contributor) => contributor.user.id)
                    .filter((id) => id !== auth.id),
                type: NotificationType.project,
                link: goToProject(project.id),
                text: t('notification_new_project_image', { projectTitle: project.title }),
                projectId: project.id,
            });
            reset();
            onCreated();
        } catch (e: any) {
            notify(ToastNotificationType.Error, e.message);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FileInput control={control} label={t('images_add_label')} name='images' />
            <Space px={8} />
            <SubmitButton
                className='bg-secondary hover:bg-secondary-hover'
                value={t('image_add_button')}
            />
        </form>
    );
};

export default AddProjectImagesForm;
