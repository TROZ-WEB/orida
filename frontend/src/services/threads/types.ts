export interface Thread {
    id: string;
    subject: string;
    createdAt: Date;
}

export const ThreadConverter = {
    fromApi(data: any): Thread {
        return {
            id: data.id,
            subject: data.subject,
            createdAt: new Date(data.createdAt),
        };
    },
};
