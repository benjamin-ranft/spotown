import React from 'react';
import {useHistory} from "react-router-dom";
import styled from 'styled-components/macro';
import Discovery from "./Discovery";

export default function DiscoveryList({searchedDiscoveries, filters}) {

    const history = useHistory();
    const discoveries = searchedDiscoveries;
    const tags = filters;
    const filteredDiscoveries = discoveries.filter(d => d.tags.some(t => tags.includes(t)))

    console.log(filteredDiscoveries);
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