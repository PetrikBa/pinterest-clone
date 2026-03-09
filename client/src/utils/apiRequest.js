import axios from 'axios';

const apiRequest = axios.create({
    baseURL: import.meta.env.VITE_API_ENDPOINT,
    withCredentials: true, // Include cookies in requests
});

export default apiRequest;
