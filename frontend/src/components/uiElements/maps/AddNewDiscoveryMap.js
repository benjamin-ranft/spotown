import React, { useCallback, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { mapStyles } from "./mapStyles";
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
import { MdMyLocation } from "react-icons/md";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100vw",
  height: "100%",
};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
};

export default function AddNewDiscoveryMap({ center, setCenter, setPlaceId }) {
  const history = useHistory();
  const key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: key,
    version: "3.42.9",
    libraries,
  });

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
  }, [center, key, setPlaceId]);

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const handleDrag = () => {
    if (mapRef.current) {
      setCenter({
        lat: mapRef.current.center.lat(),
        lng: mapRef.current.center.lng(),
      });
    }
  };

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  if (loadError) return "Error loading map";
  if (!isLoaded) return "Loading Maps";

  return (
    <>
      <Search panTo={panTo} center={center} history={history} />
      <Locate panTo={panTo} setCenter={setCenter} />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={14}
        center={center}
        options={options}
        onLoad={onMapLoad}
        onDragEnd={handleDrag}
      >
        <Marker
          position={center}
          icon={{
            url: "../images/spotown_map_marker_add.png",
            scaledSize: new window.google.maps.Size(39, 63),
          }}
        />
      </GoogleMap>
    </>
  );
}

function Locate({ panTo, setCenter }) {
  return (
    <LocateLayout>
      <LocateButton
        onClick={() => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              panTo({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              });
              setCenter({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              });
            },
            () => null
          );
        }}
      >
        <LocateIcon />
      </LocateButton>
    </LocateLayout>
  );
}

function Search({ panTo, center, history }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => center.lat, lng: () => center.lng },
      radius: 500,
      types: ["establishment"],
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
      history.push("/new/confirm?place_id=" + placeId);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <SearchLayout>
      <SearchBox>
        <Combobox onSelect={handleSelect}>
          <SearchInput
            value={value}
            onChange={handleInput}
            disabled={!ready}
            placeholder="Search for location"
          />
          <ComboboxPopover>
            <ComboboxList>
              {status === "OK" &&
                data.map(({ place_id, description }) => (
                  <ComboboxOption key={place_id} value={description} />
                ))}
            </ComboboxList>
          </ComboboxPopover>
        </Combobox>
      </SearchBox>
    </SearchLayout>
  );
}

const SearchLayout = styled.section`
  display: grid;
  grid-template-columns: 23px 1fr 23px;
  padding: 10px;
`;

const SearchBox = styled.aside`
  grid-column: 2;
  justify-self: center;
  outline: none;
`;

const SearchInput = styled(ComboboxInput)`
  border-radius: 20px;
  background-color: var(--light-grey);
  border-color: transparent;
  padding: 5px 10px;
  width: 70vw;
  outline: none;
`;

const LocateLayout = styled.section`
  position: absolute;
  z-index: 10;
  right: 0;
`;

const LocateButton = styled.button`
  background-color: transparent;
  border-color: transparent;
  outline: none;
`;

const LocateIcon = styled(MdMyLocation)`
  font-size: 40px;
  background-color: white;
  border-width: thin;
  border-color: var(--light-grey);
  border-style: solid;
  padding: 5px;
  color: var(--accent-red);
  border-radius: 100px;
  box-shadow: var(--center-box-shadow);
`;
