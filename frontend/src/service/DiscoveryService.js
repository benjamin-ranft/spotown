import axios from 'axios';

const header = (token) => ({
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

export const getDiscoveries = (token) =>
    axios.get('/api/discoveries', header(token)).then((response) => response.data);

export const addDiscovery = (name, address, webUrl, phoneNumber, notes, tags, token) =>
    axios.post("/api/discoveries", {name, address, webUrl, phoneNumber, notes, tags}, header(token))
        .then((response) => response.data);