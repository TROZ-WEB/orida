import AddMemberToOrganizationForm from '@components/AddMemberToOrganizationForm';
import OrganizationForm from '@components/OrganizationForm';
import MemberTile from '@components/organizations/MemberTile';
import ProjectList from '@components/ProjectList';
import FormActions from '@customTypes/FormActions';
import IconButton from '@design/buttons/IconButton';
import Icon from '@design/Icon';
import Layout from '@design/layouts/Layout';
import Loader from '@design/Loader';
import Modal from '@design/modals/DefaultModal';
import Space from '@design/Space';
import Tag from '@design/Tag';
import { H1, H3 } from '@design/titles';
import useModal from '@hooks/useModal';
import useRole from '@hooks/useRole';
import useSelector from '@hooks/useSelector';
import useThunkDispatch from '@hooks/useThunkDispatch';
import { getOne } from '@store/organizations/actions';
import colors from '@styles/colors';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

const OrganizationPage = () => {
    const organisationModalProps = useModal();
    const addMemberToOrgaModalProps = useModal();
    const dispatch = useThunkDispatch();
    const { t } = useTranslation();
    const organizationId = useParams().organizationId ?? '';
    const organization = useSelector((state) =>
        state.organizations.data.find((orga) => orga.id === organizationId)
    );
    const { isOrganizationAdmin } = useRole({ organization });

    const refresh = () => {
        dispatch(getOne(organizationId));
    };

    useEffect(() => {
        refresh();
    }, [organizationId]);

    return (
        <Layout className='flex-row'>
            {organization ? (
                <>
                    <main className='px-5 py-14 w-full'>
                        <div className='flex items-center pb-3'>
                            {isOrganizationAdmin && (
                                <IconButton className='mr-2' onClick={organisationModalProps.open}>
                                    <Icon color={colors.secondary} name='edit' />
                                </IconButton>
                            )}
                            <H1>{organization.name}</H1>
                        </div>
                        {organization.parentOrganizations.map((po) => (
                            <Tag key={po.id} className='mb-6 mr-2'>
                                {po.name}
                            </Tag>
                        ))}
                        {organization.description && (
                            <>
                                <H3>{t('organization_details_title')}</H3>
                                <p className='text-sm leading-4 block'>
                                    {organization.description}
                                </p>
                            </>
                        )}
                        <Space px={20} />
                        {organization.email && (
                            <a
                                className='text-sm leading-4 block'
                                href={`mailto:${organization.email}`}
                                rel='noopener noreferrer'
                                target='_blank'
                            >
                                <Icon className='inline mr-2' name='email' size={14} />
                                {organization.email}
                            </a>
                        )}
                        {organization.phone && (
                            <a
                                className='text-sm leading-4 block'
                                href={`tel:${organization.phone}`}
                                rel='noopener noreferrer'
                                target='_blank'
                            >
                                <Icon className='inline mr-2' name='phone' size={14} />
                                {organization.phone}
                            </a>
                        )}
                        {organization.site && (
                            <a
                                className='text-sm leading-4 block'
                                href={organization.site}
                                rel='noopener noreferrer'
                                target='_blank'
                            >
                                <Icon className='inline mr-2' name='site' size={14} />
                                {organization.site}
                            </a>
                        )}
                        {organization.facebook && (
                            <a
                                className='text-sm leading-4 block'
                                href={organization.facebook}
                                rel='noopener noreferrer'
                                target='_blank'
                            >
                                <Icon className='inline mr-2' name='facebook' size={14} />
                                {organization.facebook}
                            </a>
                        )}
                        {organization.twitter && (
                            <a
                                className='text-sm leading-4 block'
                                href={organization.twitter}
                                rel='noopener noreferrer'
                                target='_blank'
                            >
                                <Icon className='inline mr-2' name='twitter' size={14} />
                                {organization.twitter}
                            </a>
                        )}
                        {organization.instagram && (
                            <a
                                className='text-sm leading-4 block'
                                href={organization.instagram}
                                rel='noopener noreferrer'
                                target='_blank'
                            >
                                <Icon className='inline mr-2' name='instagram' size={14} />
                                {organization.instagram}
                            </a>
                        )}
                        {organization.linkedin && (
                            <a
                                className='text-sm leading-4 block'
                                href={organization.linkedin}
                                rel='noopener noreferrer'
                                target='_blank'
                            >
                                <Icon className='inline mr-2' name='linkedin' size={14} />
                                {organization.linkedin}
                            </a>
                        )}

                        <H3 className='flex'>
                            {isOrganizationAdmin && (
                                <IconButton
                                    className='mr-2'
                                    onClick={() => addMemberToOrgaModalProps.open()}
                                >
                                    <Icon color={colors.secondary} name='plus' />
                                </IconButton>
                            )}
                            {t('organization_details_members')}
                        </H3>
                        <Space px={8} />
                        <ul>
                            {organization.members.map((member) => (
                                <li key={member.user.id}>
                                    <MemberTile
                                        isAdmin={isOrganizationAdmin}
                                        onRemoveMember={() => refresh()}
                                        organization={member.organization}
                                        role={member.role}
                                        user={member.user}
                                    />
                                </li>
                            ))}
                        </ul>
                        <h1>{t('project_list_title')}</h1>
                        <ProjectList projects={organization?.projects} />
                    </main>
                    <Modal {...organisationModalProps}>
                        <OrganizationForm
                            action={FormActions.Update}
                            onCreated={() => organisationModalProps.close()}
                            organization={organization}
                        />
                    </Modal>
                    <Modal {...addMemberToOrgaModalProps}>
                        <AddMemberToOrganizationForm organization={organization} />
                    </Modal>
                </>
            ) : (
                <Loader />
            )}
        </Layout>
    );
};

export default OrganizationPage;
