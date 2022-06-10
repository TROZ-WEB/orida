class ThreadError extends Error { }

export default ThreadError;

export enum ThreadErrorType {
    NotFound = 'Thread not found',
}
