import React, { useState, useRef, useImperativeHandle, forwardRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import poster from "../../assets/poster.png";
import './HollywoodMirror.scss';

export interface HollywoodMirrorHandle {
    startCamera: () => void;
}

interface HollywoodMirrorProps {
    onStateChange?: (isActive: boolean) => void;
}

const HollywoodMirror = forwardRef<HollywoodMirrorHandle, HollywoodMirrorProps>(({ onStateChange }, ref) => {
    const navigate = useNavigate();
    const [isCameraActive, setIsCameraActive] = useState(false);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Create an array of bulbs for the sides

    useImperativeHandle(ref, () => ({
        startCamera: async () => {
            setIsCameraActive(true);
            setCapturedImage(null);
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
                streamRef.current = stream;
            } catch (err) {
                console.error("Error accessing camera:", err);
                alert("Could not access camera. Please allow camera permissions.");
                setIsCameraActive(false);
            }
        }
    }));

    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
    };

    const handleCapture = () => {
        if (videoRef.current) {
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(videoRef.current, 0, 0);
                const imageUrl = canvas.toDataURL('image/png');
                setCapturedImage(imageUrl);
                stopCamera();
                setIsCameraActive(false);
            }
        }
    };

    const handleRetake = async () => {
        setCapturedImage(null);
        setSelectedTheme(null);
        setIsCameraActive(true);
        setTimeout(async () => {
            stopCamera();
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
                streamRef.current = stream;
            } catch (err) {
                console.error("Error restarting camera:", err);
            }
        }, 100);
    };

    const handleGalleryClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Please select a valid image file.");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setCapturedImage(reader.result as string);
            stopCamera();
            setIsCameraActive(false);
        };
        reader.readAsDataURL(file);
    };

    const handleClose = () => {
        stopCamera();
        setCapturedImage(null);
        setSelectedTheme(null);
        setIsCameraActive(false);
    };

    const handleThemeSelect = (theme: string) => {
        setSelectedTheme(theme);
    };

    const handleSurpriseMe = () => {
        const themes = ['Theme 1', 'Theme 2', 'Theme 3', 'Theme 4'];
        const randomTheme = themes[Math.floor(Math.random() * themes.length)];
        setSelectedTheme(randomTheme);
    };

    const handleSubmit = () => {
        if (selectedTheme) {
            const isSignedUp = localStorage.getItem('isSignedUp') === 'true';
            if (isSignedUp) {
                navigate('/login');
            } else {
                navigate('/sign-up');
            }
        } else {
            alert("Please select a theme first.");
        }
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    useEffect(() => {
        if (onStateChange) {
            // Active if camera is on OR we have a captured image (reviewing)
            const isActive = isCameraActive || !!capturedImage;
            onStateChange(isActive);
        }
    }, [isCameraActive, capturedImage, onStateChange]);

    return (
        <>

            <div className="mirror-container">
                <div className="mirror-frame">


                    <div className="mirror-glass">
                        <div className="reflection-content">
                            {!isCameraActive && !capturedImage && (
                                <>
                                    <img className='poster-image' src={poster} alt="poster-image" />
                                </>
                            )}

                            {isCameraActive && (
                                <div className="camera-container">
                                    <video
                                        ref={videoRef}
                                        autoPlay
                                        playsInline
                                        muted
                                        className="camera-feed"
                                        onLoadedMetadata={() => videoRef.current?.play()}
                                    />

                                </div>
                            )}

                            {capturedImage && (
                                <div className="captured-image-container ui-overlay-active">
                                    <img src={capturedImage} alt="Captured" className="captured-image" />
                                </div>
                            )}


                        </div>
                    </div>


                </div>


            </div>

            {capturedImage && (
                <div className="theme-selection-panel">
                    <h3 className="theme-title">CHOOSE YOUR THEME</h3>
                    <div className="object-grid">
                        {['Theme 1', 'Theme 2', 'Theme 3', 'Theme 4'].map((theme) => (
                            <button
                                key={theme}
                                className={`object-btn ${selectedTheme === theme ? 'selected' : ''}`}
                                onClick={() => handleThemeSelect(theme)}
                            >
                                {theme}
                            </button>
                        ))}
                    </div>
                    <button className="surprise-btn" onClick={handleSurpriseMe}>Surprise Me</button>
                    <div className="action-row">
                        <button onClick={handleSubmit} className="action-btn submit">Submit</button>
                        <button onClick={handleRetake} className="text-btn retake-link">Retake</button>
                    </div>
                </div>
            )}

            {/* Hidden file input */}
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
            />

            <div className='image-btn-controls'>
                {isCameraActive && (
                    <div className="camera-container">

                        <div className="camera-controls">
                            <button onClick={handleGalleryClick} className="action-btn capture">Gallery Upload</button>
                            <button onClick={handleCapture} className="action-btn capture">Click</button>
                            <button onClick={handleClose} className="action-btn cancel">Cancel</button>
                        </div>
                    </div>
                )}

                {/* {capturedImage && (
                    <div className="captured-image-container">
                        <div className="image-controls">
                            <button onClick={handleRetake} className="action-btn retake">Retake</button>
                            <button onClick={handleClose} className="action-btn use">Close</button>
                        </div>
                    </div>
                )} */}</div></>
    );
});

export default HollywoodMirror;
