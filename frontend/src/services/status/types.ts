import i18n from '@translations/i18n';

export type Status = {
    id: string;
    label: string;
};

export const StatusConverter = {
    fromApi(data: any): Status {
        return {
            id: data.id,
            label: i18n.t(`project_status_${data.label}`),
        };
    },
};
