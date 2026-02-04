import ReactGA from "react-ga4";

const TRACKING_ID = "G-8QGQGFM0N5"; // Replace with actual measurement ID

export const initGA = () => {
    ReactGA.initialize(TRACKING_ID);
};

export const trackPageView = (path: string) => {
    ReactGA.send({ hitType: "pageview", page: path });
};

export const trackEvent = (category: string, action: string, label?: string) => {
    ReactGA.event({
        category,
        action,
        label,
    });
};

export const trackUserInteraction = (label: string, page: string) => {
    ReactGA.event({
        category: "engagement",
        action: "user_interaction",
        label, // Button/Element text
        nonInteraction: false,
        transport: "xhr",
        // Custom dimensions can be added here if configured in GA4
        // 'page_path': page 
    });
    // Explicitly logging for now to use the variable and verify
    console.log(`[Analytics] Interaction: ${label} on ${page}`);
};
