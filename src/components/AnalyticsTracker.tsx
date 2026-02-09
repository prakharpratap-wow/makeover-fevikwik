import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackEvent, ANALYTICS_CATEGORIES, ANALYTICS_ACTIONS } from '../services/analytics'; // Use trackEvent directly

const AnalyticsTracker = () => {
    const location = useLocation();

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            const target = event.target as HTMLElement;

            // Find the closest clickable element (button, link, or element with role="button")
            const clickable = target.closest('button, a, [role="button"], input[type="submit"], input[type="button"]');

            if (clickable) {
                let label = '';

                // Try to get meaningful label
                if (clickable.getAttribute('aria-label')) {
                    label = clickable.getAttribute('aria-label') || '';
                } else if (clickable.id) {
                    label = clickable.id;
                } else if ((clickable as HTMLElement).innerText) {
                    label = (clickable as HTMLElement).innerText.substring(0, 50); // Limit length
                } else if ((clickable as HTMLInputElement).value) {
                    label = (clickable as HTMLInputElement).value;
                }

                // Keep label clean
                label = label.trim();

                if (label) {
                    // Use a generic category/action for auto-tracked events, or separate them
                    // tracking as 'Auto_Interaction' to distinguish from manual instrumentation
                    trackEvent('Auto_Interaction', ANALYTICS_ACTIONS.CLICK, `${label} (on ${location.pathname})`);
                }
            }
        };

        // Attach global click listener
        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [location.pathname]);

    return null;
};

export default AnalyticsTracker;
