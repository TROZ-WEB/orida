import i18n from '@translations/i18n';

export type Category = {
    id: string;
    label: string;
    color: string;
};

export const CategoryConverter = {
    fromApi(data: any): Category {
        return {
            id: data.id,
            label: i18n.t(`categories_${data.label}`),
            color: data.color,
        };
    },
};
