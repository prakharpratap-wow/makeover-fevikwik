import React, { useState, useRef, useImperativeHandle, forwardRef, useEffect } from 'react';
import poster from "../../assets/poster.png";
import './HollywoodMirror.scss';

export interface HollywoodMirrorHandle {
    startCamera: () => void;
}

const HollywoodMirror = forwardRef<HollywoodMirrorHandle>((_, ref) => {
    const [isCameraActive, setIsCameraActive] = useState(false);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const streamRef = useRef<MediaStream | null>(null);

    // Create an array of bulbs for the sides
    const sideBulbs = Array.from({ length: 9 });

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
        setIsCameraActive(true);
        // Small timeout to let the video element render
        setTimeout(async () => {
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

    const handleClose = () => {
        stopCamera();
        setCapturedImage(null);
        setIsCameraActive(false);
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    return (
        <div className="mirror-container">
            <div className="mirror-frame">
                <div className="lights-left">
                    {sideBulbs.map((_, i) => <div key={`l-${i}`} className="bulb" />)}
                </div>

                <div className="mirror-glass">
                    <div className="reflection-content">
                        {!isCameraActive && !capturedImage && (
                            <>
                                <img className='poster-image' src={poster} alt="" />
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
                                <div className="camera-controls">
                                    <button onClick={handleCapture} className="action-btn capture">Click</button>
                                    <button onClick={handleClose} className="action-btn cancel">Cancel</button>
                                </div>
                            </div>
                        )}

                        {capturedImage && (
                            <div className="captured-image-container">
                                <img src={capturedImage} alt="Captured" className="captured-image" />
                                <div className="image-controls">
                                    <button onClick={handleRetake} className="action-btn retake">Retake</button>
                                    <button onClick={handleClose} className="action-btn use">Close</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="lights-right">
                    {sideBulbs.map((_, i) => <div key={`r-${i}`} className="bulb" />)}
                </div>
            </div>

            {/* Curved light strips for background environment */}
            <div className="env-light-strip left"></div>
            <div className="env-light-strip right"></div>
        </div>
    );
});

export default HollywoodMirror;
