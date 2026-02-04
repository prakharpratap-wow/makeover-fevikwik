import { forwardRef, useRef, useState, useImperativeHandle, useEffect } from 'react';
import Button from '../../common/Button';
import transparentFrame from "../../../assets/transparent-frame.png";
import ellipse from "../../../assets/Ellipse_6.png"
import './style.scss';

export interface MirrorHandle {
    startCamera: () => void;
}

interface MirrorProps {
    isCameraActive: boolean;
    setIsCameraActive: (isActive: boolean) => void;
    onCapture?: (image: string) => void;
}

const Mirror = forwardRef<MirrorHandle, MirrorProps>(({ isCameraActive, setIsCameraActive, onCapture }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);

    useImperativeHandle(ref, () => ({
        startCamera: async () => {
            setIsCameraActive(true);
            setCapturedImage(null);
            // We only set the flag here. The actual camera acquisition is handled
            // by the useEffect below to prevent race conditions.
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
                // Mirror the image to match the user-facing camera preview
                ctx.translate(canvas.width, 0);
                ctx.scale(-1, 1);
                ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

                const imageUrl = canvas.toDataURL('image/png');
                setCapturedImage(imageUrl);
                stopCamera();
                setIsCameraActive(false);

                if (onCapture) {
                    onCapture(imageUrl);
                }
            }
        }
    };

    // Effect to handle camera stream assignment when isCameraActive changes to true
    // This handles the case where startCamera sets the state, but we need to wait for render to attach ref
    useEffect(() => {
        let isMounted = true;

        const startStream = async () => {
            if (isCameraActive && !capturedImage && !streamRef.current) {
                try {
                    // Try to get back camera explicitly using exact keyword
                    // This is the most reliable way to Force back camera on mobile
                    console.log("Attempting to access back camera...");
                    const stream = await navigator.mediaDevices.getUserMedia({
                        video: { facingMode: { exact: 'environment' } }
                    });

                    if (isMounted) {
                        if (videoRef.current) {
                            videoRef.current.srcObject = stream;
                        }
                        streamRef.current = stream;
                    } else {
                        // component unmounted during promise, stop stream immediately
                        stream.getTracks().forEach(track => track.stop());
                    }
                } catch (err) {
                    console.log("Back camera not available or error, falling back to any camera", err);
                    try {
                        // Fallback to any camera (likely front or default)
                        const stream = await navigator.mediaDevices.getUserMedia({ video: true });

                        if (isMounted) {
                            if (videoRef.current) {
                                videoRef.current.srcObject = stream;
                            }
                            streamRef.current = stream;
                        } else {
                            stream.getTracks().forEach(track => track.stop());
                        }
                    } catch (fallbackErr) {
                        console.error("Camera access error:", fallbackErr);
                        alert("Could not access camera. Please allow camera permissions.");
                        if (isMounted) setIsCameraActive(false);
                    }
                }
            }
        }

        startStream();

        return () => {
            isMounted = false;
        };

    }, [isCameraActive, capturedImage, setIsCameraActive]);

    useEffect(() => {
        return () => {
            stopCamera();
        };
    }, []);

    const fileInputRef = useRef<HTMLInputElement>(null);

    // ... existing useEffect ...

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageUrl = reader.result as string;
                setCapturedImage(imageUrl);
                stopCamera();
                setIsCameraActive(false);
                if (onCapture) {
                    onCapture(imageUrl);
                }
            };
            reader.readAsDataURL(file);
        }
    };

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
                <div className="mirror-controls mt-3 ">
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                    {isCameraActive && (
                        <div>

                            <div className='d-flex justify-content-center mb-4'>
                                <img src={ellipse} alt="Ellipse" onClick={handleCapture} />
                            </div>

                            <Button
                                label="Upload"
                                onClick={handleUploadClick}
                                style={{ padding: "5.5px 40px", fontSize: "14px" }}
                            />
                        </div>
                    )}
                    {/* {capturedImage && (
                        <Button
                            label="RETAKE"
                            onClick={handleRetake}
                        />
                    )}
                    <Button
                        label="CANCEL"
                        onClick={handleClose}
                    /> */}
                </div>
            )}
        </div>
    );
});

export default Mirror;