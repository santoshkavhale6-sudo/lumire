"use client";

import { useEffect, useRef } from 'react';
import { getApiUrl } from './api';

// Legacy Mapping
const heritageCopy = {
    'ADD_TO_CART': 'Secure This Memory',
    'BUY_NOW': 'Initiate Your Legacy',
    'CHECKOUT': 'Commence Acquisition',
    'OUT_OF_STOCK': 'Currently in the Atelier',
    'WISHLIST_ADD': 'Save to Heritage',
    'ABANDON_MESSAGE': 'Some stories are too precious to be left unfinished.'
};

export const getLegacyText = (key) => heritageCopy[key] || key;

export const usePersuasionTracking = (user) => {
    const lastScrollPos = useRef(0);

    const logBehavior = async (eventType, metadata = {}) => {
        if (!user?.token) return;

        try {
            await fetch(getApiUrl('persuasion/log'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({
                    eventType,
                    metadata,
                    clientInfo: {
                        device: navigator.userAgent.includes('Mobi') ? 'Mobile' : 'Desktop',
                        browser: navigator.userAgent
                    }
                })
            });
        } catch (err) {
            console.error("Persuasion Log Error:", err);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;
            const depth = (currentScroll / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

            if (Math.abs(currentScroll - lastScrollPos.current) > 500) {
                logBehavior('SCROLL_DEPTH', { depthPercentage: Math.round(depth) });
                lastScrollPos.current = currentScroll;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [user]);

    return { logBehavior };
};
