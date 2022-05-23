import { SubmitButton } from '@design/buttons';
import { SelectInput } from '@design/inputs';
import Space from '@design/Space';
import useSelector from '@hooks/useSelector';
import useThunkDispatch from '@hooks/useThunkDispatch';
import notify, { NotificationType } from '@services/notifications';
import ProjectService, { Project } from '@services/projects';
import { getAllUsers } from '@store/admin/actions';
import { getAll as getAllRoles } from '@store/roles/actions';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type Inputs = {
    projectId: string;
    roleId: string;
    userId: string;
};

interface AddContributorToProjectFormProps {
    onSuccess?: () => void;
    project: Project;
}

const AddContributorToProjectForm = ({ onSuccess, project }: AddContributorToProjectFormProps) => {
    const { register, handleSubmit, setValue } = useForm<Inputs>();
    const { t } = useTranslation();
    const dispatch = useThunkDispatch();
    const users = useSelector((state) => state.admin.users);
    const roles = useSelector((state) => state.roles.data);

    useEffect(() => {
        dispatch(getAllUsers());
        dispatch(getAllRoles());
        setValue('projectId', project.id);
    }, []);

    const addContributor: SubmitHandler<Inputs> = async (data: Inputs) => {
        try {
            await ProjectService.addContributor(data);
            notify(NotificationType.Success, 'success');
            if (onSuccess) {
                onSuccess();
            }
        } catch (e) {
            console.error(e);
            notify(NotificationType.Error, 'error');
        }
    };

    return (
        <form onSubmit={handleSubmit(addContributor)}>
            <SelectInput
                label={t('addContributorToProject_project')}
                name='projectId'
                options={[project].map((proj) => ({ label: proj.title, value: proj.id }))}
                register={register} // disabled if an organization is already selected
                disabled
                required
            />
            <Space px={8} />
            <SelectInput
                label={t('addContributorToProject_user')}
                name='userId'
                options={users.map((user) => ({
                    label: `${user.fullname} (${user.email})`,
                    value: user.id,
                }))}
                register={register}
                emptyChoice
                required
            />
            <Space px={8} />
            <SelectInput
                label={t('addContributorToProject_role')}
                name='roleId'
                options={roles.map((role) => ({ label: role.label, value: role.id }))}
                register={register}
                emptyChoice
                required
            />
            <Space px={8} />
            <SubmitButton
                className='bg-secondary hover:bg-secondary-hover'
                value={t('addContributorToProject_submit')}
            />
        </form>
    );
};

export default AddContributorToProjectForm;
