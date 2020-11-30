import React, {useContext, useState} from "react";
import Header from "./Header";
import Footer from "./Footer";
import styled from "styled-components/macro";
import DiscoveriesBody from "./DiscoveriesBody";
import DiscoveriesContext from "../contexts/DiscoveriesContext";

export default function Discoveries(){

    const {discoveries} = useContext(DiscoveriesContext);

    const [headerAction, setHeaderAction] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState([""]);
    const [footerAction, setFooterAction] = useState("list");

    //Live Search Logic
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const searchedDiscoveries = discoveries.filter((term) =>
        (term.name.toLowerCase().includes(lowerCaseSearchTerm)) ||
        (term.address.toLowerCase().includes(lowerCaseSearchTerm)) ||
        (term.phoneNumber.toLowerCase().includes(lowerCaseSearchTerm)) ||
        (term.notes.toLowerCase().includes(lowerCaseSearchTerm))
    )
    console.log(searchedDiscoveries);

    return(
        <PageLayout>
            <Header headerAction={headerAction} setHeaderAction={setHeaderAction} searchTerm={searchTerm} setSearchTerm={setSearchTerm} setFilters={setFilters} filters={filters}/>
            <DiscoveriesBody searchedDiscoveries={searchedDiscoveries} footerAction={footerAction} searchTerm={searchTerm} filters={filters}/>
            <Footer footerAction={footerAction} setFooterAction={setFooterAction}/>
        </PageLayout>
    )
}

const PageLayout = styled.div`
display: grid;
grid-template-rows: min-content 1fr min-content;
height: 100vh;
`