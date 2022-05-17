/* global google */
import { useEffect, useState } from 'react';

interface MarkerProps extends google.maps.MarkerOptions {
    onMarkerClick: (e: any, options: any) => void;
}

const Marker = (options: MarkerProps) => {
    const [marker, setMarker] = useState<google.maps.Marker>();
    const { onMarkerClick } = options;

    useEffect(() => {
        if (!marker) {
            setMarker(new google.maps.Marker());
        }

        // remove marker from map on unmount
        return () => {
            if (marker) {
                marker.setMap(null);
            }
        };
    }, [marker]);

    useEffect(() => {
        if (marker) {
            marker.setOptions(options);
            marker.addListener('click', (e: any) => onMarkerClick(e, options));
        }
    }, [marker, options]);

    return null;
};

export default Marker;
