import React from "react";
import {MdDirections} from "react-icons/md";
import styled from "styled-components/macro";

export default function DirectionsButton(directionsUrl) {
    return(
        <Layout href={directionsUrl}>
            <DirectionsIcon/>
            <p>Directions</p>
        </Layout>
    )
}

const Layout = styled.button`
display: flex;
flex-direction: column;
align-items: center;
font-size: 12px;
`

const DirectionsIcon = styled(MdDirections)`
color: var(--accent-green);
font-size: 30px;
`