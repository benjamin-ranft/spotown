import React from "react";
import styled from "styled-components/macro";
import {VscGlobe} from "react-icons/vsc";

export default function WebsiteButton(webUrl) {
    return(
        <Layout href={webUrl}>
            <WebsiteIcon/>
            <p>Website</p>
        </Layout>
    )
}

const Layout = styled.button`
display: flex;
flex-direction: column;
align-items: center;
font-size: 12px;
`

const WebsiteIcon = styled(VscGlobe)`
color: var(--accent-green);
font-size: 30px;
`