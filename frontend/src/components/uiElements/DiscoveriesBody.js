import React from "react";
import DiscoveryList from "./DiscoveryList";
import DiscoveryMap from "./maps/DiscoveryMap";
import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function DiscoveriesBody({ searchedDiscoveries, filters }) {
  const query = useQuery();
  const view = query.get("view");

  return (
    <>
      {view === "list" && (
        <DiscoveryList
          searchedDiscoveries={searchedDiscoveries}
          filters={filters}
        />
      )}
      {view === "map" && (
        <DiscoveryMap
          searchedDiscoveries={searchedDiscoveries}
          filters={filters}
        />
      )}
    </>
  );
}
