import * as Sentry from '@sentry/node';
import ErrorsMonitoringPort from '../../../core/ports/ErrorMonitoringPort';
import version from '../../../version';

const init: ErrorsMonitoringPort['init'] = () => {
    Sentry.init({
        dsn: process.env.SENTRY_DSN,
        environment: process.env.ENVIRONMENT_NAME,
        release: version ? `orida-backend@${version}` : undefined,
    });
};

const handleRequests: ErrorsMonitoringPort['handleRequests'] = () => Sentry.Handlers.requestHandler();

const handleErrors: ErrorsMonitoringPort['handleErrors'] = () => Sentry.Handlers.errorHandler();

export default { init, handleRequests, handleErrors };
