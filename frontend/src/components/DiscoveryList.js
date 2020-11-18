import React, { useContext } from 'react';
import styled from 'styled-components/macro';
import Discovery from "./Discovery";
import DiscoveriesContext from "../contexts/DiscoveriesContext";

export default function DiscoveryList() {
    const { discoveries } = useContext(DiscoveriesContext);

    return (
        <StyledList>
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
  margin: 0;
  padding: var(--size-l);

  list-style: none;

  display: grid;
  grid-auto-rows: min-content;
  gap: var(--size-l);
  
`;