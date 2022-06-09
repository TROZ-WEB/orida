export type Environment = {
    googleMapsKey: string;
    tinyMCEKey: string;
    uploadcarePublicKey: string;
};

export const EnvironmentConverter = {
    fromApi(data: any): Environment {
        return {
            googleMapsKey: data.googleMapsKey,
            tinyMCEKey: data.tinyMCEKey,
            uploadcarePublicKey: data.uploadcarePublicKey,
        };
    },
};
