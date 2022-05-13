import { useEnvironment } from '@contexts/appEnvironment';
import Position from '@customTypes/position';
import Icon from '@design/Icon';
import GeocodingService from '@services/geocoding';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface ProjectLocationProps {
    location?: Position;
}

const ProjectLocation = ({ location }: ProjectLocationProps) => {
    const { t } = useTranslation();
    const [address, setAddress] = useState<string | undefined>(
        t('project_details_address_unknown')
    );
    const env = useEnvironment();

    useEffect(() => {
        async function getAddress() {
            if (env?.googleMapsKey && location) {
                const addressFound = await GeocodingService.getAddressFromCoordinates(location, {
                    apiKey: env?.googleMapsKey || '',
                });
                if (addressFound) {
                    setAddress(addressFound);
                }
            }
        }

        getAddress();
    }, [env]);

    return (
        <div className='flex items-center'>
            <Icon className='mr-2' name='marker' />
            <span className='text-sm'>{address}</span>
        </div>
    );
};

export default ProjectLocation;
