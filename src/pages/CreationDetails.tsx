import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '../components/layout/MobileLayout';
import Header from '../components/layout/Header';
import Button from '../components/common/Button';
import transparentFrame from '../assets/transparent-frame.png';
import poweredBy from "../assets/poweredby.png";
import './CreationDetails.scss';
import { trackEvent, ANALYTICS_CATEGORIES, ANALYTICS_ACTIONS } from '../services/analytics';

// Simple SVG Icons
const DownloadIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
);

const ShareIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
);

const CreationDetails: React.FC = () => {
    const navigate = useNavigate();
    // const { id } = useParams(); // ID can be used for fetching data later
    const [activeTab, setActiveTab] = useState<'video' | 'image'>('video');

    const handleTabChange = (tab: 'video' | 'image') => {
        trackEvent(ANALYTICS_CATEGORIES.GALLERY, ANALYTICS_ACTIONS.CLICK, `Tab Switch: ${tab}`);
        setActiveTab(tab);
    };

    const handlePhirSeMakeover = () => {
        trackEvent(ANALYTICS_CATEGORIES.NAVIGATION, ANALYTICS_ACTIONS.RETAKE, 'Phir se Makeover (Gallery)');
        navigate('/');
    };

    const handleDownload = () => {
        trackEvent(ANALYTICS_CATEGORIES.VIDEO, ANALYTICS_ACTIONS.CLICK, 'Download Video');
        // Implement download logic here
        alert("Download started...");
    };

    const handleShare = () => {
        trackEvent(ANALYTICS_CATEGORIES.VIDEO, ANALYTICS_ACTIONS.CLICK, 'Share Video');
        // Implement share logic here
        alert("Share options opened...");
    };

    return (
        <MobileLayout>
            <Header />
            <div className="creation-details-container">


                <div className="tabs-container">

                    <Button
                        label="Video"
                        onClick={() => handleTabChange('video')}
                        style={activeTab === 'video' ? {
                            padding: "10px 30px",
                            fontSize: "14px",
                            fontWeight: "600"
                        } : {
                            background: 'linear-gradient(180deg, #AABCCF 0%, #ECEFF4 100%)',
                            color: '#003374',
                            border: 'none',
                            padding: "10px 30px",
                            fontSize: "14px",
                            fontWeight: "600"
                        }}
                    />
                    <Button
                        label="Image"
                        onClick={() => handleTabChange('image')}
                        style={activeTab === 'image' ? {
                            padding: "10px 30px",
                            fontSize: "14px",
                            fontWeight: "600"
                        } : {
                            background: 'linear-gradient(180deg, #AABCCF 0%, #ECEFF4 100%)',
                            color: '#003374',
                            border: 'none',
                            padding: "10px 30px",
                            fontSize: "14px",
                            fontWeight: "600"
                        }}
                    />
                </div>

                <div className="mirror-display-area">
                    <div className="mirror-frame">
                        <img src={transparentFrame} alt="Frame" className="frame-img" />
                        <div className="content-placeholder">
                            {/* Placeholder for Video or Image content */}
                            <div className="placeholder-fill">
                                {activeTab === 'video' ? 'VIDEO CONTENT' : 'IMAGE CONTENT'}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="powered-by mt-2 mb-2">
                    <img src={poweredBy} alt="Powered by kwik GPT" height="20" />
                </div>

                <div className="action-icons">
                    {activeTab === 'video' && (
                        <>
                            <div className="icon-btn" onClick={handleDownload} style={{ cursor: 'pointer' }}>
                                <DownloadIcon />
                            </div>
                            <div className="icon-btn" onClick={handleShare} style={{ cursor: 'pointer' }}>
                                <ShareIcon />
                            </div>
                        </>
                    )}
                    {/* Empty div to keep layout height if needed, or just conditional render */}
                </div>

                <div className="bottom-action mt-4">
                    <Button
                        label="Phir se Makeover"
                        onClick={handlePhirSeMakeover}
                        style={{ padding: "10px 40px", fontSize: "16px", fontWeight: "bold" }}
                    />
                </div>
            </div>
        </MobileLayout>
    );
};

export default CreationDetails;
