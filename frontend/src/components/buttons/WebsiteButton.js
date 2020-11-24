import React from "react";
import styled from "styled-components/macro";
import {VscGlobe} from "react-icons/all";

export default function WebsiteButton(webUrl) {
    return(
        <StyledWebsiteButton href={webUrl}>
            <StyledWebsiteIcon/>
            <p>Website</p>
        </StyledWebsiteButton>
    )
}

const StyledWebsiteButton = styled.div`
display: flex;
flex-direction: column;
align-items: center;
font-size: 12px;
`

const StyledWebsiteIcon = styled(VscGlobe)`
color: var(--accent-green);
font-size: 30px;
`