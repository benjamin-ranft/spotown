import React, { useContext, useEffect, useState } from 'react';
import {
    getDiscoveries,
    addDiscovery,
    updateDiscovery,
    removeDiscovery
} from '../service/DiscoveryService';
import UserContext from './UserContext';
import DiscoveriesContext from "./DiscoveriesContext";

export default function DiscoveriesContextProvider({ children }) {
    const [discoveries, setDiscoveries] = useState([]);
    const { token, tokenIsValid } = useContext(UserContext);

    useEffect(() => {
        tokenIsValid() && getDiscoveries(token).then(data => setDiscoveries(data)).catch(console.log);
    }, [token, tokenIsValid]);

    const create = (name, address, webUrl, phoneNumber, notes, tags) =>
        addDiscovery(name, address, webUrl, phoneNumber, notes, tags, token)
            .then((newDiscovery) => setDiscoveries([...discoveries, newDiscovery]))

    const update = (id, timestamp, name, address, thumbnail, openingHours, phoneNumber, webUrl, directions, notes, tags) => {
        updateDiscovery(id, timestamp, name, address, thumbnail, openingHours, phoneNumber, webUrl, directions, notes, tags, token)
            .then((updateDiscovery) => setDiscoveries([...discoveries.filter((discovery) => discovery.id !== updateDiscovery.id),updateDiscovery]));
    }

    const remove = (id) =>
        removeDiscovery(id, token)
            .then(() => setDiscoveries(discoveries.filter((discovery) => discovery.id !== id)));


    return (
        <DiscoveriesContext.Provider value={{discoveries,create, update, remove}}>
            {children}
        </DiscoveriesContext.Provider>
    );
}