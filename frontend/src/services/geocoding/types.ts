interface AddressComponent {
    long_name: string;
    short_name: string;
}

interface Coordinates {
    lat: number;
    lng: number;
}

interface Bounds {
    northeast: Coordinates;
    southwest: Coordinates;
}

interface Geometry {
    bounds: Bounds;
    location: Coordinates;
    location_type: string;
    viewport: Coordinates;
}

export interface GeocodingObject {
    address_components: AddressComponent[];
    formatted_address: string;
    geometry: Geometry;
    place_id: string;
    types: string[];
}

export interface GeocodingResponse {
    results: GeocodingObject[];
}
