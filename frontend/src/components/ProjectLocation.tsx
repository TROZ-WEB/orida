import { useEnvironment } from '@contexts/appEnvironment';
import Position from '@customTypes/position';
import Icon from '@design/Icon';
import GeocodingService from '@services/geocoding';
import colors from '@styles/colors';
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
            <Icon className='mr-1' color={colors.grey} name='location' size={16} />
            <span className='text-xs text-grey truncate'>{address}</span>
        </div>
    );
};

export default ProjectLocation;
