import ReactGA from "react-ga4";

const TRACKING_ID = "G-XXXXXXXXXX"; // Replace with actual measurement ID

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
