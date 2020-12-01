import React from "react";
import {GoogleMap, useLoadScript} from "@react-google-maps/api";
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

export default function DiscoveryMap(){

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });

    if (loadError) return "Error loading map";
    if (!isLoaded) return "Loading Maps";

    return(
        <>
            <GoogleMap mapContainerStyle={mapContainerStyle}
                       zoom={14}
                       center={center}
                       options={options}/>
        </>
    )
}