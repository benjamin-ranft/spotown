import React, { useContext, useEffect, useState } from "react";
import {
  getDiscoveries,
  addDiscovery,
  updateDiscovery,
  removeDiscovery,
} from "../service/discoveryService";
import UserContext from "./UserContext";
import DiscoveriesContext from "./DiscoveriesContext";

export default function DiscoveriesContextProvider({ children }) {
  const [discoveries, setDiscoveries] = useState([]);
  const { token, tokenIsValid } = useContext(UserContext);

  useEffect(() => {
    tokenIsValid() &&
      getDiscoveries(token)
        .then((data) => setDiscoveries(data))
        .catch(console.log);
  }, [token, tokenIsValid]);

  const create = (
    name,
    place_id,
    lat,
    lng,
    address,
    thumbnail,
    phoneNumber,
    webUrl,
    directions,
    notes,
    tags
  ) =>
    addDiscovery(
      name,
      place_id,
      lat,
      lng,
      address,
      thumbnail,
      phoneNumber,
      webUrl,
      directions,
      notes,
      tags,
      token
    ).then((newDiscovery) => setDiscoveries([...discoveries, newDiscovery]));

  const update = (
    id,
    timestamp,
    name,
    place_id,
    lat,
    lng,
    address,
    thumbnail,
    phoneNumber,
    webUrl,
    directions,
    notes,
    tags
  ) => {
    updateDiscovery(
      id,
      timestamp,
      name,
      place_id,
      lat,
      lng,
      address,
      thumbnail,
      phoneNumber,
      webUrl,
      directions,
      notes,
      tags,
      token
    ).then((updateDiscovery) =>
      setDiscoveries([
        ...discoveries.filter(
          (discovery) => discovery.id !== updateDiscovery.id
        ),
        updateDiscovery,
      ])
    );
  };

  const remove = (id) =>
    removeDiscovery(id, token).then(() =>
      setDiscoveries(discoveries.filter((discovery) => discovery.id !== id))
    );

  return (
    <DiscoveriesContext.Provider
      value={{ discoveries, setDiscoveries, create, update, remove }}
    >
      {children}
    </DiscoveriesContext.Provider>
  );
}
