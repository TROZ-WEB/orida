import { RequestHandler, ErrorRequestHandler } from 'express';

interface ErrorsMonitoringPort {
    init(): void;
    handleRequests(): RequestHandler;
    handleErrors(): ErrorRequestHandler;
}

export default ErrorsMonitoringPort;
