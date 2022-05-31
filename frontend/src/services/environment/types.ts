export type Environment = {
    googleMapsKey: string;
    uploadcarePublicKey: string;
};

export const EnvironmentConverter = {
    fromApi(data: any): Environment {
        return {
            googleMapsKey: data.googleMapsKey,
            uploadcarePublicKey: data.uploadcarePublicKey,
        };
    },
};
