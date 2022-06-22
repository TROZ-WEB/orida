import { SubmitButton } from '@design/buttons';
import { SelectInput } from '@design/inputs';
import Space from '@design/Space';
import useSelector from '@hooks/useSelector';
import useThunkDispatch from '@hooks/useThunkDispatch';
import ProjectService, { Project } from '@services/projects';
import notify, { ToastNotificationType } from '@services/toastNotifications';
import { User } from '@services/users';
import { getAll as getAllProjects } from '@store/projects/actions';
import { getAll as getAllUsers } from '@store/users/actions';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type Inputs = {
    projectId: string;
    roleId: string;
    userId: string;
};

interface AddAdminToProjectFormProps {
    onSuccess?: () => void;
    project?: Project;
}

const AddAdminToProjectForm = ({ onSuccess, project }: AddAdminToProjectFormProps) => {
    const { register, handleSubmit, setValue } = useForm<Inputs>();
    const { t } = useTranslation();
    const dispatch = useThunkDispatch();

    // Users options
    const auth = useSelector((state) => state.auth.data);
    const users = project
        ? project.organizations.reduce(
              (acc: User[], organization) =>
                  acc.concat(organization.members.map((member) => member.user)),
              []
          ) // get all users of project organizations
        : useSelector((state) => state.users.data); // get all users
    const uniqueUsers = Array.from(new Map(users.map((u) => [u.id, u])).values()).filter(
        (user) => user.id !== auth.id
    ); // get unique users from array, and remove auth from array
    const usersOptions = uniqueUsers.map((user) => ({
        label: `${user.fullname} (${user.email})`,
        value: user.id,
    }));
    const allProjects = useSelector((state) => state.projects.data);
    const projectOptions = (project ? [project] : allProjects).map((proj) => ({
        label: proj.title,
        value: proj.id,
    }));

    useEffect(() => {
        if (project) {
            setValue('projectId', project.id);
        } else {
            dispatch(getAllUsers());
            dispatch(getAllProjects());
        }
    }, []);

    const addAdmin: SubmitHandler<Inputs> = async (data: Inputs) => {
        try {
            await ProjectService.addAdmin(data);
            if (onSuccess) {
                onSuccess();
            }
        } catch (e) {
            console.error(e);
            notify(ToastNotificationType.Error, 'error');
        }
    };

    return (
        <form onSubmit={handleSubmit(addAdmin)}>
            <SelectInput
                disabled={!!project}
                label={t('addAdminToProject_project')}
                name='projectId'
                options={projectOptions}
                register={register}
                required
            />
            <Space px={8} />
            <SelectInput
                label={t('addAdminToProject_user')}
                name='userId'
                options={usersOptions}
                register={register}
                emptyChoice
                required
            />
            <Space px={8} />
            <SubmitButton
                className='bg-secondary hover:bg-secondary-hover'
                value={t('addAdminToProject_submit')}
            />
        </form>
    );
};

export default AddAdminToProjectForm;
