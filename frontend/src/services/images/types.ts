export type Image = {
    id: string;
    url: string;
};

export const ImageConverter = {
    fromApi(data: any): Image {
        return {
            id: data.id,
            url: data.url,
        };
    },
};
