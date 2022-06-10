import * as Sentry from '@sentry/node';
import express, { RequestHandler } from 'express';
import session from 'express-session';
import CORECategoryRepository from '../core/ports/repositories/CORECategoryRepository';
import COREOrganizationMembershipRepository from '../core/ports/repositories/COREOrganizationMembershipRepository';
import COREOrganizationRepository from '../core/ports/repositories/COREOrganizationRepository';
import COREPollRepository from '../core/ports/repositories/COREPollRepository';
import COREProjectContributionRepository from '../core/ports/repositories/COREProjectContributionRepository';
import COREProjectRepository from '../core/ports/repositories/COREProjectRepository';
import COREProjectStatusRepository from '../core/ports/repositories/COREProjectStatusRepository';
import CORERoleRepository from '../core/ports/repositories/CORERoleRepository';
import COREThreadRepository from '../core/ports/repositories/COREThreadRepository';
import COREUserRepository from '../core/ports/repositories/COREUserRepository';
import auth from './auth';
import errorHandler from './middlewares/errorHandler';
import categoriesRouter from './routes/categories';
import environmentRouter from './routes/environment';
import healthRouter from './routes/health';
import organizationMembershipsRouter from './routes/organizationMemberships';
import organizationsRouter from './routes/organizations';
import pollsRouter from './routes/polls';
import projectContributionsRouter from './routes/projectContributions';
import projectsRouter from './routes/projects';
import projectStatutesRouter from './routes/projectStatutes';
import rolesRouter from './routes/roles';
import threadsRouter from './routes/threads';
import usersRouter from './routes/users';

const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const app = express();

interface setupProps {
    categoryRepository: CORECategoryRepository,
    organizationMembershipRepository: COREOrganizationMembershipRepository,
    organizationRepository: COREOrganizationRepository,
    pollRepository: COREPollRepository,
    projectContributionRepository: COREProjectContributionRepository,
    projectRepository: COREProjectRepository,
    projectStatusRepository: COREProjectStatusRepository,
    roleRepository: CORERoleRepository,
    threadRepository: COREThreadRepository,
    userRepository:COREUserRepository,
}

const setup = ({
    categoryRepository,
    organizationMembershipRepository,
    organizationRepository,
    pollRepository,
    projectContributionRepository,
    projectRepository,
    projectStatusRepository,
    roleRepository,
    threadRepository,
    userRepository,
}: setupProps): void => {
    app.use(Sentry.Handlers.requestHandler());

    app.use('/health', healthRouter);
    app.use('/environment/', environmentRouter);

    // Parse request
    app.use(express.json());

    // Session
    const secret = process.env.COOKIE_SECRET;

    if (!secret) {
        throw new Error('Missing COOKIE_SECRET env variable');
    }

    app.use(
    session({
        secret,
    }) as RequestHandler,
    );

    // Init authentication
    app.use(auth.initialize() as RequestHandler);
    app.use(auth.session());

    app.use('/categories/', categoriesRouter({ categoryRepository }));
    app.use('/organizationMemberships/', organizationMembershipsRouter({ organizationMembershipRepository }));
    app.use('/organizations/', organizationsRouter({ organizationRepository }));
    app.use('/polls/', pollsRouter({ pollRepository }));
    app.use('/projectContributions/', projectContributionsRouter({ projectContributionRepository }));
    app.use('/projects/', projectsRouter({ projectRepository }));
    app.use('/projectStatutes/', projectStatutesRouter({ projectStatusRepository }));
    app.use('/roles/', rolesRouter({ roleRepository }));
    app.use('/threads/', threadsRouter({ threadRepository }));
    app.use('/users/', usersRouter({ userRepository }));

    app.use(Sentry.Handlers.errorHandler());

    app.use(errorHandler);
};

const init = async (): Promise<void> => {
    app.listen(PORT, () => {
        console.info(`Server started at http://localhost:${PORT}`);
    });
};

export default { setup, init };
