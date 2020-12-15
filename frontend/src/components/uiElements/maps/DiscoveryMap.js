import React, {useCallback, useEffect, useRef, useState} from "react";
import { useHistory } from "react-router-dom";
import {
  GoogleMap,
  Marker,
  useLoadScript,
  InfoWindow,
} from "@react-google-maps/api";
import { mapStyles } from "./mapStyles";
import TimeAgo from "react-timeago/lib";
import styled from "styled-components/macro";
import { MdMyLocation } from "react-icons/md";
import {getDetails} from "use-places-autocomplete";

const libraries = ["places"];

const mapContainerStyle = {
  width: "100vw",
  height: "100%",
};
const center = {
  lat: 53.551086,
  lng: 9.993682,
};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
};
const key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

export default function DiscoveryMap({ searchedDiscoveries, filters }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: key,
    version: "3.42.9",
    libraries,
  });

  const history = useHistory();
  const discoveries = searchedDiscoveries
    .map((discovery) => discovery)
    .reverse();
  const tags = filters;
  const filteredDiscoveries = discoveries.filter((d) =>
    d.tags.some((t) => tags.includes(t))
  );
  const [selected, setSelected] = useState(null);
  const placeId = selected?.place_id;
  const [thumbnail, setThumbnail] = useState("../images/discovery_placeholder.png");

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  useEffect(() => {
    if (placeId === "manual_place_id" && isLoaded){
      setThumbnail("/images/discovery_placeholder.png")
    }
    else if (placeId && placeId !== "manual_place_id" && isLoaded) {
      getDetails({placeId: placeId,
        fields:[
          "photos",
        ],
      }).then((data) =>
          setThumbnail(
              data.photos[0].getUrl({ maxWidth: 600, maxHeight: 600 })
          )
      )
    }
    // eslint-disable-next-line
  }, [placeId, isLoaded]);

  if (loadError) return "Error loading map";
  if (!isLoaded) return "Loading Maps";

  return (
    <Layout>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
        options={options}
        onLoad={onMapLoad}
      >
        <Locate panTo={panTo} />
        {filters.length > "0"
          ? filteredDiscoveries.map((discovery) => (
              <Marker
                key={discovery.id}
                position={{ lat: discovery.lat, lng: discovery.lng }}
                icon={{
                  url: "./images/spotown_map_marker.png",
                  scaledSize: new window.google.maps.Size(32, 52),
                }}
                onClick={() => {
                  setSelected(discovery);
                }}
              />
            ))
          : discoveries?.map((discovery) => (
              <Marker
                key={discovery.id}
                position={{ lat: discovery.lat, lng: discovery.lng }}
                icon={{
                  url: "./images/spotown_map_marker.png",
                  scaledSize: new window.google.maps.Size(32, 52),
                }}
                onClick={() => {
                  setSelected(discovery);
                }}
              />
            ))}

        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <InfoLayout
              onClick={() => {
                history.push("/discovery/" + selected.id);
              }}
            >
              <Thumbnail>
                <img src={thumbnail} alt={selected.name} />
              </Thumbnail>
              <InfoContent>
                <NameAndAddress>
                  <h2>{selected.name.substring(0, 35)}</h2>
                  <p>{selected.address}</p>
                </NameAndAddress>
                <CreationDate>
                  <p>
                    <TimeAgo date={selected.timestamp} />
                  </p>
                </CreationDate>
              </InfoContent>
            </InfoLayout>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </Layout>
  );
}

function Locate({ panTo }) {
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
            },
            () => null
          );
        }}
      >
        <LocatorIcon />
      </LocateButton>
    </LocateLayout>
  );
}

const Layout = styled.main`
  height: fill-available;
  height: -moz-available; /* WebKit-based browsers will ignore this. */
  height: -webkit-fill-available; /* Mozilla-based browsers will ignore this. */
  top: 70px;
  height: calc(100vh - 120px);
  bottom: 70px;
  position: fixed;
`;

const Thumbnail = styled.aside`
  border-radius: 10px 10px 0 0;
  height: 140px;

  img {
    object-fit: cover;
    border-radius: 10px 10px 0 0;
    height: 100%;
    width: 100%;
  }
`;

const InfoContent = styled.div`
  padding-top: 8px;
  display: grid;
  grid-template-rows: min-content min-content;
  grid-template-columns: 3fr 1fr;

  h2 {
    font-size: var(--size-l);
    padding-bottom: 5px;
  }

  p {
    font-size: var(--size-m);
  }
`;

const NameAndAddress = styled.div`
  h2 {
    grid-row: 1;
    grid-column: 1;
  }
  p {
    grid-row: 2;
    grid-column: 1/3;
  }
`;

const InfoLayout = styled.a``;

const CreationDate = styled.div`
  grid-row: 1;
  justify-self: right;
  grid-column: 2;

  p {
    font-size: var(--size-m);
    text-align: right;
  }
`;

const LocateLayout = styled.div`
  position: absolute;
  z-index: 10;
  right: 0;
`;

const LocateButton = styled.button`
  background-color: transparent;
  border-color: transparent;
  outline: none;
`;

const LocatorIcon = styled(MdMyLocation)`
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
