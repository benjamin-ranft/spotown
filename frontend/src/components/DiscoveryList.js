import React from 'react';
import {useHistory} from "react-router-dom";
import styled from 'styled-components/macro';
import Discovery from "./Discovery";

export default function DiscoveryList({filteredDiscoveries}) {

    const history = useHistory();

    return (
        <StyledList>
            {filteredDiscoveries?.map((discovery) => (
                <li key={discovery.id}>
                    <div onClick={() => history.push(`/discovery/${discovery.id}`)}>
                        <Discovery discovery={discovery}/>
                    </div>
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