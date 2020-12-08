import React, {useCallback, useContext, useRef} from "react";
import {GoogleMap, Marker, useLoadScript, InfoWindow} from "@react-google-maps/api";
import {mapStyles} from "./mapStyles";
import TimeAgo from "react-timeago/lib";
import styled from "styled-components/macro";
import DiscoveriesContext from "../../contexts/DiscoveriesContext";
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
    styles: mapStyles,
    disableDefaultUI: true,
}
const key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

export default function DiscoveryMap(){

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: key, version:'3.42.9',
        libraries,
    });

    const {discoveries} = useContext(DiscoveriesContext);
    const [selected, setSelected] = React.useState(null);

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
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={12}
                center={center}
                options={options}
                onLoad={onMapLoad}
            >
            <Locate panTo={panTo}/>
                {discoveries.map((discovery) => (
               <StyledMarker
                   key={discovery.id}
                   position={{lat: discovery.lat, lng: discovery.lng}}
                   icon={{
                       url: "./images/spotown_map_marker.png",
                       scaledSize: new window.google.maps.Size(32,52),
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

function Locate({ panTo }) {
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

const StyledMarker = styled(Marker)`

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