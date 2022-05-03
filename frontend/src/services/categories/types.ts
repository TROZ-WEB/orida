import i18n from '@translations/i18n';

export type Category = {
    id: string;
    createdAt: Date;
    modifiedAt: Date;
    label: string;
    color: string;
};

export const CategoryConverter = {
    fromApi(data: any): Category {
        return {
            id: data.id,
            createdAt: data.createdAt,
            modifiedAt: data.modifiedAt,
            label: i18n.t(`categories_${data.label}`),
            color: data.color,
        };
    },
};
