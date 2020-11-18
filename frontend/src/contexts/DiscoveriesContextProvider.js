import React, { useContext, useEffect, useState } from 'react';
import {
    getDiscoveries,
} from '../service/DiscoveryService';
import UserContext from './UserContext';
import DiscoveriesContext from "./DiscoveriesContext";

export default function IdeasContextProvider({ children }) {
    const [discoveries, setDiscoveries] = useState([]);
    const { token, tokenIsValid } = useContext(UserContext);

    useEffect(() => {
        tokenIsValid() && getDiscoveries(token).then(setDiscoveries()).catch(console.log);
    }, [token, tokenIsValid]);

    return (
        <DiscoveriesContext.Provider value={{ discoveries }}>
            {children}
        </DiscoveriesContext.Provider>
    );
}