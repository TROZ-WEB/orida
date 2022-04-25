export type Category = {
    id: string;
    label: string;
    picture: string;
};

export function fromApi(data: any): Category {
    return {
        id: data.id,
        label: data.label,
        picture: data.picture,
    };
}
