import FormActions from '@customTypes/FormActions';
import Option from '@customTypes/Option';
import { SubmitButton } from '@design/buttons';
import { MultiSelectInput, SelectInput, TextAreaInput, TextInput } from '@design/inputs';
import Space from '@design/Space';
import useSelector from '@hooks/useSelector';
import useThunkDispatch from '@hooks/useThunkDispatch';
import { Organization, OrganizationType } from '@services/organizations/types';
import { Project } from '@services/projects/types';
import notify, { ToastNotificationType } from '@services/toastNotifications';
import { create, getAll as getAllOrganizations, update } from '@store/organizations/actions';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type Inputs = {
    name: string;
    type: OrganizationType;
    description: string;
    site: string;
    email: string;
    phone: string;
    facebook: string;
    twitter: string;
    linkedin: string;
    instagram: string;
    projects: Project[];
    parentOrganizations: string[];
};

interface OrganizationFormProps {
    onCreated: () => void;
    organization?: Organization;
    action: FormActions;
}

const OrganizationForm = ({ onCreated, organization, action }: OrganizationFormProps) => {
    const { register, handleSubmit, reset } = useForm<Inputs>();
    const { t } = useTranslation();
    const dispatch = useThunkDispatch();

    const organizations = useSelector((state) => state.organizations.data);

    useEffect(() => {
        dispatch(getAllOrganizations());
    }, []);

    const parentOrganizationsOptions: Option[] = organizations
        .map((parentOrganization: Organization) => {
            return { label: parentOrganization.name, value: parentOrganization.id };
        })
        .filter((parentOrganization) => parentOrganization.value !== organization?.id);

    const typesOptions = [
        { label: t('organization_type_collectivity'), value: 'COLLECTIVITY' },
        { label: t('organization_type_association'), value: 'ASSOCIATION' },
        { label: t('organization_type_company'), value: 'COMPANY' },
    ];

    const onCreate: SubmitHandler<Inputs> = async (data: Inputs) => {
        try {
            const cleanProjects: Project[] = [];
            let cleanOrganizations = data.parentOrganizations || [];
            if (typeof cleanOrganizations === 'string') cleanOrganizations = [cleanOrganizations];
            await dispatch(
                create({
                    ...data,
                    projects: cleanProjects,
                    parentOrganizations: cleanOrganizations,
                })
            );
            reset();
            onCreated();
        } catch (e: any) {
            notify(ToastNotificationType.Error, e.message);
        }
    };

    const onUpdate: SubmitHandler<Inputs> = async (data: Inputs) => {
        if (organization) {
            try {
                let cleanOrganizations = data.parentOrganizations || [];
                if (typeof cleanOrganizations === 'string')
                    cleanOrganizations = [cleanOrganizations];
                await dispatch(
                    update({
                        ...data,
                        id: organization.id,
                        parentOrganizations: cleanOrganizations,
                    })
                );
                reset();
                onCreated();
            } catch (e: any) {
                notify(ToastNotificationType.Error, e.message);
            }
        }
    };

    const onSubmit: SubmitHandler<Inputs> = action === FormActions.Create ? onCreate : onUpdate;

    return (
        <form className='max-w-[500px]' onSubmit={handleSubmit(onSubmit)}>
            <TextInput
                defaultValue={organization?.name}
                label={t('organization_create_name_label')}
                name='name'
                placeholder={t('organization_create_name_placeholder')}
                register={register}
                required
            />
            <Space px={8} />
            <SelectInput
                defaultValue={organization?.type}
                label={t('organization_create_type_label')}
                name='type'
                options={typesOptions}
                register={register}
            />
            <Space px={8} />
            <TextAreaInput
                defaultValue={organization?.description}
                label={t('organization_create_description_label')}
                name='description'
                placeholder={t('organization_create_description_placeholder')}
                register={register}
            />
            <Space px={8} />
            <TextInput
                defaultValue={organization?.site}
                label={t('organization_create_site_label')}
                name='site'
                placeholder={t('organization_create_site_placeholder')}
                register={register}
            />
            <Space px={8} />
            <TextInput
                defaultValue={organization?.email}
                label={t('organization_create_email_label')}
                name='email'
                placeholder={t('organization_create_email_placeholder')}
                register={register}
            />
            <Space px={8} />
            <TextInput
                defaultValue={organization?.phone}
                label={t('organization_create_phone_label')}
                name='phone'
                placeholder={t('organization_create_phone_placeholder')}
                register={register}
            />
            <Space px={8} />
            <TextInput
                defaultValue={organization?.facebook}
                label={t('organization_create_facebook_label')}
                name='facebook'
                register={register}
            />
            <Space px={8} />
            <TextInput
                defaultValue={organization?.twitter}
                label={t('organization_create_twitter_label')}
                name='twitter'
                register={register}
            />
            <Space px={8} />
            <TextInput
                defaultValue={organization?.linkedin}
                label={t('organization_create_linkedin_label')}
                name='linkedin'
                register={register}
            />
            <Space px={8} />
            <TextInput
                defaultValue={organization?.instagram}
                label={t('organization_create_instagram_label')}
                name='instagram'
                register={register}
            />
            <Space px={8} />
            <MultiSelectInput
                defaultValue={organization?.parentOrganizations?.map((po) => po.id)}
                label={t('organization_create_parentOrganizations_label')}
                name='parentOrganizations'
                options={parentOrganizationsOptions}
                register={register}
            />
            <Space px={8} />
            <SubmitButton
                className='bg-secondary hover:bg-secondary-hover'
                value={
                    t(
                        `organization_${action === FormActions.Create ? 'create' : 'update'}_button`
                    ) as string
                }
            />
        </form>
    );
};

export default OrganizationForm;
