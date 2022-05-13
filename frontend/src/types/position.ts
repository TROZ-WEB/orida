type Position = {
    latitude: number;
    longitude: number;
};

export const PositionConverter = {
    fromApi(data: any): Position {
        return {
            latitude: data.latitude,
            longitude: data.longitude,
        };
    },
};

export default Position;
