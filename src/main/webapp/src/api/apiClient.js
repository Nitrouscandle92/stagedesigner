import axios from 'axios';

// Base configuration for all backend requests
const apiClient = axios.create({
    baseURL: 'https://api.dev-node.app/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default apiClient;