/* global google */
import { useEnvironment } from '@contexts/appEnvironment';
import Loader from '@design/Loader';
import { Status, Wrapper } from '@googlemaps/react-wrapper';
import { ReactElement, useEffect, useState } from 'react';
import ReactDOMServer from 'react-dom/server';

import Map from './Map';
import Marker from './Marker';

// default center is Paris
const DEFAULT_CENTER = {
    lat: 48.86424792119923,
    lng: 2.330163925985782,
};

// default zoom wrap the city of Paris
const DEFAULT_ZOOM = 13;

interface GoogleMapsProps<T> {
    initialCenter?: google.maps.LatLngLiteral;
    initialZoom?: number;
    markers: {
        data: T;
        position: google.maps.LatLngLiteral;
    }[];
    renderMarkerCard: (data: T) => ReactElement;
}

const GoogleMaps = <T,>({
    initialCenter = DEFAULT_CENTER,
    initialZoom = DEFAULT_ZOOM,
    markers,
    renderMarkerCard,
}: GoogleMapsProps<T>) => {
    const [zoom] = useState(initialZoom);
    const [center] = useState<google.maps.LatLngLiteral>(initialCenter);
    const env = useEnvironment();
    const [infowindow, setInfowindow] = useState<google.maps.InfoWindow>();

    useEffect(() => {
        if (window.google) {
            setInfowindow(
                new window.google.maps.InfoWindow({
                    maxWidth: 350,
                    pixelOffset: new window.google.maps.Size(-1, -25),
                })
            );
        }
    }, []);

    const render = (status: Status) => {
        if (status === Status.LOADING) {
            return <Loader />;
        }

        return <h1>{status}</h1>;
    };

    const onMarkerClick = (data: T, event: any, options: any) => {
        if (infowindow) {
            infowindow.close();
            const content = ReactDOMServer.renderToString(renderMarkerCard(data));
            infowindow.setContent(content);
            infowindow.open(options.map);
            infowindow.setPosition(event.latLng);
        }
    };

    if (!env?.googleMapsKey) {
        return null;
    }

    return (
        <div className='flex h-full'>
            <Wrapper apiKey={env?.googleMapsKey || ''} id='gmaps-script' render={render}>
                <Map center={center} className='flex-grow h-full' zoom={zoom}>
                    {markers.map(({ data, position }) => (
                        <Marker
                            key={`${position.lat}${position.lng}`}
                            onMarkerClick={(event, options) => onMarkerClick(data, event, options)}
                            position={position}
                        />
                    ))}
                </Map>
            </Wrapper>
        </div>
    );
};

export default GoogleMaps;
