import React, {useContext, useEffect, useState} from "react";
import {useHistory, useLocation} from "react-router-dom";
import DiscoveriesContext from "../contexts/DiscoveriesContext";
import {MdKeyboardArrowLeft} from "react-icons/md";
import styled from "styled-components/macro";
import DiscoveryForm from "./DiscoveryForm";
import {getDetails} from "use-places-autocomplete";
import {useLoadScript} from "@react-google-maps/api";

function useQuery (){
    return new URLSearchParams(useLocation().search)
}

const initialState = {
    name: "",
    place_id:"",
    lat: "",
    lng: "",
    address: "",
    thumbnail: "https://benjaminranft.com/wp-content/uploads/2020/12/discovery_placeholder.png",
    phoneNumber: "",
    webUrl: "",
    directions: "",
    notes: "",
    tags: [],
}

export default function AddDiscoveryPage() {
    const key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    const libraries = ["places"];
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: key,
        libraries,
    });

    const query = useQuery();
    const placeId = query.get("place_id");
    const manualPlaceId = query.get("manual_place_id");
    const {create} = useContext(DiscoveriesContext);
    const history = useHistory();
    const [discoveryData, setDiscoveryData] = useState(initialState);
    const placeholder = "https://benjaminranft.com/wp-content/uploads/2020/12/discovery_placeholder.png";

    useEffect(() => {
        if(placeId && isLoaded){
            getDetails({placeId: placeId, fields: ["name", "place_id", "geometry.location", "formatted_address", "photos", "website", "international_phone_number",]})
                .then(data => setDiscoveryData({...discoveryData,
                    name: data.name,
                    place_id: data.place_id,
                    lat: data.geometry.location.lat,
                    lng: data.geometry.location.lng,
                    address: data.formatted_address,
                    thumbnail: data.photos[0].getUrl({maxWidth: 600, maxHeight: 600}),
                    phoneNumber: data.international_phone_number,
                    webUrl: data.website,
                    directions: "https://www.google.com/maps/dir/?api=1&destination=" + data.geometry.location.lat + "," + data.geometry.location.lng}))
        }
    }, [placeId, isLoaded]);

    useEffect(() => {
        if(manualPlaceId && isLoaded){
            getDetails({placeId: manualPlaceId, fields: ["name", "place_id", "geometry.location", "formatted_address", "photos", "website", "international_phone_number",]})
                .then(data => setDiscoveryData({...discoveryData,
                    place_id: data.place_id,
                    lat: data.geometry.location.lat,
                    lng: data.geometry.location.lng,
                    address: data.formatted_address,
                    directions: "https://www.google.com/maps/dir/?api=1&destination=" + data.geometry.location.lat + "," + data.geometry.location.lng}))
        }
    }, [manualPlaceId, isLoaded]);

    return(
        <StyledDiscoveryPage>
            {discoveryData.thumbnail && <ThumbnailBackground thumbnail={discoveryData.thumbnail}/>}
            <StyledAddHeader>
                {discoveryData.thumbnail !== placeholder&& <><WhiteBackButton onClick={handleGoBack}/> <WhiteAdd>ADD</WhiteAdd></>}
                {discoveryData.thumbnail === placeholder && <><DarkBackButton onClick={handleGoBack}/> <DarkAdd>ADD</DarkAdd></>}
            </StyledAddHeader>
            <FormBackgroundCard>
                <DiscoveryForm onSave={handleSave} discovery={discoveryData} setDiscovery={setDiscoveryData}/>
            </FormBackgroundCard>
        </StyledDiscoveryPage>
    )

    function handleGoBack(){
        history.goBack();
    }

    function handleSave(discovery){
        const {name, place_id, lat, lng, address, thumbnail, phoneNumber, webUrl, directions, notes, tags} = discovery;
        create(name, place_id, lat, lng, address, thumbnail, phoneNumber, webUrl, directions, notes, tags);
        history.push("/discoveries");
    }

}

const ThumbnailBackground = styled.div`
background-image: url(${(props) => props.thumbnail});
background-repeat: no-repeat;
background-size: cover;
margin-bottom: -20px;
grid-column: 1/4;
grid-row: 1/4;
`

const WhiteBackButton = styled(MdKeyboardArrowLeft)`
color: white;
font-size: 40px;
`
const DarkBackButton = styled(MdKeyboardArrowLeft)`
color: var(--darkest-grey);
font-size: 40px;
`

const StyledDiscoveryPage = styled.div`
display: grid;
grid-template-rows: 23px min-content 1fr 1fr;
height: 100vh;
grid-template-columns: 23px auto 23px;
`

const FormBackgroundCard = styled.div`
grid-column: 1/4;
background-color: var(--white);
box-shadow: var(--center-box-shadow);
padding: 23px;
border-radius: 25px 25px 0 0;
`

const StyledAddHeader = styled.div`
display:grid;
grid-template-columns: 1fr 1fr 1fr;

align-items: center;
grid-column-start: 2;
  grid-column-end: 2;
grid-row-start: 2;
`

const WhiteAdd = styled.h1`
justify-self: center;
color: white;
font-size: var(--size-xl);
`

const DarkAdd = styled.h1`
justify-self: center;
color: var(--darkest-grey);
font-size: var(--size-xl);
`