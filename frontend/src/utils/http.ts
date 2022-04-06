type AnyObject = Record<string, unknown>;

export type HttpBody = AnyObject | FormData;

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

const factory = (method: string) => async < T > (url: string, data?: HttpBody): Promise<T> => {
    const options: {
        headers: { [key: string]: string },
        body: string | FormData | undefined,
    } = {
        headers: {},
        body: undefined,
    };

    if (data) {
        if (data instanceof FormData) {
            options.body = data;
        } else {
            options.body = JSON.stringify(data);
            options.headers = { ...options.headers, 'Content-Type': 'application/json' };
        }
    }

    const response = await fetch(url, {
        method,
        credentials: 'include',
        ...options,
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
