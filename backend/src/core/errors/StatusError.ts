class StatusError extends Error { }

export default StatusError;

export enum StatusErrorType {
    NotFound = 'Status not found',
}
