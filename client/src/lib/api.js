const envUrl = process.env.NEXT_PUBLIC_API_URL;

// Ensure the URL ends with /api, unless it's the fallback localhost
export const API_BASE_URL = envUrl
    ? (envUrl.endsWith('/api') ? envUrl : `${envUrl.replace(/\/$/, '')}/api`)
    : 'http://localhost:5001/api';

export const getApiUrl = (endpoint) => {
    // Ensure no double slashes when joining base and endpoint
    const base = API_BASE_URL.replace(/\/$/, '');
    const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    return `${base}${path}`;
};
