import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '../components/layout/MobileLayout';
import Header from '../components/layout/Header';
import Button from '../components/common/Button';
import { useMakeover } from '../context/MakeoverContext';
import transparentFrame from "../assets/transparent-frame.png";
import '../components/feature/Mirror/style.scss';
import poweredBy from "../assets/poweredby.png";
import { generateVideo } from '../services/api';

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
        const timer = setTimeout(() => {
            setResultImage(capturedImage);
            setIsLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, [capturedImage, selectedTheme, setResultImage]);

    const handleGenerateVideo = async () => {
        try {
            await generateVideo({
                theme: selectedTheme,
                image: capturedImage,
                clientId: localStorage.getItem('clientId')
            });
            navigate('/register');
        } catch (error) {
            console.error("Video generation failed:", error);
            // Navigate anyway or show error? Assuming navigate for flow
            navigate('/register');
        }
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
