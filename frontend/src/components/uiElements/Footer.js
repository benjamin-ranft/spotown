import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { MdList, MdExplore } from "react-icons/md";
import styled from "styled-components/macro";
import AddIcon from "../icons/AddIcon";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Footer() {
  const history = useHistory();
  const query = useQuery();
  const view = query.get("view");

  return (
    <Layout>
      <ListIcon onClick={handleListClick} view={view} />
      <LayoutContainer>
        <AddIcon />
      </LayoutContainer>
      <MapIcon onClick={handleMapClick} view={view} />
    </Layout>
  );

  function handleListClick() {
    history.push("/discoveries?view=list");
  }

  function handleMapClick() {
    history.push("/discoveries?view=map");
  }
}

const Layout = styled.main`
  display: grid;
  grid-gap: 30px;
  position: fixed;
  bottom: 0;
  width: 100%;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 50px;
  background-color: var(--white);
  align-items: center;
  justify-items: center;
  max-height: 50px;
  box-shadow: 0px -1px 9px 0px rgba(0, 0, 0, 0.37);
`;

const ListIcon = styled(MdList)`
  font-size: 35px;
  color: ${(props) =>
    props.view === "list" ? "var(--accent-red)" : "var(--dark-grey)"};
`;

const LayoutContainer = styled.aside`
  position: absolute;
  bottom: 5px;
  left: auto;
  right: auto;
`;

const MapIcon = styled(MdExplore)`
  font-size: 35px;
  color: ${(props) =>
    props.view === "map" ? "var(--accent-red)" : "var(--dark-grey)"};
`;
