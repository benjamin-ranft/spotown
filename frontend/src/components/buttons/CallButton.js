import React from "react";
import {MdPhone} from "react-icons/all";
import styled from "styled-components/macro";

export default function CallButton(phoneNumber) {
    return(
        <StyledCallButton href={phoneNumber}>
            <StyledCallIcon/>
            <p>Call</p>
        </StyledCallButton>
    )
}

const StyledCallButton = styled.div`
display: flex;
flex-direction: column;
align-items: center;
font-size: 12px;
`

const StyledCallIcon = styled(MdPhone)`
color: var(--accent-green);
font-size: 30px;
`
