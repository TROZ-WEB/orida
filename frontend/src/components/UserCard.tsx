import Avatar from '@design/Avatar';
import { Paragraph } from '@design/texts';
import { H3 } from '@design/titles';
import { goToProfile } from '@router/AppRoutes';
import { User } from '@services/users';
import getInitials from '@utils/getInitials';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface UserCardProps {
    user: User;
    role?: string;
}

const classes = {
    wrapper: 'shadow bg-white rounded-lg flex py-5 w-full flex items-center w-80 h-20 mb-4 p-4',
    content: 'ml-2',
};

const UserCard = ({ user, role }: UserCardProps) => {
    const { t } = useTranslation();

    return (
        <Link to={goToProfile(user.id)}>
            <div className={classes.wrapper}>
                <Avatar initials={getInitials(user.fullname)} />
                <div className={classes.content}>
                    <H3>{user.fullname}</H3>
                    <Paragraph className='text-grey'>
                        {role && role === 'ADMIN'
                            ? t('role_project_admin')
                            : t('role_project_contributor')}
                    </Paragraph>
                </div>
            </div>
        </Link>
    );
};

export default UserCard;
