import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components/macro";
import Discovery from "./Discovery";

export default function DiscoveryList({ searchedDiscoveries, filters }) {
  const history = useHistory();
  const discoveries = searchedDiscoveries
    .map((discovery) => discovery)
    .reverse();
  const tags = filters;
  const filteredDiscoveries = discoveries.filter((d) =>
    d.tags.some((t) => tags.includes(t))
  );

  return (
    <List>
      {filters.length > 0
        ? filteredDiscoveries?.map((discovery) => (
            <li key={discovery.id}>
              <div onClick={() => history.push(`/discovery/${discovery.id}`)}>
                <Discovery discovery={discovery} />
              </div>
            </li>
          ))
        : discoveries?.map((discovery) => (
            <li key={discovery.id}>
              <div onClick={() => history.push(`/discovery/${discovery.id}`)}>
                <Discovery discovery={discovery} />
              </div>
            </li>
          ))}
    </List>
  );
}

const List = styled.ul`
  overflow: scroll;
  padding: var(--size-l);
  width: 100%;
  flex-direction: row-reverse;
  list-style: none;
  marker: none;
  display: grid;
  grid-auto-rows: min-content;
  gap: var(--size-l);
  margin-top: 70px;

  li:last-child:after {
    content: "";
    display: block;
    height: 40px;
  }
`;
