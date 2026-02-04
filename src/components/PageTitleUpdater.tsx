import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PageTitleUpdater = () => {
    const location = useLocation();

    useEffect(() => {
        const path = location.pathname;
        let title = 'makeover'; // Default title

        // Map routes to titles
        // Strategy: "makeover" + "-{route}"
        if (path === '/') {
            title = 'makeover';
        } else {
            // Remove leading slash and existing dashes/underscores if any for clean formatting
            // Or just append the raw path segment as requested
            const routeName = path.substring(1).replace(/_/g, '-');
            if (routeName) {
                title = `makeover-${routeName}`;
            }
        }

        document.title = title;
    }, [location]);

    return null;
};

export default PageTitleUpdater;
