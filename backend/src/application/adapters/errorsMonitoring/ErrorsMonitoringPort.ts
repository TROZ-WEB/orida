import { RequestHandler, ErrorRequestHandler } from 'express';

interface ErrorsMonitoringAdapter {
    init(): void;
    handleRequests(): RequestHandler;
    handleErrors(): ErrorRequestHandler;
}

export default ErrorsMonitoringAdapter;
