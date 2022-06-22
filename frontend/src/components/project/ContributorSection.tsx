import AddAdminToProject from '@components/AddAdminToProject';
import UserCard from '@components/UserCard';
import UserList from '@components/UserList';
import { ProjectContribution } from '@customTypes/projectContribution';
import RoleType from '@customTypes/RoleType';
import { InvisibleButton, TertiaryButton } from '@design/buttons';
import Icon from '@design/Icon';
import Modal from '@design/modals/DefaultModal';
import { H3 } from '@design/titles';
import useModal from '@hooks/useModal';
import useRole from '@hooks/useRole';
import { Project } from '@services/projects';

const classes = {
    content: 'flex items-center mt-4',
    invite: 'flex justify-end',
    inviteButton: 'flex-row',
    inviteIcon: 'mr-2',
};

interface ContributorSectionProps {
    onAddAdmin: () => void;
    contributors: ProjectContribution[];
    project: Project;
}

const ContributorSection = ({ onAddAdmin, contributors, project }: ContributorSectionProps) => {
    const { isProjectAdmin } = useRole({ role: RoleType.Admin, project });
    const addAdminModalProps = useModal();
    const showContributorModalProps = useModal();

    return (
        <div>
            <H3>Participants</H3>
            <div className={classes.content}>
                <div className='w-full min-h-[40px]'>
                    <InvisibleButton
                        className='px-0 py-0 items-start'
                        onClick={() => showContributorModalProps.open()}
                    >
                        <UserList users={contributors.map((contribution) => contribution.user)} />
                    </InvisibleButton>
                    {contributors.length === 0 && <span>Aucun</span>}
                </div>
                {isProjectAdmin && (
                    <div className={classes.invite}>
                        <TertiaryButton
                            className={classes.inviteButton}
                            onClick={() => addAdminModalProps.open()}
                        >
                            <Icon className={classes.inviteIcon} name='add-people' size={15} />
                            Inviter
                        </TertiaryButton>
                    </div>
                )}
            </div>
            <Modal {...addAdminModalProps}>
                <AddAdminToProject
                    onSuccess={() => {
                        addAdminModalProps.close();
                        onAddAdmin();
                    }}
                    project={project}
                />
            </Modal>
            <Modal {...showContributorModalProps}>
                {contributors.map((contributor) => (
                    <UserCard
                        key={contributor.user.id}
                        role={contributor.role.label}
                        user={contributor.user}
                    />
                ))}
            </Modal>
        </div>
    );
};

export default ContributorSection;
