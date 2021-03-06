import * as Sentry from '@sentry/node';
import express, { RequestHandler } from 'express';
import session from 'express-session';
import auth from './auth';
import errorHandler from './middlewares/errorHandler';
import authRouter from './routes/auth';
import categoriesRouter from './routes/categories';
import environmentRouter from './routes/environment';
import healthRouter from './routes/health';
import messagesRouter from './routes/messages';
import notificationsRouter from './routes/notifications';
import organizationsRouter from './routes/organizations';
import pollsRouter from './routes/polls';
import projectsRouter from './routes/projects';
import rolesRouter from './routes/roles';
import statusRouter from './routes/status';
import threadsRouter from './routes/threads';
import usersRouter from './routes/users';

const app = express();

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

app.use('/auth/', authRouter);
app.use('/categories/', categoriesRouter);
app.use('/messages/', messagesRouter);
app.use('/organizations/', organizationsRouter);
app.use('/polls/', pollsRouter);
app.use('/projects/', projectsRouter);
app.use('/roles/', rolesRouter);
app.use('/status/', statusRouter);
app.use('/threads/', threadsRouter);
app.use('/users/', usersRouter);
app.use('/notifications/', notificationsRouter);

app.use(Sentry.Handlers.errorHandler());

app.use(errorHandler);

export default app;
