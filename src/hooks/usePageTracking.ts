import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
    interface Window {
        gtag?: (key: string, trackingId: string, config: any) => void;
    }
}

export const usePageTracking = () => {
    const location = useLocation();

    useEffect(() => {
        if (window.gtag) {
            window.gtag('config', 'G-XXXXXXXXXX', { // Replace with actual Measurement ID if available, or rely on global config
                page_path: location.pathname + location.search,
            });
        } else {
            console.log('Page tracking event:', location.pathname + location.search);
        }
    }, [location]);
};
