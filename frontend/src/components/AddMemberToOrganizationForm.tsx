import { SubmitButton } from '@design/buttons';
import { SelectInput } from '@design/inputs';
import Space from '@design/Space';
import useSelector from '@hooks/useSelector';
import useThunkDispatch from '@hooks/useThunkDispatch';
import notify, { NotificationType } from '@services/notifications';
import OrganizationService, { Organization } from '@services/organizations';
import { getAll as getAllOrganizations } from '@store/organizations/actions';
import { getAll as getAllRoles } from '@store/roles/actions';
import { getAll as getAllUsers } from '@store/users/actions';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type Inputs = {
    organizationId: string;
    roleId: string;
    userId: string;
};

interface AddMemberToOrganizationFormProps {
    organization?: Organization;
}

const AddMemberToOrganizationForm = ({ organization }: AddMemberToOrganizationFormProps) => {
    const { setValue, register, handleSubmit } = useForm<Inputs>();
    const { t } = useTranslation();
    const dispatch = useThunkDispatch();
    const users = useSelector((state) => state.users.data);
    const roles = useSelector((state) => state.roles.data);
    const organizations = useSelector((state) => state.organizations.data);

    useEffect(() => {
        dispatch(getAllUsers());
        dispatch(getAllRoles());
        if (organization) {
            setValue('organizationId', organization.id);
        } else {
            dispatch(getAllOrganizations());
        }
    }, []);

    const addMember: SubmitHandler<Inputs> = async (data: Inputs) => {
        try {
            await OrganizationService.addMember(data);
            notify(NotificationType.Success, 'success');
        } catch (e) {
            console.error(e);
            notify(NotificationType.Error, 'error');
        }
    };

    return (
        <form onSubmit={handleSubmit(addMember)}>
            <SelectInput
                label={t('addUserToOrga_user')}
                name='userId'
                options={users.map((user) => ({
                    label: `${user.fullname} (${user.email})`,
                    value: user.id,
                }))}
                register={register}
                required
            />
            <Space px={8} />
            <SelectInput
                disabled={!!organization}
                label={t('addUserToOrga_organization')}
                name='organizationId'
                options={
                    organization
                        ? [organization].map((orga) => ({ label: orga.name, value: orga.id })) // preselect orga
                        : organizations.map((orga) => ({ label: orga.name, value: orga.id })) // all orga
                }
                register={register} // disabled if an organization is already selected
                required
            />
            <Space px={8} />
            <SelectInput
                label={t('addUserToOrga_organization')}
                name='roleId'
                options={roles.map((role) => ({ label: role.label, value: role.id }))}
                register={register}
                required
            />
            <Space px={8} />
            <SubmitButton
                className='bg-secondary hover:bg-secondary-hover'
                value={t('addUserToOrga_submit')}
            />
        </form>
    );
};

export default AddMemberToOrganizationForm;
