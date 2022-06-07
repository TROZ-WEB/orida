import { Paragraph } from '@design/texts';
import { Organization } from '@services/organizations';
import { useTranslation } from 'react-i18next';

import OrganizationCard from './OrganizationCard';

interface OrganizationListProps {
    className?: string;
    organizations: Organization[];
}

const OrganizationList = ({ className, organizations }: OrganizationListProps) => {
    const { t } = useTranslation();

    return organizations.length > 0 ? (
        <ul className={className}>
            {organizations.map((organization) => (
                <li key={organization.id}>
                    <OrganizationCard organization={organization} />
                </li>
            ))}
        </ul>
    ) : (
        <Paragraph className='text-grey'>{t('no_organizations')}</Paragraph>
    );
};

export default OrganizationList;
