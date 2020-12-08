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
                    <LinkShareContainer href={"https://www.google.com/maps/search/?api=1&query=Google&query_place_id=" + discovery.place_id}>
                        <StyledShareButton/>
                    </LinkShareContainer>
                </StyledDetailsHeader>
            </StyledThumbnailSection>
            <StyledDetailsCard>
                <AddressAndActionButtons>
                    <StyledAddressSection>
                        <StyledLocationIcon/>
                        <StyledAddress>{discovery.address}</StyledAddress>
                    </StyledAddressSection>
                    <StyledActionButtons id={id}/>
                </AddressAndActionButtons>
                <StyledTitleHoursSection>
                    <StyledDiscoveryName>{discovery.name.substring(0, 50)}</StyledDiscoveryName>
                </StyledTitleHoursSection>
                <StyledNavLinks>
                    <a href={discovery.directions}>
                        <DirectionsButton/>
                    </a>
                    <a href={"tel:" + discovery.phoneNumber}>
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
background-position: center;
`

const StyledDetailsCard = styled.div`
display: grid;
grid-template-rows: repeat(4 1fr);
grid-row-gap: 12px;
grid-row-start: 2;
background-color: var(--white);
border-radius: 25px 25px 0 0;
box-shadow: var(--center-box-shadow);
padding: 20px;
min-height: 40vh;
`

const StyledTitleHoursSection = styled.div`
grid-row: 2;
display: flex;
flex-direction: column;
`
const StyledDiscoveryName = styled.h2`
font-size: var(--size-lplus);
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
align-items: center;
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
grid-column: 1/2;
grid-row: 4;
`


const StyledBackButton = styled(MdKeyboardArrowLeft)`
color: var(--white);
font-size: 40px;
justify-self: left;
grid-column: 2;
grid-row: 2;
`
const LinkShareContainer = styled.a`
grid-column: 3;
grid-row: 2;
justify-self: right;
`
const StyledShareButton = styled(MdShare)`
color: var(--white);
font-size: 32px;
`




