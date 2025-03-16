import React, { useState } from "react";
import { GoogleMap, LoadScript, Polygon } from "@react-google-maps/api";

const MapComponent = ({ onSelect }) => {
    const [path, setPath] = useState([]);

    const handleClick = (e) => {
        setPath([...path, { lat: e.latLng.lat(), lng: e.latLng.lng() }]);
        onSelect(path);
    };

    return (
        <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
            <GoogleMap onClick={handleClick} center={{ lat: 37.7749, lng: -122.4194 }} zoom={10}>
                <Polygon paths={path} options={{ fillColor: "blue", fillOpacity: 0.5 }} />
            </GoogleMap>
        </LoadScript>
    );
};

export default MapComponent;
