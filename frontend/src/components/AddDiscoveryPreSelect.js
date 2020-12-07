import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import AddNewDiscoveryMap from "./discoveryMap/AddNewDiscoveryMap";
import styled from "styled-components/macro";
import {MdAddLocation, MdKeyboardArrowLeft} from "react-icons/md";

const centerHamburg = {
    lat: 53.551086,
    lng: 9.993682
}

export default function AddDiscoveryPreSelect(){

    const history = useHistory();
    const [center, setCenter] = useState(centerHamburg);
    const [placeId, setPlaceId] = useState("");
    const manualAddLink = "/new/confirm/?manual_place_id="+placeId;

    return(
        <StyledDiscoveryPage>
            <StyledAddHeader>
                <StyledBackButton onClick={handleGoBack}/>
                <h1>SELECT</h1>
            </StyledAddHeader>
            <StyledMapContainer>
                <AddNewDiscoveryMap center={center} setCenter={setCenter} setPlaceId={setPlaceId}/>
            </StyledMapContainer>
            <StyledOverlappingCard>
                <StyledLocationSuggestions/>
                <StyledManualAddButton href={manualAddLink}>
                    <ButtonLayout>
                        <StyledLocationPin/>
                        <p>Add something here</p>
                    </ButtonLayout>
                </StyledManualAddButton>
            </StyledOverlappingCard>

        </StyledDiscoveryPage>
    )

    function handleGoBack(){
        history.goBack();
    }
}

const StyledDiscoveryPage = styled.div`
display: grid;
grid-template-rows: 23px min-content 1fr min-content 23px;
height: 100vh;
grid-template-columns: 23px 1fr 23px;
`

const StyledMapContainer = styled.div`
grid-column-start: 1;
grid-column-end: 4;
grid-row: 3/5;
height: 100%;
`

const StyledOverlappingCard = styled.div`
grid-row-start: 4;
grid-row-end: 6;
grid-column-start: 1;
grid-column-end: 4;
display: grid;
grid-template-columns: 23px 1fr 23px;
grid-template-rows: min-content min-content 23px;
z-index: 10;
`

const StyledLocationSuggestions = styled.div`
grid-row: 1;
`

const StyledManualAddButton = styled.a`
grid-column: 2;
grid-row: 2;
justify-self: center;
background-color: white;
padding: 10px;
border-color: var(--dark-grey);
box-shadow: var(--center-box-shadow);
border-style: solid;
border-width: 2px;
border-radius: 10px;
text-decoration: none;
color: var(--dark-grey);
font-weight: bold;
align-items: center;
height: min-content;
width: 100%;
display: grid;
grid-template-rows: 1fr;
`

const ButtonLayout = styled.div`
display: grid;
grid-template-columns: 0.3fr 1fr;
grid-row: 1;
justify-self: center;
width: 80%;
align-items: center;
`

const StyledLocationPin = styled(MdAddLocation)`
color: var(--dark-grey);
font-size: 30px;
`

const StyledBackButton = styled(MdKeyboardArrowLeft)`
color: var(--darkest-grey);
font-size: 40px;
`

const StyledAddHeader = styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr;

align-items: center;
grid-column: 2;
grid-row: 2;

h1{
justify-self: center;
font-size: var(--size-xl);
}
`
