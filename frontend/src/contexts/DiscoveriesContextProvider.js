import React, { useContext, useEffect, useState } from 'react';
import {
    getDiscoveries,
} from '../service/DiscoveryService';
import UserContext from './UserContext';
import DiscoveriesContext from "./DiscoveriesContext";

export default function DiscoveriesContextProvider({ children }) {
    const [discoveries, setDiscoveries] = useState([]);
    const { token, tokenIsValid } = useContext(UserContext);

    useEffect(() => {
        tokenIsValid() && getDiscoveries(token).then(data => setDiscoveries(data)).catch(console.log);
    }, [token, tokenIsValid]);

    return (
        <DiscoveriesContext.Provider value={{discoveries}}>
            {children}
        </DiscoveriesContext.Provider>
    );
}