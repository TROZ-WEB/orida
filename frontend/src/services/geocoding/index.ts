import Position from '@customTypes/position';
import { ParameteredGET } from '@utils/http';

import { GeocodingObject, GeocodingResponse } from './types';

interface Options {
    apiKey: string;
}

async function getPlaceFromPlaceId(
    placeId: string,
    { apiKey }: Options
): Promise<GeocodingObject | null> {
    try {
        // we need to remove credentials from this request as the answer uses a widlcard
        const response = await ParameteredGET({ withCredentials: false })<GeocodingResponse>(
            `https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&key=${apiKey}`
        );
        const result = response.results ? response.results[0] : null;

        return result;
    } catch (error) {
        // TODO::error handling
        console.error(error);
        throw Error('GeocodingService::getPlaceFromPlaceId Unhandled error');
    }
}

async function getAddressFromCoordinates(
    position: Position,
    { apiKey }: Options
): Promise<string | null> {
    try {
        // we need to remove credentials from this request as the answer uses a widlcard
        const response = await ParameteredGET({ withCredentials: false })<GeocodingResponse>(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.latitude},${position.longitude}&key=${apiKey}&types=street_address`
        );
        const result = response.results.filter((place) => place.types.includes('street_address'));

        if (result.length === 0) {
            return null;
        }

        return result[0].formatted_address;
    } catch (error) {
        // TODO::error handling
        console.error(error);
        throw Error('GeocodingService::getPlaceFromPlaceId Unhandled error');
    }
}

const GeocodingService = {
    getAddressFromCoordinates,
    getPlaceFromPlaceId,
};

export default GeocodingService;
