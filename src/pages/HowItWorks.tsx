import React from 'react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '../components/layout/MobileLayout';
import Header from '../components/layout/Header';
import poweredBy from "../assets/poweredby.png";
import './HowItWorks.scss';

const HowItWorks: React.FC = () => {
    const navigate = useNavigate();

    const handleClose = () => {
        navigate('/');
    };

    return (
        <MobileLayout>
            <Header />
            <div className="how-it-works-overlay">
                <div className="modal-container">
                    <div className="close-icon" onClick={handleClose}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18" stroke="#F2ED2F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M6 6L18 18" stroke="#F2ED2F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>

                    <div className="steps-content">
                        <div className="step-item">
                            1) CLICK A PHOTO OF ANY OBJECT
                        </div>
                        <div className="step-item">
                            2) PICK A THEME
                        </div>
                        <div className="step-item">
                            3) HIT <span className="highlight-yellow">CHUTKI MEIN MAKEOVER</span>
                        </div>
                        <div className="step-item">
                            4) GENERATE VIDEO
                        </div>
                        <div className="step-item">
                            5) REGISTER & STAND A CHANCE TO <br />
                            <span className="highlight-yellow">WIN ₹5,000</span>
                        </div>
                        <div className="step-item">
                            6) GIVE MAKEOVER IN REAL LIFE TO <br />
                            <span className="highlight-yellow">WIN ₹5,00,000</span>
                        </div>
                    </div>

                    <div className="powered-by">
                        <img src={poweredBy} alt="Powered By Kwik GPT" />
                    </div>
                </div>
            </div>
        </MobileLayout>
    );
};

export default HowItWorks;
