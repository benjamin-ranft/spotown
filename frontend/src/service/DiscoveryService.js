import axios from 'axios';

const header = (token) => ({
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

export const getDiscoveries = (token) =>
    axios.get('/api/discoveries', header(token)).then((response) => response.data);