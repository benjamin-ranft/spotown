import React, { useContext, useEffect, useState } from 'react';
import {
    getDiscoveries,
    addDiscovery
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

    return (
        <DiscoveriesContext.Provider value={{discoveries,create}}>
            {children}
        </DiscoveriesContext.Provider>
    );
}