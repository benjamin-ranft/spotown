import React, {useCallback, useRef, useState} from "react";
import {GoogleMap, Marker, useLoadScript} from "@react-google-maps/api";
import MapStyles from "./MapStyles";

const libraries = ["places"];
const mapContainerStyle = {
    width: "100vw",
    height: "100%",
};
const center = {
    lat: 53.551086,
    lng: 9.993682,
}

const options = {
    styles: MapStyles,
    disableDefaultUI: true,
}

export default function AddNewDiscoveryMap(){

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });

    const [markers, setMarkers] = useState([])

    const onMapClick = useCallback((e) => {
        setMarkers((current) => [
            ...current,
            {
                lat: e.latLng.lat(),
                lng: e.latLng.lng(),
                time: new Date(),
            },
        ]);
    }, []);

    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, [])

    if (loadError) return "Error loading map";
    if (!isLoaded) return "Loading Maps";

    return(
        <>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={14}
                center={center}
                options={options}
                onClick={onMapClick}
                onLoad={onMapLoad}
            >
                {markers.map((marker) => (
               <Marker
                   key={marker.time.toISOString()}
                   position={{lat:marker.lat, lng: marker.lng}}
               />
               ))}
            </GoogleMap>
        </>
    )
}