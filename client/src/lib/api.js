export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5003/api';

export const getApiUrl = (endpoint) => {
    // Ensure no double slashes
    const base = API_BASE_URL.replace(/\/$/, '');
    const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    return `${base}${path}`;
};
