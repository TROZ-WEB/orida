import Avatar from '@design/Avatar';
import { User } from '@services/users';
import getInitials from '@utils/getInitials';

const classes = {
    avatar: 'absolute top-0',
};

const AVATAR_OVERLAP = 30;

interface UserListProps {
    count?: number;
    users: User[];
}

const UserList = ({ count = 4, users }: UserListProps) => {
    const displayMore = users.length > count;

    return (
        <div className='flex relative'>
            {users.slice(0, count).map((user, index) => (
                <Avatar
                    key={user.id}
                    className={classes.avatar}
                    initials={getInitials(user.fullname)}
                    style={{ left: `${index * AVATAR_OVERLAP}px`, zIndex: 100 - index }}
                />
            ))}
            {displayMore && (
                <Avatar
                    key=''
                    className={classes.avatar}
                    initials='+'
                    style={{
                        zIndex: users.length - 1,
                        left: `${(users.length - 1) * AVATAR_OVERLAP}px`,
                    }}
                />
            )}
        </div>
    );
};

export default UserList;
