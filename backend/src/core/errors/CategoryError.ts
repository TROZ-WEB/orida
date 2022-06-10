class MessageError extends Error { }

export default MessageError;

export enum MessageErrorType {
    NotFound = 'Message not found',
}
