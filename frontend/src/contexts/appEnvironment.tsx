import EnvironmentService from '@services/environment';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';

interface EnvironmentCtxProps {
    googleMapsKey: string;
    uploadcarePublicKey: string;
}

const EnvironmentCtx = createContext<EnvironmentCtxProps | null>(null);

const defaultCtx: EnvironmentCtxProps = {
    googleMapsKey: '',
    uploadcarePublicKey: '',
};

const EnvironmentProvider = ({ children }: PropsWithChildren<{}>) => {
    const [state, setState] = useState<EnvironmentCtxProps>(defaultCtx);

    useEffect(() => {
        async function getEnvironment() {
            const result = await EnvironmentService.getAll();
            setState(result);
        }

        getEnvironment();
    }, []);

    return <EnvironmentCtx.Provider value={state}>{children}</EnvironmentCtx.Provider>;
};

export const useEnvironment = () => useContext(EnvironmentCtx);

export default EnvironmentProvider;
