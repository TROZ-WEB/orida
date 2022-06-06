import { Organization } from '@services/organizations';

import OrganizationCard from './OrganizationCard';

interface OrganizationListProps {
    className?: string;
    organizations: Organization[];
}

const OrganizationList = ({ className, organizations }: OrganizationListProps) => (
    <ul className={className}>
        {organizations.map((organization) => (
            <li key={organization.id}>
                <OrganizationCard organization={organization} />
            </li>
        ))}
    </ul>
);

export default OrganizationList;
