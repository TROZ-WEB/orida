import OrganizationForm from '@components/OrganizationForm';
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
import useSelector from '@hooks/useSelector';
import useThunkDispatch from '@hooks/useThunkDispatch';
import { getOne } from '@store/organizations/actions';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

const OrganizationPage = () => {
    const organisationModalProps = useModal();
    const dispatch = useThunkDispatch();
    const { t } = useTranslation();
    const organizationId = useParams().organizationId ?? '';
    const organization = useSelector((state) =>
        state.organizations.data.find((p) => p.id === organizationId)
    );

    useEffect(() => {
        dispatch(getOne(organizationId));
    }, [organizationId]);

    return (
        <Layout className='flex-row'>
            {organization ? (
                <>
                    <Modal {...organisationModalProps}>
                        <OrganizationForm
                            action={FormActions.Update}
                            onCreated={() => organisationModalProps.close()}
                            organization={organization}
                        />
                    </Modal>

                    <main className='px-5 py-14'>
                        <div className='flex items-center pb-3'>
                            <IconButton
                                className='bg-transparent hover:bg-background-hover mr-2'
                                onClick={organisationModalProps.open}
                            >
                                <Icon name='edit' size={15} />
                            </IconButton>
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

                        <H3>{t('organization_details_members')}</H3>
                        <ul>
                            {organization.members.map((member) => (
                                <li className={member.id}>- {member.fullname}</li>
                            ))}
                        </ul>
                    </main>
                </>
            ) : (
                <Loader />
            )}
        </Layout>
    );
};

export default OrganizationPage;
