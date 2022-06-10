import { useEnvironment } from '@contexts/appEnvironment';
import Position from '@customTypes/position';
import WithTheme from '@customTypes/theme';
import Label from '@design/Label';
import Space from '@design/Space';
import GeocodingService from '@services/geocoding';
import { GeocodingObject } from '@services/geocoding/types';
import { ReactNode, useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { Controller } from 'react-hook-form';

interface LocationInputProps extends WithTheme {
    onChange: (coordinates: Position, fullObject: GeocodingObject) => void;
    value?: Position;
}
const LocationInput = ({ onChange, value }: LocationInputProps) => {
    const env = useEnvironment();

    const [address, setAddress] = useState<any>();

    useEffect(() => {
        async function getValueAddress() {
            if (value) {
                const gMapAddress = await GeocodingService.getAddressFromCoordinates(value, {
                    apiKey: env?.googleMapsKey || '',
                });
                setAddress(gMapAddress);
            }
        }

        getValueAddress();
    }, [value]);

    const handleChange = async (event: any) => {
        const placeId = event.value.place_id;
        const geocodingAnswer = await GeocodingService.getPlaceFromPlaceId(placeId, {
            apiKey: env?.googleMapsKey || '',
        });

        if (geocodingAnswer) {
            const position = {
                latitude: geocodingAnswer.geometry.location.lat,
                longitude: geocodingAnswer.geometry.location.lng,
            };
            onChange(position, geocodingAnswer);
        }
    };

    if (value && !address) {
        return null;
    }

    const selectProps = value
        ? {
              onChange: handleChange,
              placeholder: 'Taper une adresse',
              defaultValue: { label: address?.toString(), value: address },
          }
        : {
              onChange: handleChange,
              placeholder: 'Taper une adresse',
          };

    return (
        <GooglePlacesAutocomplete
            apiKey={env?.googleMapsKey || ''}
            autocompletionRequest={{
                componentRestrictions: {
                    country: ['fr'],
                },
            }}
            selectProps={selectProps}
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
                render={({ field }) => <LocationInput {...field} />}
                rules={{ required }}
            />
        </div>
    );
};

export default ControlledLocationInput;
