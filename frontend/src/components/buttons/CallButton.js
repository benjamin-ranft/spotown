import React from "react";
import {MdPhone} from "react-icons/md";
import styled from "styled-components/macro";

export default function CallButton(phoneNumber) {
    return(
        <Layout href={phoneNumber}>
            <CallIcon/>
            <p>Call</p>
        </Layout>
    )
}

const Layout = styled.button`
display: flex;
flex-direction: column;
align-items: center;
font-size: 12px;
`

const CallIcon = styled(MdPhone)`
color: var(--accent-green);
font-size: 30px;
`
