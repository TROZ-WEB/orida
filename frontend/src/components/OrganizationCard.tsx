import placeholderOrganizationSrc from '@assets/placeholder-project.jpg';
import { Organization } from '@services/organizations';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

import { goToOrganization } from '../router/AppRoutes';

interface OrganizationCardProps {
    organization: Organization;
}

const classes = {
    wrapper: 'shadow bg-white rounded-lg flex py-5 w-full flex items-center w-52 h-20 mb-4 p-4',
    image: 'w-1/4 rounded mr-2 ',
    title: 'text-primary-dark font-bold truncate',
};

const OrganizationCard = ({ organization }: OrganizationCardProps) => {
    return (
        <Link to={goToOrganization(organization.id)}>
            <div className={classes.wrapper}>
                <img alt='' className={classes.image} src={placeholderOrganizationSrc} />
                <span className={classnames(classes.title)}>{organization.name}</span>
            </div>
        </Link>
    );
};

export default OrganizationCard;
