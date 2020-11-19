import React from "react";
import Header from "./Header";
import DiscoveryList from "./DiscoveryList";
import Footer from "./Footer";
import styled from "styled-components/macro";

export default function Discoveries(){
    return(
        <PageLayout>
            <Header/>
            <DiscoveryList/>
            <Footer/>
        </PageLayout>
    )
}

const PageLayout = styled.div`
display: grid;
grid-template-rows: min-content 1fr min-content;
height: 100vh;
`