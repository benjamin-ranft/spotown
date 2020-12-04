import React, {useCallback, useRef, useState} from "react";
import {GoogleMap, Marker, useLoadScript, InfoWindow} from "@react-google-maps/api";
import MapStyles from "./MapStyles";
import TimeAgo from "react-timeago/lib";
import styled from "styled-components/macro";

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

    const [markers, setMarkers] = useState([])
    const [selected, setSelected] = React.useState(null);

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
                onLoad={onMapLoad}
            >
                {markers.map((marker) => (
               <Marker
                   key={marker.time.toISOString()}
                   position={{lat:marker.lat, lng: marker.lng}}
                   onClick={() => {
                       setSelected(marker);
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
                        <div>
                            <StyledThumbnail>
                                <img src={selected.thumbnail} alt={selected.name}/>
                            </StyledThumbnail>
                            <StyledDiscoveryContentShort>
                                <NameAndAddress>
                                    <h2>{selected.name}</h2>
                                    <p>{selected.address}</p>
                                </NameAndAddress>
                                <CreationDate>
                                    <p>
                                        <TimeAgo date={selected.timestamp}/>
                                    </p>
                                </CreationDate>
                            </StyledDiscoveryContentShort>
                        </div>
                    </InfoWindow>
                ) : null}
            </GoogleMap>
        </>
    )
}

const StyledThumbnail = styled.div`
border-radius: 10px 10px 0 0;
height: 140px;

img{
object-fit: cover;
border-radius: 10px 10px 0 0;
height: 100%;
width: 100%;
}
`

const StyledDiscoveryContentShort = styled.div`
display: grid;
grid-template-columns: 3fr 1fr;
padding: 15px;

  h2{
  font-size: var(--size-lplus);
  }
  
  p{
  font-size: var(--size-m);
  }
`

const NameAndAddress = styled.div`

`

const CreationDate = styled.div`
justify-self: right;
p{
font-size: var(--size-m);
}
`