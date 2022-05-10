export type Environment = {
    googleMapsKey: string;
};

export const EnvironmentConverter = {
    fromApi(data: any): Environment {
        return {
            googleMapsKey: data.googleMapsKey,
        };
    },
};
