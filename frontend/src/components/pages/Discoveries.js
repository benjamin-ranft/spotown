import React, { useContext, useState } from "react";
import Header from "../uiElements/Header";
import Footer from "../uiElements/Footer";
import styled from "styled-components/macro";
import DiscoveriesBody from "../uiElements/DiscoveriesBody";
import DiscoveriesContext from "../../contexts/DiscoveriesContext";

export default function Discoveries() {
  const { discoveries } = useContext(DiscoveriesContext);

  const [headerAction, setHeaderAction] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState("");

  //Live Search Logic
  const lowerCaseSearchTerm = searchTerm.toLowerCase();
  const searchedDiscoveries = discoveries.filter(
    (term) =>
      term.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      term.address.toLowerCase().includes(lowerCaseSearchTerm) ||
      term.notes.toLowerCase().includes(lowerCaseSearchTerm)
  );

  return (
    <Layout>
      <Header
        headerAction={headerAction}
        setHeaderAction={setHeaderAction}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setFilters={setFilters}
        filters={filters}
      />
      <DiscoveriesBody
        searchedDiscoveries={searchedDiscoveries}
        searchTerm={searchTerm}
        filters={filters}
      />
      <Footer />
    </Layout>
  );
}

const Layout = styled.main`
  display: grid;
  grid-template-rows: min-content 1fr min-content;
  height: 100%;
  height: -moz-available; /* WebKit-based browsers will ignore this. */
  height: -webkit-fill-available; /* Mozilla-based browsers will ignore this. */
  height: fill-available;
`;
