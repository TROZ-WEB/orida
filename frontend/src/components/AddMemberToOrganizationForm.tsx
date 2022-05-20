import { SubmitButton } from '@design/buttons';
import { SelectInput } from '@design/inputs';
import Space from '@design/Space';
import notify, { NotificationType } from '@services/notifications';
import OrganizationService, { Organization } from '@services/organizations';
import { User } from '@services/users';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type Inputs = {
    organizationId: string;
    userId: string;
};

interface AddMemberToOrganizationFormProps {
    users: User[];
    organizations: Organization[];
}

const AddMemberToOrganizationForm = ({
    users,
    organizations,
}: AddMemberToOrganizationFormProps) => {
    const { register, handleSubmit } = useForm<Inputs>();
    const { t } = useTranslation();

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
                options={users.map((user) => ({ label: user.fullname, value: user.id }))}
                register={register}
            />
            <Space px={8} />
            <SelectInput
                label={t('addUserToOrga_organization')}
                name='organizationId'
                options={organizations.map((orga) => ({ label: orga.name, value: orga.id }))}
                register={register}
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
