import React, { useContext } from 'react';
import styled from 'styled-components/macro';
import Discovery from "./Discovery";
import DiscoveriesContext from "../contexts/DiscoveriesContext";

export default function DiscoveryList() {
    const {discoveries} = useContext(DiscoveriesContext);

    return (
        <StyledList>
            {console.log(discoveries)}
            {discoveries?.map((discovery) => (
                <li key={discovery.id}>
                    <Discovery
                        discovery={discovery}
                    />
                </li>
            ))}
        </StyledList>
    );
}

const StyledList = styled.ul`
  overflow: scroll;
  margin-top: 70px;
  padding: var(--size-l);
  width: 100%;

  list-style: none;
  marker: none;

  display: grid;
  grid-auto-rows: min-content;
  gap: var(--size-l);

`;