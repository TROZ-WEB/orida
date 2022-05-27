import AddMemberToOrganizationForm from '@components/AddMemberToOrganizationForm';
import { ProjectContribution } from '@customTypes/projectContribution';
import { Button, DeleteButton } from '@design/buttons';
import Layout from '@design/layouts/Layout';
import Modal from '@design/modals/DefaultModal';
import Space from '@design/Space';
import { Table, Tbody, Td, Th, Thead, Tr } from '@design/table';
import { H2 } from '@design/titles';
import useModal from '@hooks/useModal';
import notify, { NotificationType } from '@services/notifications';
import OrganizationService, { OrganizationMembership } from '@services/organizations';
import ProjectService from '@services/projects';
import { useEffect, useState } from 'react';

const AccountsPage = () => {
    const addMemberToOrgaModalProps = useModal();
    const [projectContributors, setProjectContributors] = useState<ProjectContribution[]>([]);
    const [organizationMembers, setOrganizationMembers] = useState<OrganizationMembership[]>([]);

    const refresh = () => {
        const getAllContributors = async () => {
            const contributors = await ProjectService.getContributors();
            setProjectContributors(contributors);
        };
        const getAllMembers = async () => {
            const members = await OrganizationService.getMembers();
            setOrganizationMembers(members);
        };

        getAllContributors();
        getAllMembers();
    };

    useEffect(() => {
        refresh();
    }, []);

    const deleteContributor = (projectId: string, userId: string) => {
        try {
            ProjectService.removeContributor({ projectId, userId });
            notify(NotificationType.Success, 'Opération réussie');
            refresh();
        } catch (e) {
            console.error(e);
            notify(NotificationType.Error, "Échec de l'opération");
        }
    };

    const deleteMembership = (organizationId: string, userId: string) => {
        try {
            OrganizationService.removeMember({ organizationId, userId });
            notify(NotificationType.Success, 'Opération réussie');
            refresh();
        } catch (e) {
            console.error(e);
            notify(NotificationType.Error, "Échec de l'opération");
        }
    };

    return (
        <Layout>
            <Space px={60} />
            <div className='flex w-full'>
                <div className='w-full'>
                    <H2>Droits projets</H2>
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>Utilisateur</Th>
                                <Th>Projet</Th>
                                <Th>Rôle</Th>
                                <Th>Actions</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {projectContributors.map(({ user, project, role }) => (
                                <Tr key={`${user.id}${project.title}`}>
                                    <Td>{user.fullname}</Td>
                                    <Td>{project.title}</Td>
                                    <Td>{role.label}</Td>
                                    <Td>
                                        <DeleteButton
                                            onClick={() => deleteContributor(project.id, user.id)}
                                        />
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </div>
                <Space px={25} horizontal />
                <div className='w-full'>
                    <Button onClick={() => addMemberToOrgaModalProps.open()}>
                        Ajouter un utilisateur à une organisation
                    </Button>
                    <Space px={8} />
                    <H2>Droits organisations</H2>
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>Utilisateur</Th>
                                <Th>Organisation</Th>
                                <Th>Rôle</Th>
                                <Th>Actions</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {organizationMembers.map(({ user, organization, role }) => (
                                <Tr key={`${user.id}${organization.name}`}>
                                    <Td>{user.fullname}</Td>
                                    <Td>{organization.name}</Td>
                                    <Td>{role.label}</Td>
                                    <Td>
                                        <DeleteButton
                                            onClick={() =>
                                                deleteMembership(organization.id, user.id)
                                            }
                                        />
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </div>
            </div>
            <Modal {...addMemberToOrgaModalProps}>
                <AddMemberToOrganizationForm />
            </Modal>
        </Layout>
    );
};

export default AccountsPage;
