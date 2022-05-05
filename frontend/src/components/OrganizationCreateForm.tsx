import { SubmitButton } from '@design/buttons';
import { MultiSelectInput, SelectInput, TextAreaInput, TextInput } from '@design/inputs';
import Space from '@design/Space';
import useSelector from '@hooks/useSelector';
import useThunkDispatch from '@hooks/useThunkDispatch';
import notify, { NotificationType } from '@services/notifications';
import { Organization, OrganizationType } from '@services/organizations/types';
import { Project } from '@services/projects/types';
import { create, getAll as getAllOrganizations } from '@store/organizations/actions';
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

interface CreateOrganizationFormProps {
    onCreated: () => void;
}

const CreateOrganizationForm = ({ onCreated }: CreateOrganizationFormProps) => {
    const { register, handleSubmit, reset } = useForm<Inputs>();
    const { t } = useTranslation();
    const dispatch = useThunkDispatch();

    const organizations = useSelector((state) => state.organizations.data);

    useEffect(() => {
        if (organizations.length === 0) {
            dispatch(getAllOrganizations());
        }
    }, []);

    const parentOrganizationsOptions = organizations.map((organization: Organization) => {
        return { label: organization.name, value: organization.id };
    });

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
            notify(NotificationType.Error, e.message);
        }
    };

    return (
        <form className='max-w-[500px]' onSubmit={handleSubmit(onCreate)}>
            <TextInput
                label={t('organization_create_name_label')}
                name='name'
                placeholder={t('organization_create_name_placeholder')}
                register={register}
                required
            />
            <Space px={8} />
            <SelectInput
                label={t('organization_create_type_label')}
                name='type'
                options={typesOptions}
                register={register}
            />
            <Space px={8} />
            <TextAreaInput
                label={t('organization_create_description_label')}
                name='description'
                placeholder={t('organization_create_description_placeholder')}
                register={register}
            />
            <Space px={8} />
            <TextInput
                label={t('organization_create_site_label')}
                name='site'
                placeholder={t('organization_create_site_placeholder')}
                register={register}
            />
            <Space px={8} />
            <TextInput
                label={t('organization_create_email_label')}
                name='email'
                placeholder={t('organization_create_email_placeholder')}
                register={register}
            />
            <Space px={8} />
            <TextInput
                label={t('organization_create_phone_label')}
                name='phone'
                placeholder={t('organization_create_phone_placeholder')}
                register={register}
            />
            <Space px={8} />
            <TextInput
                label={t('organization_create_facebook_label')}
                name='facebook'
                register={register}
            />
            <Space px={8} />
            <TextInput
                label={t('organization_create_twitter_label')}
                name='twitter'
                register={register}
            />
            <Space px={8} />
            <TextInput
                label={t('organization_create_linkedin_label')}
                name='linkedin'
                register={register}
            />
            <Space px={8} />
            <TextInput
                label={t('organization_create_instagram_label')}
                name='instagram'
                register={register}
            />
            <Space px={8} />
            <MultiSelectInput
                label={t('organization_create_parentOrganizations_label')}
                name='parentOrganizations'
                options={parentOrganizationsOptions}
                register={register}
            />
            <Space px={8} />
            <SubmitButton
                className='bg-secondary hover:bg-secondary-hover'
                value={t('organization_create_button') as string}
            />
        </form>
    );
};

export default CreateOrganizationForm;
