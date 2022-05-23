import Icon from '@design/Icon';
import { goToOrganization } from '@router/AppRoutes';
import { Organization } from '@services/organizations';
import classnames from '@utils/classnames';
import { Link } from 'react-router-dom';

interface OrganizationTileProps {
    className?: string;
    organization: Organization;
}

const OrganizationTile = ({ className, organization }: OrganizationTileProps) => {
    return (
        <Link className={classnames('block', className)} to={goToOrganization(organization.id)}>
            <div className='flex items-center'>
                <Icon className='mr-2' color='#38337c' name='city' size={25} />
                <span className='text-sm'>{organization.name}</span>
            </div>
        </Link>
    );
};

export default OrganizationTile;
