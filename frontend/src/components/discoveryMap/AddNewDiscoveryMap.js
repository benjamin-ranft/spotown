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
        <>
            <Search panTo={panTo} />
            <Locate panTo={panTo} />
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={14}
                center={center}
                options={options}
                onClick={onMapClick}
                onLoad={onMapLoad}
            >
                {markers.map((marker) => (<Marker
                        key={marker.time.toISOString()}
                        position={{lat:marker.lat, lng: marker.lng}}
                    />
                ))}
            </GoogleMap>
        </>
    )
}


function Locate({ panTo }) {
    return (
        <LocateLayout>
            <StyledButton
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
            </StyledButton>
        </LocateLayout>
    );
}

const LocateLayout = styled.div`
position: absolute;
z-index: 10;
right: 0;
`

const StyledButton = styled.button`
background-color: transparent;
border-color: transparent;
`

const StyledLocatorIcon = styled(MdMyLocation)`
font-size: 40px;
background-color: white;
border-width: thin;
border-color: var(--light-grey);
border-style: solid;
padding: 5px;
color: var(--accent-red);
border-radius: 100px;
box-shadow: var(--center-box-shadow);
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
            location: {lat: () => 53.551086, lng: () => 9.993682},
            radius: 1000,
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
        <StyledDiv>
        <ComboboxLayout>
            <Combobox onSelect={handleSelect}>
                <ComboboxInput
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
        </ComboboxLayout>
        </StyledDiv>
    );
}

const StyledDiv = styled.div`
display: grid;
grid-template-columns: 23px 1fr 23px;
`

const ComboboxLayout = styled.div`
grid-column: 2;
justify-self: center;
`