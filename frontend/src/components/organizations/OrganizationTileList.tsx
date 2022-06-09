import Icon from '@design/Icon';
import { Organization } from '@services/organizations';
import colors from '@styles/colors';
import { useTranslation } from 'react-i18next';

import OrganizationTile from './OrganizationTile';

interface OrganizationTileListProps {
    organizations: Organization[];
}

const OrganizationTileList = ({ organizations }: OrganizationTileListProps) => {
    const { t } = useTranslation();

    if (organizations.length === 0) {
        return (
            <div className='flex items-center'>
                <Icon className='mr-2' color={colors.primary} name='city' size={25} />
                <span className='text-sm'>{t('organization_list_none')}</span>
            </div>
        );
    }

    return (
        <div>
            {organizations.map((organization) => (
                <OrganizationTile
                    key={organization.id}
                    className='mb-4 last:mb-0'
                    organization={organization}
                />
            ))}
        </div>
    );
};

export default OrganizationTileList;
