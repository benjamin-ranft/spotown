import React, {useState} from "react";
import Header from "./Header";
import DiscoveryList from "./DiscoveryList";
import Footer from "./Footer";
import styled from "styled-components/macro";

export default function Discoveries(){

    const [headerAction, setHeaderAction] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState([])

    return(
        <PageLayout>
            <Header headerAction={headerAction} setHeaderAction={setHeaderAction} setSearchTerm={setSearchTerm} setFilters={setFilters} filters={filters}/>
            <DiscoveryList searchTerm={searchTerm} filters={filters}/>
            <Footer/>
        </PageLayout>
    )
}

const PageLayout = styled.div`
display: grid;
grid-template-rows: min-content 1fr min-content;
height: 100vh;
`