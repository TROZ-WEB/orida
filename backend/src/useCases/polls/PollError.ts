class PollError extends Error { }

export default PollError;

export enum PollErrorType {
    NotFound = 'Poll not found',
}
