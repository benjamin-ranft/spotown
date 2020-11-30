import React, {useState} from "react";
import Header from "./Header";
import Footer from "./Footer";
import styled from "styled-components/macro";
import DiscoveriesBody from "./DiscoveriesBody";

export default function Discoveries(){

    const [headerAction, setHeaderAction] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState([]);
    const [footerAction, setFooterAction] = useState("list");

    return(
        <PageLayout>
            <Header headerAction={headerAction} setHeaderAction={setHeaderAction} setSearchTerm={setSearchTerm} setFilters={setFilters} filters={filters}/>
            <DiscoveriesBody footerAction={footerAction} searchTerm={searchTerm} filters={filters}/>
            <Footer footerAction={footerAction} setFooterAction={setFooterAction}/>
        </PageLayout>
    )
}

const PageLayout = styled.div`
display: grid;
grid-template-rows: min-content 1fr min-content;
height: 100vh;
`