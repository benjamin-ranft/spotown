import React from "react";
import DiscoveryList from "./DiscoveryList";
import DiscoveryMap from "./discoveryMap/DiscoveryMap";

export default function DiscoveriesBody ({searchedDiscoveries, footerAction, searchTerm, filters}){

    return (
        <>
            {footerAction === "list" &&
            <DiscoveryList searchedDiscoveries={searchedDiscoveries} filters={filters}/>
            }
            {footerAction === "map" &&
            <DiscoveryMap searchedDiscoveries={searchedDiscoveries} searchTerm={searchTerm} filters={filters}/>
            }
        </>
    )
}