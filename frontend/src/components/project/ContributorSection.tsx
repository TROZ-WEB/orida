import AddContributorToProject from '@components/AddContributorToProject';
import UserList from '@components/UserList';
import { ProjectContribution } from '@customTypes/projectContribution';
import { InvisibleButton, TertiaryButton } from '@design/buttons';
import Icon from '@design/Icon';
import Modal from '@design/modals/DefaultModal';
import { Table, Tbody, Td, Th, Thead, Tr } from '@design/table';
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
    onAddContributor: () => void;
    contributors: ProjectContribution[];
    project: Project;
}

const ContributorSection = ({
    onAddContributor,
    contributors,
    project,
}: ContributorSectionProps) => {
    const { isAdmin } = useRole();
    const addContributorModalProps = useModal();
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
                {isAdmin && (
                    <div className={classes.invite}>
                        <TertiaryButton
                            className={classes.inviteButton}
                            onClick={() => addContributorModalProps.open()}
                        >
                            <Icon className={classes.inviteIcon} name='add-people' size={15} />
                            Inviter
                        </TertiaryButton>
                    </div>
                )}
            </div>
            <Modal {...addContributorModalProps}>
                <AddContributorToProject
                    onSuccess={() => {
                        addContributorModalProps.close();
                        onAddContributor();
                    }}
                    project={project}
                />
            </Modal>
            <Modal {...showContributorModalProps}>
                <Table>
                    <Thead>
                        <Tr>
                            <Th>Utilisateur</Th>
                            <Th>Rôle</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {contributors.map((contributor) => (
                            <Tr key={contributor.user.id}>
                                <Td>{contributor.user.fullname}</Td>
                                <Td>{contributor.role.label}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Modal>
        </div>
    );
};

export default ContributorSection;
