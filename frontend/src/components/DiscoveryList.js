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
  padding: var(--size-l);
  width: 100%;

  list-style: none;
  marker: none;

  display: grid;
  grid-auto-rows: min-content;
  gap: var(--size-l);
  
  margin: 0;
  
  li:last-child:after {
  content: '';
  display: block;
  height: 40px;
}

`;