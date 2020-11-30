import React from "react";
import DiscoveryList from "./DiscoveryList";
import DiscoveryMap from "./discoveryMap/DiscoveryMap";

export default function DiscoveriesBody ({footerAction, searchTerm, filters}){

    return (
        <>
            {footerAction === "list" &&
            <DiscoveryList searchTerm={searchTerm} filters={filters}/>
            }
            {footerAction === "map" &&
            <DiscoveryMap searchTerm={searchTerm} filters={filters}/>
            }
        </>
    )
}