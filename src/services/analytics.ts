import ReactGA from "react-ga4";

const TRACKING_ID = "G-8QGQGFM0N5"; // Replace with actual measurement ID

export const ANALYTICS_CATEGORIES = {
    NAVIGATION: 'Navigation',
    CAMERA: 'Camera',
    THEME: 'Theme',
    AUTH: 'Auth',
    VIDEO: 'Video',
    GALLERY: 'Gallery',
    CTA: 'CTA', 
} as const;

export const ANALYTICS_ACTIONS = {
    CLICK: 'Click',
    SUBMIT: 'Submit',
    VIEW: 'View',
    SUCCESS: 'Success',
    ERROR: 'Error',
    START: 'Start',
    CANCEL: 'Cancel',
    RETAKE: 'Retake',
    SELECTION: 'Selection',
} as const;

export const initGA = () => {
    ReactGA.initialize(TRACKING_ID);
};

export const trackPageView = (path: string) => {
    ReactGA.send({ hitType: "pageview", page: path });
};

export const trackEvent = (category: string, action: string, label?: string, value?: number) => {
    ReactGA.event({
        category,
        action,
        label,
        value,
    });
    console.log(`[Analytics] Event: [${category}] ${action} ${label ? `- ${label}` : ''}`);
};

export const trackUserInteraction = (category: string, action: string, label: string) => {
   trackEvent(category, action, label);
};
