import { useEnvironment } from '@contexts/appEnvironment';
import Position from '@customTypes/position';
import WithTheme from '@customTypes/theme';
import Label from '@design/Label';
import Space from '@design/Space';
import GeocodingService from '@services/geocoding';
import { GeocodingObject } from '@services/geocoding/types';
import { ReactNode, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { Controller } from 'react-hook-form';

interface LocationInputProps extends WithTheme {
    onChange: (coordinates: Position, fullObject: GeocodingObject) => void;
}
const LocationInput = ({ onChange }: LocationInputProps) => {
    const env = useEnvironment();
    const [value, setValue] = useState(null);

    const handleChange = async (event: any) => {
        const placeId = event.value.place_id;
        const geocodingAnswer = await GeocodingService.getPlaceFromPlaceId(placeId, {
            apiKey: env?.googleMapsKey || '',
        });
        setValue(event);

        if (geocodingAnswer) {
            const position = {
                latitude: geocodingAnswer.geometry.location.lat,
                longitude: geocodingAnswer.geometry.location.lng,
            };
            onChange(position, geocodingAnswer);
        }
    };

    return (
        <GooglePlacesAutocomplete
            apiKey={env?.googleMapsKey || ''}
            apiOptions={{
                region: 'FR',
            }}
            selectProps={{
                value,
                onChange: handleChange,
            }}
        />
    );
};

interface ControlledLocationInputProps {
    label?: ReactNode;
    name: string;
    control: any;
    required?: boolean;
}

const ControlledLocationInput = ({
    control,
    label,
    name,
    required = false,
}: ControlledLocationInputProps) => {
    return (
        <div>
            <Label>{label}</Label>
            <Space px={8} />
            <Controller
                control={control}
                name={name}
                render={({ field }) => <LocationInput onChange={field.onChange} />}
                rules={{ required }}
            />
        </div>
    );
};

export default ControlledLocationInput;
