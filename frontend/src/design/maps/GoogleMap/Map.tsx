/* global google */
import { isLatLngLiteral } from '@googlemaps/typescript-guards';
import { createCustomEqual } from 'fast-equals';
import {
    Children,
    cloneElement,
    EffectCallback,
    isValidElement,
    PropsWithChildren,
    useEffect,
    useRef,
    useState,
} from 'react';

const deepCompareEqualsForMaps = createCustomEqual((deepEqual) => (a: any, b: any) => {
    if (
        isLatLngLiteral(a) ||
        a instanceof google.maps.LatLng ||
        isLatLngLiteral(b) ||
        b instanceof google.maps.LatLng
    ) {
        return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
    }

    // TODO extend to other types

    // use fast-equals for other objects
    return deepEqual(a, b);
});

function useDeepCompareMemoize(value: any) {
    const ref = useRef();

    if (!deepCompareEqualsForMaps(value, ref.current)) {
        ref.current = value;
    }

    return ref.current;
}

function useDeepCompareEffectForMaps(callback: EffectCallback, dependencies: any[]) {
    useEffect(callback, dependencies.map(useDeepCompareMemoize));
}

interface MapProps extends google.maps.MapOptions {
    className?: string;
    onClick?: (e: google.maps.MapMouseEvent) => void;
    onIdle?: (map: google.maps.Map) => void;
}

const Map = ({ className, onClick, onIdle, children, ...options }: PropsWithChildren<MapProps>) => {
    const ref = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<google.maps.Map>();

    useEffect(() => {
        if (ref.current && !map) {
            setMap(new window.google.maps.Map(ref.current, {}));
        }
    }, [ref, map]);

    // because React does not do deep comparisons, a custom hook is used
    // see discussion in https://github.com/googlemaps/js-samples/issues/946
    useDeepCompareEffectForMaps(() => {
        if (map) {
            map.setOptions(options);
        }
    }, [map, options]);

    useEffect(() => {
        if (map) {
            ['click', 'idle'].forEach((eventName) =>
                google.maps.event.clearListeners(map, eventName)
            );

            if (onClick) {
                map.addListener('click', onClick);
            }

            if (onIdle) {
                map.addListener('idle', () => onIdle(map));
            }
        }
    }, [map, onClick, onIdle]);

    return (
        <>
            <div ref={ref} className={className} />
            {Children.map(children, (child) => {
                if (isValidElement(child)) {
                    // set the map prop on the child component
                    return cloneElement(child, { map });
                }

                return null;
            })}
        </>
    );
};

export default Map;
