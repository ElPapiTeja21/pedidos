import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const MapContainer = () => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyD_ROi4IohxriSnWXY2TJWsfAx2PDdea6I',
    });

    const containerStyle = {
        width: '100%',
        height: '100%',
    };

    const center = {
        lat: 0,
        lng: 0,
    };

    if (!isLoaded) return <div>Loading...</div>;

    return (
        <div style={{ marginTop: '20px', height: '400px' }}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
            >
                {/* Marcador opcional */}
                <Marker position={center} />
            </GoogleMap>
        </div>
    );
};

export default MapContainer;
