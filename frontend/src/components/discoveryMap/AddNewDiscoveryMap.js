import React, {useCallback, useContext, useRef, useState} from "react";
import {GoogleMap, Marker, useLoadScript} from "@react-google-maps/api";
import MapStyles from "./MapStyles";
import styled from "styled-components/macro";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
    getDetails,
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
import DiscoveriesContext from "../../contexts/DiscoveriesContext";

const libraries = ["places"];
const mapContainerStyle = {
    width: "100vw",
    height: "100%",
};
const centerHamburg = {
    lat: 53.551086,
    lng: 9.993682
}

const options = {
    styles: MapStyles,
    disableDefaultUI: true,
}

export default function AddNewDiscoveryMap(){

    const key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: key,
        libraries,
    });

    const [center, setCenter] = useState(centerHamburg)
    const {discoveries, setDiscoveries} = useContext(DiscoveriesContext);

//Gets PlaceId from latLng
    /*useEffect(() => {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${marker.lat},${marker.lng}&key=${key}`;
        axios
            .get(url)
            .then((response) => response.data)
            .then((data) => {
                const getPlaceId = data.results[0].formatted_address;
                setPlaceId(getPlaceId);
                console.log(placeId);
            })
            .catch(console.error);
    },[marker]);*/


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
            <Search panTo={panTo} center={center} setCenter={setCenter} setDiscoveries={setDiscoveries}/>
            <Locate panTo={panTo} setCenter={setCenter} />
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={14}
                center={center}
                options={options}
                onLoad={onMapLoad}
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


function Search({panTo, center, setCenter, setDiscoveries}) {
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
            const placeDetails = await getDetails({placeId: placeId, fields: ["name"]})
            const { lat, lng } = await getLatLng(results[0]);
            panTo({ lat, lng });
            console.log(placeDetails.name);

        } catch (error) {
            console.log("Error: ", error);
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
margin: 15px 0;
`

const ComboboxLayout = styled.div`
grid-column: 2;
justify-self: center;
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
