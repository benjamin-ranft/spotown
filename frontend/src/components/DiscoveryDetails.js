import React, {useContext} from "react";
import {useParams, useHistory} from "react-router-dom";
import styled from "styled-components/macro";
import {MdKeyboardArrowLeft, MdShare} from "react-icons/md";
import DiscoveriesContext from "../contexts/DiscoveriesContext";
import ActionButtons from "./buttons/ActionButtons";
import DirectionsButton from "./buttons/DirectionsButton";
import CallButton from "./buttons/CallButton";
import WebsiteButton from "./buttons/WebsiteButton";
import {VscLocation} from "react-icons/all";

export default function DiscoveryDetails(){
    const {discoveries} = useContext(DiscoveriesContext);
    const {id} = useParams();
    const history = useHistory();
    const discovery = discoveries.find((discovery)=> discovery.id === id);


    return !discovery ? null : (
        <StyledDetailsPage>
            <StyledThumbnailSection thumbnail={discovery.thumbnail}>
                <StyledDetailsHeader>
                    <StyledBackButton onClick={handleCancel}/>
                    <StyledShareButton/>
                </StyledDetailsHeader>
            </StyledThumbnailSection>
            <StyledDetailsCard>
                <AddressAndActionButtons>
                    <StyledAddressSection>
                        <StyledLocationIcon/>
                        <StyledAddress>{discovery.address}</StyledAddress>
                    </StyledAddressSection>
                    <StyledActionButtons/>
                </AddressAndActionButtons>
                <StyledTitleHoursSection>
                    <StyledDiscoveryName>{discovery.name}</StyledDiscoveryName>
                    <StyledOpeningHours>{discovery.openingHours}</StyledOpeningHours>
                </StyledTitleHoursSection>
                <StyledNavLinks>
                    <a href={discovery.directions}>
                        <DirectionsButton/>
                    </a>
                    <a href={discovery.phoneNumber}>
                        <CallButton/>
                    </a>
                    <a href={discovery.webUrl}>
                        <WebsiteButton/>
                    </a>
                </StyledNavLinks>
                <StyledNotesSection>
                    <h3>Notes</h3>
                    <p>{discovery.notes}</p>
                </StyledNotesSection>
            </StyledDetailsCard>
        </StyledDetailsPage>
    )

    function handleCancel(){
        history.goBack();
    }
}

const StyledDetailsPage = styled.div`
display: grid;
grid-template-rows: 1fr min-content;
grid-template-columns: 100%;
height: 100vh;

`
const StyledDetailsHeader = styled.div`
background-image: linear-gradient(rgba(0,0,0,0.8), transparent);
grid-row: 1;
display: grid;
grid-template-columns: 23px 1fr 1fr 23px;
grid-template-rows: 23px 1fr;
`

const StyledThumbnailSection = styled.div`
background-image: url(${(props) => props.thumbnail});
background-repeat: no-repeat;
background-size: cover;
margin-bottom: -20px;
`

const StyledDetailsCard = styled.div`
display: grid;
grid-template-rows: repeat(4 1fr);
grid-row-gap: 12px;
background-color: var(--white);
border-radius: 25px 25px 0 0;
box-shadow: var(--center-box-shadow);
grid-row-start: 2;
padding: 20px;
min-height: 40vh;
`

const StyledTitleHoursSection = styled.div`
grid-row: 2;
display: flex;
flex-direction: column;
`
const StyledDiscoveryName = styled.h2`
`

const StyledOpeningHours = styled.p`
font-size: var(--size-m);
`
const AddressAndActionButtons = styled.div`
grid-row: 1;
display: grid;
grid-template-columns: 1fr 0.3fr;
align-items: center;
`

const StyledAddressSection = styled.div`
display: flex;
flex-direction: row;

`

const StyledLocationIcon = styled(VscLocation)`
font-size: 20px;
color: var(--darkest-grey);
`

const StyledAddress = styled.p`
font-size: var(--size-m);
`

const StyledActionButtons = styled(ActionButtons) `
justify-self: right;
`

const StyledNavLinks = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
gap: 16px;

a {
  color: var(--darkest-grey);
  text-decoration: none; 
}
`

const StyledNotesSection = styled.div`
display: block;
grid-column-start: 1;
grid-column-end: 2;
grid-row: 4;
`


const StyledBackButton = styled(MdKeyboardArrowLeft)`
color: var(--white);
font-size: 40px;
justify-self: left;
grid-column: 2;
grid-row: 2;
`

const StyledShareButton = styled(MdShare)`
color: var(--white);
font-size: 32px;
justify-self: right;
grid-column: 3;
grid-row: 2;
`




