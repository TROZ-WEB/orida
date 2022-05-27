import AddMemberToOrganizationForm from '@components/AddMemberToOrganizationForm';
import { ProjectContribution } from '@customTypes/projectContribution';
import { Button } from '@design/buttons';
import Layout from '@design/layouts/Layout';
import Modal from '@design/modals/DefaultModal';
import Space from '@design/Space';
import { Table, Tbody, Td, Th, Thead, Tr } from '@design/table';
import { H2 } from '@design/titles';
import useModal from '@hooks/useModal';
import OrganizationService, { OrganizationMembership } from '@services/organizations';
import ProjectService from '@services/projects';
import { useEffect, useState } from 'react';

const AccountsPage = () => {
    const addMemberToOrgaModalProps = useModal();
    const [projectContributors, setProjectContributors] = useState<ProjectContribution[]>([]);
    const [organizationMembers, setOrganizationMembers] = useState<OrganizationMembership[]>([]);

    useEffect(() => {
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
    }, []);

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
                            </Tr>
                        </Thead>
                        <Tbody>
                            {projectContributors.map((contributor) => (
                                <Tr key={`${contributor.user.id}${contributor.project.title}`}>
                                    <Td>{contributor.user.fullname}</Td>
                                    <Td>{contributor.project.title}</Td>
                                    <Td>{contributor.role.label}</Td>
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
                            </Tr>
                        </Thead>
                        <Tbody>
                            {organizationMembers.map((membership) => (
                                <Tr key={`${membership.user.id}${membership.organization.name}`}>
                                    <Td>{membership.user.fullname}</Td>
                                    <Td>{membership.organization.name}</Td>
                                    <Td>{membership.role.label}</Td>
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
