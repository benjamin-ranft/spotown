import React, {useContext, useHistory} from "react";
import {useParams} from "react-router-dom";
import styled from "styled-components/macro";
import {MdKeyboardArrowLeft, MdShare} from "react-icons/md";
import DiscoveriesContext from "../contexts/DiscoveriesContext";
import ActionButtons from "./buttons/ActionButtons";
import DirectionsButton from "./buttons/DirectionsButton";
import CallButton from "./buttons/CallButton";
import WebsiteButton from "./buttons/WebsiteButton";

export default function DiscoveryDetails(){
    const {discoveryData} = useContext(DiscoveriesContext);
    const {id} = useParams();
    const history = useHistory();
    const discovery = discoveryData.find((discovery)=> discovery.id === id);
    return !discovery ? null : (
        <StyledDetailsPage>
            <StyledDetailsHeader>
                <StyledBackButton onClick={handleCancel}/>
                <StyledShareButton/>
            </StyledDetailsHeader>
            <StyledDiscoveryThumbnail src={discovery.thumbnail}/>
            <StyledDetailsCard>
                <AddressAndActionButtons>
                    <StyledAddress>{discovery.address}</StyledAddress>
                    <ActionButtons/>
                </AddressAndActionButtons>
                <h2>{discovery.name}</h2>
                <p>{discovery.openingHours}</p>
                <StyledLinks>
                    <DirectionsButton/>
                    <CallButton phoneNumber={discovery.phoneNumber}/>
                    <WebsiteButton webUrl={discovery.webUrl}/>
                </StyledLinks>
                <h3>Notes</h3>
                <p>{discovery.notes}</p>
            </StyledDetailsCard>
        </StyledDetailsPage>
    )

    function handleCancel(){
        history.goBack();
    }
}

const StyledDetailsPage = styled.div`

`
const StyledDetailsHeader = styled.div`
background-image: linear-gradient(black, transparent);
`

const StyledDetailsCard = styled.div`
background-color: var(--white);
border-radius: 10px 0;
box-shadow: var(--center-box-shadow);
`

const StyledLinks = styled.div`

`

const AddressAndActionButtons = styled.div`

`

const StyledAddress = styled.p`

`

const StyledBackButton = styled(MdKeyboardArrowLeft)`
color: var(--white);
font-size: 40px;
justify-self: left;
`

const StyledShareButton = styled(MdShare)`
color: var(--white);
font-size: 40px;
justify-self: right;
`

const StyledDiscoveryThumbnail = styled.img`
display: block;
width: 100%;
`


