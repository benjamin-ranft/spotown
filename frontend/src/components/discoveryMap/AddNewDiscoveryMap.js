import React, {useCallback, useRef, useEffect} from "react";
import {useHistory} from "react-router-dom";
import {GoogleMap, Marker, useLoadScript} from "@react-google-maps/api";
import MapStyles from "./MapStyles";
import styled from "styled-components/macro";
import axios from "axios";
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

const options = {
    styles: MapStyles,
    disableDefaultUI: true,
}

export default function AddNewDiscoveryMap({center, setCenter, setPlaceId}){

    const history = useHistory();
    const key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: key,
        libraries,
    });

//Gets PlaceId from latLng
    useEffect(() => {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${center.lat},${center.lng}&key=${key}`;
        axios
            .get(url)
            .then((response) => response.data)
            .then((data) => {
                const getPlaceId = data.results[0].place_id;
                setPlaceId(getPlaceId);

            })
            .catch(console.error);
    },[center]);


    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, [])

    const handleDrag = (() => {
        if(mapRef.current){
        setCenter({lat: mapRef.current.center.lat(), lng: mapRef.current.center.lng()});
        }
    })

    const panTo = useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(14);
    }, []);

    if (loadError) return "Error loading map";
    if (!isLoaded) return "Loading Maps";

    return(
        <>
            <Search panTo={panTo} center={center} history={history}/>
            <Locate panTo={panTo} setCenter={setCenter} />
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={14}
                center={center}
                options={options}
                onLoad={onMapLoad}
                onDragEnd={handleDrag}
            >
                <Marker position={center}/>
            </GoogleMap>
        </>
    )
}

function Locate({ panTo, setCenter }) {
    return (
        <LocateLayout>
            <StyledButton
                onClick={() => {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            panTo({
                                lat: position.coords.latitude,
                                lng: position.coords.longitude
                            });
                            setCenter({
                                lat: position.coords.latitude,
                                lng: position.coords.longitude
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


function Search({panTo, center, history}) {
    const {
        ready,
        value,
        suggestions: {status, data},
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            location: {lat: () => center.lat, lng: () => center.lng},
            radius: 500,
            types: ['establishment']
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
            const placeId = results[0].place_id;
            const { lat, lng } = await getLatLng(results[0]);
            panTo({ lat, lng });
            history.push("/new/confirm?place_id=" + placeId)

        } catch (error) {
            console.log("Error: ", error);
        }
    };

    return (
        <StyledDiv>
        <ComboboxLayout>
            <Combobox onSelect={handleSelect}>
                <ComboboxInputStyled
                    value={value}
                    onChange={handleInput}
                    disabled={!ready}
                    placeholder="Search for location"
                />
                <ComboboxPopover>
                    <ComboboxList>
                        {status === "OK" &&
                        data.map(({ description }) => (
                            <ComboboxOption  value={description} />
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
padding: 10px;
`

const ComboboxLayout = styled.div`
grid-column: 2;
justify-self: center;
`

const ComboboxInputStyled = styled(ComboboxInput)`
border-radius: 20px;
background-color: var(--light-grey);
border-color: transparent;
padding: 5px 10px;
width: 70vw;
`

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
