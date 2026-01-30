import { forwardRef, useRef, useState, useImperativeHandle, useEffect } from 'react';
import Button from '../../common/Button';
import transparentFrame from "../../../assets/transparent-frame.png";
import './style.scss';

export interface MirrorHandle {
    startCamera: () => void;
}

interface MirrorProps {
    isCameraActive: boolean;
    setIsCameraActive: (isActive: boolean) => void;
}

const Mirror = forwardRef<MirrorHandle, MirrorProps>(({ isCameraActive, setIsCameraActive }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);

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
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
            streamRef.current = stream;
        } catch (err) {
            console.error("Error restarting camera:", err);
        }
    };

    const handleClose = () => {
        stopCamera();
        setCapturedImage(null);
        setIsCameraActive(false);
    }

    // Effect to handle camera stream assignment when isCameraActive changes to true
    // This handles the case where startCamera sets the state, but we need to wait for render to attach ref
    useEffect(() => {
        const startStream = async () => {
            if (isCameraActive && !capturedImage && !streamRef.current) {
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                    }
                    streamRef.current = stream;
                } catch (err) {
                    console.error("Error accessing camera:", err);
                    setIsCameraActive(false);
                }
            }
        }

        startStream();

    }, [isCameraActive, capturedImage, setIsCameraActive]);

    useEffect(() => {
        return () => {
            stopCamera();
        };
    }, []);

    const showControls = isCameraActive || capturedImage;

    return (
        <div className="mirror-wrapper">
            <div className="mirror-frame-container">
                <img src={transparentFrame} alt="Frame" className="mirror-frame-img" />
                <div className="camera-container">
                    {isCameraActive && (
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                            className="camera-feed"
                        />
                    )}
                    {capturedImage && (
                        <img src={capturedImage} alt="Captured" className="captured-image" />
                    )}
                </div>
            </div>

            {showControls && (
                <div className="mirror-controls mt-3 d-flex gap-2 justify-content-center">
                    {isCameraActive && (
                        <Button
                            label="CAPTURE"
                            onClick={handleCapture}
                        />
                    )}
                    {capturedImage && (
                        <Button
                            label="RETAKE"
                            onClick={handleRetake}
                        />
                    )}
                    <Button
                        label="CANCEL"
                        onClick={handleClose}
                    />
                </div>
            )}
        </div>
    );
});

export default Mirror;