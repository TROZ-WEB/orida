import serverAdapter from './application';
import sentryAdapter from './application/adapters/errorsMonitoring/sentryAdapter';
import AppDataSource from './infrastructure/database/index';
import DBCategoryRepository from './infrastructure/repositories/DBCategoryRepository';
import DBOrganizationMembershipRepository from './infrastructure/repositories/DBOrganizationMembershipRepository';
import DBOrganizationRepository from './infrastructure/repositories/DBOrganizationRepository';
import DBPollRepository from './infrastructure/repositories/DBPollRepository';
import DBProjectContributionRepository from './infrastructure/repositories/DBProjectContributionRepository';
import DBProjectRepository from './infrastructure/repositories/DBProjectRepository';
import DBProjectStatusRepository from './infrastructure/repositories/DBProjectStatusRepository';
import DBRoleRepository from './infrastructure/repositories/DBRoleRepository';
import DBThreadRepository from './infrastructure/repositories/DBThreadRepository';
import DBUserRepository from './infrastructure/repositories/DBUserRepository';

(async () => {
    // Database
    await AppDataSource.initialize();
    // Init sentry
    sentryAdapter.init();
    // Setup express
    serverAdapter.setup({
        categoryRepository: DBCategoryRepository,
        organizationMembershipRepository: DBOrganizationMembershipRepository,
        organizationRepository: DBOrganizationRepository,
        pollRepository: DBPollRepository,
        projectContributionRepository: DBProjectContributionRepository,
        projectRepository: DBProjectRepository,
        projectStatusRepository: DBProjectStatusRepository,
        roleRepository: DBRoleRepository,
        threadRepository: DBThreadRepository,
        userRepository: DBUserRepository,
    });
    // Init express
    serverAdapter.init();
})().catch((error) => console.error('Boostrap error : ', { data: error }));
