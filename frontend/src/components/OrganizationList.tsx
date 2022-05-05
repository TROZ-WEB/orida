import WithTheme from '@customTypes/theme';
import { Organization } from '@services/organizations';

import OrganizationCard from './OrganizationCard';

interface OrganizationListProps extends WithTheme {
    className?: string;
    organizations: Organization[];
}

const OrganizationList = ({ className, organizations, theme }: OrganizationListProps) => (
    <ul className={className}>
        {organizations.map((organization) => (
            <li key={organization.id}>
                <OrganizationCard organization={organization} theme={theme} />
            </li>
        ))}
    </ul>
);

export default OrganizationList;
