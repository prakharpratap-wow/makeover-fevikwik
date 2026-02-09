import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '../components/layout/MobileLayout';
import Header from '../components/layout/Header';
import Button from '../components/common/Button';
import { useMakeover } from '../context/MakeoverContext';
import transparentFrame from "../assets/transparent-frame.png";
import '../components/feature/Mirror/style.scss';
import poweredBy from "../assets/poweredby.png";
import { useGenerateVideo } from '../hooks/useGenerateVideo';
import { trackEvent, ANALYTICS_CATEGORIES, ANALYTICS_ACTIONS } from '../services/analytics';

const Result: React.FC = () => {
    const navigate = useNavigate();
    const { capturedImage, selectedTheme, setResultImage, resultImage } = useMakeover();
    const [isLoading, setIsLoading] = useState(true);
    const { mutate: generateVideoMutate, isPending: isVideoGenerating } = useGenerateVideo();

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

    const handleGenerateVideo = () => {
        trackEvent(ANALYTICS_CATEGORIES.VIDEO, ANALYTICS_ACTIONS.START, 'Generate Video');
        generateVideoMutate({
            theme: selectedTheme,
            image: capturedImage,
            clientId: localStorage.getItem('clientId')
        }, {
            onSuccess: () => {
                trackEvent(ANALYTICS_CATEGORIES.VIDEO, ANALYTICS_ACTIONS.SUCCESS, 'Video Generated');
                navigate('/register');
            },
            onError: (error) => {
                trackEvent(ANALYTICS_CATEGORIES.VIDEO, ANALYTICS_ACTIONS.ERROR, 'Video Generation Failed');
                console.error("Video generation failed:", error);
                navigate('/register'); // Fallback navigation even on error as per previous logic
            }
        });
    };

    const handleRetake = () => {
        trackEvent(ANALYTICS_CATEGORIES.VIDEO, ANALYTICS_ACTIONS.RETAKE, 'Phir se Makeover');
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
                                disabled={isVideoGenerating}
                            />
                            <Button
                                label={isVideoGenerating ? "Generating..." : "Generate Video"}
                                onClick={handleGenerateVideo}
                                style={{ background: 'linear-gradient(180deg, #AABCCF 0%, #ECEFF4 100%)', color: '#003374', whiteSpace: "nowrap", fontSize: "14px", padding: "11px 15px" }}
                                isLoading={isVideoGenerating}
                            />
                        </div>
                    )}
                </div>
            </div>
        </MobileLayout>
    );
};

export default Result;
