/* global google */
import { useEnvironment } from '@contexts/appEnvironment';
import Loader from '@design/Loader';
import { Status, Wrapper } from '@googlemaps/react-wrapper';
import { useState } from 'react';

import Map from './Map';
import Marker from './Marker';

// default center is Paris
const DEFAULT_CENTER = {
    lat: 48.86424792119923,
    lng: 2.330163925985782,
};

// default zoom wrap the city of Paris
const DEFAULT_ZOOM = 13;

interface GoogleMapsProps {
    initialCenter?: google.maps.LatLngLiteral;
    initialZoom?: number;
    markers: google.maps.LatLngLiteral[];
}

const GoogleMaps = ({
    initialCenter = DEFAULT_CENTER,
    initialZoom = DEFAULT_ZOOM,
    markers,
}: GoogleMapsProps) => {
    const [clicks] = useState<google.maps.LatLngLiteral[]>(markers);
    const [zoom] = useState(initialZoom);
    const [center] = useState<google.maps.LatLngLiteral>(initialCenter);
    const env = useEnvironment();

    const render = (status: Status) => {
        if (status === Status.LOADING) {
            return <Loader />;
        }

        return <h1>{status}</h1>;
    };

    return (
        <div className='flex h-full'>
            <Wrapper apiKey={env?.googleMapsKey || ''} render={render}>
                <Map center={center} className='flex-grow h-full' zoom={zoom}>
                    {clicks.map((latLng) => (
                        <Marker key={`${latLng.lat}${latLng.lng}`} position={latLng} />
                    ))}
                </Map>
            </Wrapper>
        </div>
    );
};

export default GoogleMaps;
