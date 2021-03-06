import { IconButton } from '@design/buttons';
import Icon from '@design/Icon';
import OrganizationService, { Organization } from '@services/organizations';
import { Role } from '@services/roles/types';
import notify, { ToastNotificationType } from '@services/toastNotifications';
import { User } from '@services/users';

interface MemberTileProps {
    isAdmin: boolean;
    onRemoveMember: () => void;
    organization: Organization;
    role: Role;
    user: User;
}

const MemberTile = ({ isAdmin, onRemoveMember, organization, role, user }: MemberTileProps) => {
    const removeUserFromOrganization = async () => {
        try {
            await OrganizationService.removeMember({
                userId: user.id,
                organizationId: organization.id,
            });
            onRemoveMember();
        } catch (e) {
            notify(ToastNotificationType.Error, 'Erreur');
        }
    };

    return (
        <div className='flex hover:bg-background-hover'>
            <span className='w-full whitespace-nowrap'>
                - {user.fullname} / {user.email}
            </span>
            <span className='w-full'>({role.label})</span>
            {isAdmin && (
                <div className='ml-2'>
                    <IconButton
                        className='inline-block bg-transparent'
                        onClick={() => removeUserFromOrganization()}
                    >
                        <Icon name='trash' size={16} />
                    </IconButton>
                </div>
            )}
        </div>
    );
};

export default MemberTile;
