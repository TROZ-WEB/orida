/* eslint-disable max-len */
import OrganizationMembershipDomain from '../../domain/OrganizationMembership';

interface createOrganizationMembershipProps {
    userId: string;
    organizationId: string;
    roleId?: string;
}

interface deleteOrganizationMembershipProps {
    userId: string;
    organizationId: string;
}

interface COREOrganizationMembershipRepository {
    createOrganizationMembership(organizationMembershipData: createOrganizationMembershipProps): Promise<OrganizationMembershipDomain>;
    deleteOrganizationMembership(organizationMembershipData: deleteOrganizationMembershipProps): Promise<OrganizationMembershipDomain>;
    getAllOrganizationMemberships(): Promise<OrganizationMembershipDomain[]>;
}

export default COREOrganizationMembershipRepository;
