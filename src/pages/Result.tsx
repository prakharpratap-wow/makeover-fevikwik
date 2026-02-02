import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '../components/layout/MobileLayout';
import Header from '../components/layout/Header';
import Button from '../components/common/Button';
import { useMakeover } from '../context/MakeoverContext';
import transparentFrame from "../assets/transparent-frame.png";
import '../components/feature/Mirror/style.scss';
import poweredBy from "../assets/poweredby.png";

const Result: React.FC = () => {
    const navigate = useNavigate();
    const { capturedImage, selectedTheme, setResultImage, resultImage } = useMakeover();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!capturedImage) {
            navigate('/capture');
        }
    }, [capturedImage, navigate]);

    useEffect(() => {
        // Simulate API call
        const timer = setTimeout(() => {
            // In a real app, we would send capturedImage and selectedTheme to backend
            // For now, we just use the captured image as the "result" or a placeholder
            // simluating a change.
            setResultImage(capturedImage); // Just showing the same image for now as POC
            setIsLoading(false);
        }, 3000); // 3 seconds loading

        return () => clearTimeout(timer);
    }, [capturedImage, selectedTheme, setResultImage]);

    const handleGenerateVideo = () => {
        navigate('/register');
    };

    const handleRetake = () => {
        navigate('/capture');
    };

    if (!capturedImage) {
        return null;
    }

    return (
        <MobileLayout>
            <Header />
            <div className='home-content'>
                <div className='d-flex flex-column align-items-center'>
                    <div className="mirror-wrapper">
                        <div className="mirror-frame-container">
                            <img src={transparentFrame} alt="Frame" className="mirror-frame-img" />
                            <div className="camera-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                {isLoading ? (
                                    <div className="text-center p-3">
                                        <h2 style={{ color: '#F4E06D', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                                            The loading <br /> copy <br /> will be <br /> pasted <br /> here
                                        </h2>
                                        <div className="spinner-border text-light mt-3" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                ) : (
                                    <img src={resultImage || capturedImage} alt="Result" className="captured-image" />
                                )}
                            </div>
                        </div>
                    </div>

                    <div className='powered-by-icon'>
                        <img src={poweredBy} alt="poweredBy" />
                    </div>

                    {!isLoading && (
                        <div className="mt-4 w-100 d-flex gap-2 justify-content-center">
                            <Button
                                label="Phir se Makeover"
                                onClick={handleRetake}
                                style={{ whiteSpace: "nowrap", fontSize: "14px", padding: "11px 15px" }}
                            />
                            <Button
                                label="Generate Video"
                                onClick={handleGenerateVideo}
                                style={{ background: 'linear-gradient(180deg, #AABCCF 0%, #ECEFF4 100%)', color: '#003374', whiteSpace: "nowrap", fontSize: "14px", padding: "11px 15px" }}
                            />
                        </div>
                    )}
                </div>
            </div>
        </MobileLayout>
    );
};

export default Result;
