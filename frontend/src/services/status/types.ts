export type Status = {
    id: string;
    label: string;
};

export function fromApi(data: any): Status {
    return {
        id: data.id,
        label: data.label,
    };
}
