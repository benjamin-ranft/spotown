import React from "react";
import DiscoveryList from "./DiscoveryList";
import DiscoveryMap from "./discoveryMap/DiscoveryMap";

export default function DiscoveriesBody ({filteredDiscoveries, footerAction, searchTerm, filters}){

    return (
        <>
            {footerAction === "list" &&
            <DiscoveryList filteredDiscoveries={filteredDiscoveries} searchTerm={searchTerm} filters={filters}/>
            }
            {footerAction === "map" &&
            <DiscoveryMap filteredDiscoveries={filteredDiscoveries} searchTerm={searchTerm} filters={filters}/>
            }
        </>
    )
}