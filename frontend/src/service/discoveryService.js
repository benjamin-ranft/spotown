import axios from "axios";

const header = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const getDiscoveries = (token) =>
  axios
    .get("/api/discoveries", header(token))
    .then((response) => response.data);

export const addDiscovery = (
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
) =>
  axios
    .post(
      "/api/discoveries",
      {
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
      },
      header(token)
    )
    .then((response) => response.data);

export const updateDiscovery = (
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
) =>
  axios
    .put(
      "/api/discoveries/" + id,
      {
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
        token,
      },
      header(token)
    )
    .then((response) => response.data);

export const removeDiscovery = (id, token) =>
  axios.delete("/api/discoveries/" + id, header(token));
