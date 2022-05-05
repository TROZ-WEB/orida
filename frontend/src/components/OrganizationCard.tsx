import placeholderOrganizationSrc from '@assets/placeholder-project.jpg';
import WithTheme, { Theme } from '@customTypes/theme';
import Tag from '@design/Tag';
import { Organization } from '@services/organizations';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

interface OrganizationCardProps extends WithTheme {
    organization: Organization;
}

const classes = {
    budget: 'text-warning font-semibold',
    content: 'flex flex-col',
    image: 'w-1/3 rounded mr-4 ',
    tag: 'mb-4',
    title: 'text-white font-semibold text-lg mb-2',
    titleDark: 'text-primary',
    wrapper: 'border-b-2 border-border flex py-5 w-full',
};

const OrganizationCard = ({ organization, theme = Theme.Light }: OrganizationCardProps) => {
    return (
        <Link className={classes.wrapper} to='/'>
            <img alt='organization' className={classes.image} src={placeholderOrganizationSrc} />
            <div className={classes.content}>
                {organization.parentOrganizations.map((po) => (
                    <Tag key={po.id} className={classes.tag}>
                        {po.name}
                    </Tag>
                ))}
                <span
                    className={classnames(classes.title, {
                        [classes.titleDark]: theme === Theme.Dark,
                    })}
                >
                    {organization.name}
                </span>
            </div>
        </Link>
    );
};

export default OrganizationCard;
