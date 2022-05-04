import fetch from 'node-fetch';

type AnyObject = Record<string, unknown>;

type Header = { [key: string]: string };

export type HttpBody = AnyObject;

export type Options = {
    headers?: { [key: string]: string };
    body?: HttpBody | string | undefined
}

export class HttpError extends Error {
    status: number;

    type?: string;

    constructor(status: number, body: { message: string; type: string } | null) {
        super(body?.message);

        Object.setPrototypeOf(this, HttpError.prototype);
        this.type = body?.type;
        this.status = status;
    }
}

const factory = (method: string) => async <T>(url: string, options?: Options): Promise<T> => {
    const data = options?.body;
    const completeOptions: {
                headers: Header;
                body: string | undefined;
            } = {
                headers: options?.headers ? options.headers : {},
                body: undefined,
            };

    if (data) {
        completeOptions.body = JSON.stringify(data);
        completeOptions.headers = { ...completeOptions.headers, 'Content-Type': 'application/json' };
    }

    const response = await fetch(url, {
        method,
        ...completeOptions,
    });

    if (!response.ok) {
        const { status } = response;
        let body = null;
        try {
            body = await response.json();
        } catch (e) {
            // No body
        }

        throw new HttpError(status, body);
    }

    return response.json();
};

export const GET = factory('GET');
export const PATCH = factory('PATCH');
export const POST = factory('POST');
export const PUT = factory('PUT');
export const DELETE = factory('DELETE');

export default {
    GET,
    PATCH,
    POST,
    PUT,
    DELETE,
};
