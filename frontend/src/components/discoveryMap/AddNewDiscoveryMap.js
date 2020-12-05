import React, {useCallback, useRef, useState} from "react";
import {GoogleMap, Marker, useLoadScript} from "@react-google-maps/api";
import MapStyles from "./MapStyles";
import styled from "styled-components/macro";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";

import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import {MdMyLocation} from "react-icons/all";

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

    const panTo = useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(14);
    }, []);

    if (loadError) return "Error loading map";
    if (!isLoaded) return "Loading Maps";

    return(
        <MapLayout>
            <MapControls>
                <Search panTo={panTo} />
                <Locate panTo={panTo} />
            </MapControls>
            <MapCanvas>
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
            </MapCanvas>
        </MapLayout>
    )
}

const MapLayout = styled.div`
display: grid;
grid-template-columns: 23px 1fr 23px;
grid-template-rows: min-content 1fr;
row-gap: 16px;
height: 100%;
`

const MapControls = styled.div`
display: grid;
margin-top: 8px;
grid-column: 2;
grid-template-columns: 1fr min-content;
grid-row: 1;
`

const MapCanvas = styled.div`
display: block;
grid-row: 2;
grid-column-start: 1;
grid-column-end: 4;
`


function Locate({ panTo }) {
    return (
        <StyledLocateButton
            onClick={() => {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        panTo({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        });
                    },
                    () => null
                );
            }}
        >
            <StyledLocatorIcon/>
        </StyledLocateButton>
    );
}

const StyledLocateButton = styled.button`
background-color: transparent;
border-color: transparent;
margin-left: 6px;
:focus{
display: none;
}
`

const StyledLocatorIcon = styled(MdMyLocation)`
font-size: 36px;
background-color: white;
border-width: thin;
border-color: var(--light-grey);
border-style: solid;
padding: 5px;
color: var(--accent-red);
border-radius: 100px;
`

function Search({panTo}) {
    const {
        ready,
        value,
        suggestions: {status, data},
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            location: {lat: () => 43.6532, lng: () => -79.3832},
            radius: 100 * 1000,
        },
    });

    const handleInput = (e) => {
        setValue(e.target.value);
    };

    const handleSelect = async (address) => {
        setValue(address, false);
        clearSuggestions();

        try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            panTo({ lat, lng });
        } catch (error) {
            console.log("😱 Error: ", error);
        }
    };

    return (
        <>
            <Combobox onSelect={handleSelect}>
                <StyledComboboxInput
                    value={value}
                    onChange={handleInput}
                    disabled={!ready}
                    placeholder="Search for location"
                />
                <ComboboxPopover>
                    <ComboboxList>
                        {status === "OK" &&
                        data.map(({ id, description }) => (
                            <ComboboxOption key={id} value={description} />
                        ))}
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
        </>
    );
}

const StyledComboboxInput = styled(ComboboxInput)`
border-radius: 100px;
background-color: var(--light-grey);
color: var(--dark-grey);
justify-self: center;
padding: 8px 16px;
width: 100%;
border: none;

:focus{
display: none;
}

`