import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '../components/layout/MobileLayout';
import Header from '../components/layout/Header';
import Mirror, { type MirrorHandle } from '../components/feature/Mirror';
import { useMakeover } from '../context/MakeoverContext';
import Button from '../components/common/Button';  // Assuming we have a Button component

const Capture: React.FC = () => {
    const navigate = useNavigate();
    const { capturedImage, setCapturedImage } = useMakeover();
    const mirrorRef = useRef<MirrorHandle>(null);
    const [isCameraActive, setIsCameraActive] = useState(false);
    // const [isPreviewMode, setIsPreviewMode] = useState(false); // Can derive from capturedImage

    // Clear captured image on mount/unmount to ensure fresh start?
    // Actually, if we come back from Theme, maybe we want to keep it?
    // User says "clicking on reacpure will bring you back to /capture".
    // If we are just changing state on the same route, it's fine.

    useEffect(() => {
        // Auto-start camera on mount ONLY if no image is already captured (or always?)
        // If we treat this as a fresh entry, we should probably clear previous capture?
        // Let's reset capture on mount to be safe, as usually you come here to capture.
        setCapturedImage(null);

        const startCam = async () => {
            if (mirrorRef.current) {
                await mirrorRef.current.startCamera();
            }
        };
        // Small timeout to ensure ref is ready
        setTimeout(startCam, 100);

        return () => {
            setIsCameraActive(false);
        }
    }, [setCapturedImage]); // Add setCapturedImage dependency

    const handleCapture = (image: string) => {
        setCapturedImage(image);
        // Do NOT navigate yet.
        // The Mirror component will hide its own controls (shutter/upload) because isCameraActive becomes false.
    };

    // We can remove the file input from Capture.tsx since Mirror handles it now?
    // In original code, Capture.tsx had a file input that seemed unused or redundant if Mirror has one.
    // Mirror has its own 'Upload' button and file input.
    // However, Capture.tsx was rendering a file input but it was hidden and seemingly not triggered by anything in Capture.tsx itself
    // unless Mirror triggered it? But Mirror has its OWN ref.
    // Let's remove the redundant one in Capture.tsx.

    const handleRetake = async () => {
        setCapturedImage(null);
        if (mirrorRef.current) {
            await mirrorRef.current.startCamera();
        }
    };

    const handleSubmit = () => {
        navigate('/theme');
    };

    const handleBack = () => {
        // Navigate back to Home or previous page
        navigate('/');
    };

    return (
        <MobileLayout>
            <Header />
            <div className='home-content'>
                <div className='d-flex flex-column align-items-center'>
                    <Mirror
                        ref={mirrorRef}
                        isCameraActive={isCameraActive}
                        setIsCameraActive={setIsCameraActive}
                        onCapture={handleCapture}
                        onBack={!capturedImage ? handleBack : undefined} // Only show back button in camera mode
                        onClose={capturedImage ? handleRetake : undefined} // Show Close Icon in Preview Mode
                    />

                    {/* Preview Mode Buttons */}
                    {capturedImage && (
                        <div className="d-flex gap-3 mt-4">
                            <Button
                                label="Re Capture"
                                onClick={handleRetake}
                                style={{
                                    background: 'linear-gradient(180deg, #AABCCF 0%, #ECEFF4 100%)',
                                    color: '#003374',
                                    border: 'none',
                                    padding: "10px 30px",
                                    fontSize: "14px",
                                    fontWeight: "600"
                                }}
                            />
                            <Button
                                label="Submit"
                                onClick={handleSubmit}
                                style={{
                                    padding: "10px 30px",
                                    fontSize: "14px",
                                    fontWeight: "600"
                                }}
                            />
                        </div>
                    )}

                </div>
            </div>
        </MobileLayout>
    );
};

export default Capture;
