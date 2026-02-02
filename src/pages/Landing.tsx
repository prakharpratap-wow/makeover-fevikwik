import React from 'react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '../components/layout/MobileLayout';
import Header from '../components/layout/Header';
import Button from '../components/common/Button';
import poweredBy from "../assets/poweredby.png";
import transparentFrame from "../assets/transparent-frame.png";
import '../components/feature/Mirror/style.scss';
import './Home.scss';

const Landing: React.FC = () => {
    const navigate = useNavigate();

    const handleStart = () => {
        navigate('/capture');
    };

    return (
        <MobileLayout>
            <Header />
            <div className='home-content'>
                <div className='d-flex flex-column align-items-center'>
                    {/* Reuse the mirror frame look for consistency, or just the frame image */}
                    <div className="mirror-wrapper">
                        <div className="mirror-frame-container">
                            <img src={transparentFrame} alt="Frame" className="mirror-frame-img" />
                            {/* We could put a placeholder image or text here if needed */}
                        </div>
                    </div>

                    <div className='powered-by-icon'>
                        <img src={poweredBy} alt="poweredBy" />
                    </div>

                    <div>
                        <Button
                            label="Capture Object"
                            onClick={handleStart}
                        />
                    </div>
                </div>
            </div>
        </MobileLayout>
    );
};

export default Landing;
