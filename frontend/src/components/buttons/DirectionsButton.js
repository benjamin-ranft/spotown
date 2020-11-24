import React from "react";
import {MdDirections} from "react-icons/all";
import styled from "styled-components/macro";

export default function DirectionsButton(directionsUrl) {
    return(
        <StyledDirectionsButton href={directionsUrl}>
            <StyledDirectionsIcon/>
            <p>Directions</p>
        </StyledDirectionsButton>
    )
}

const StyledDirectionsButton = styled.div`
display: flex;
flex-direction: column;
align-items: center;
font-size: 12px;
`

const StyledDirectionsIcon = styled(MdDirections)`
color: var(--accent-green);
font-size: 30px;
`