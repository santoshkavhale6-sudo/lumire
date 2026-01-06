import { getApiUrl } from '@/lib/api';

export const getSettings = async () => {
    const res = await fetch(getApiUrl('settings'));
    if (!res.ok) throw new Error('Failed to fetch settings');
    return res.json();
};

export const updateSettings = async (settingsData, token) => {
    const res = await fetch(getApiUrl('settings'), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(settingsData),
    });
    if (!res.ok) throw new Error('Failed to update settings');
    return res.json();
};
