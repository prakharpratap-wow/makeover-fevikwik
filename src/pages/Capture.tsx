import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '../components/layout/MobileLayout';
import Header from '../components/layout/Header';
import Mirror, { type MirrorHandle } from '../components/feature/Mirror';
import { useMakeover } from '../context/MakeoverContext';

const Capture: React.FC = () => {
    const navigate = useNavigate();
    const { setCapturedImage } = useMakeover();
    const mirrorRef = useRef<MirrorHandle>(null);
    const [isCameraActive, setIsCameraActive] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // Auto-start camera on mount
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
    }, []);

    const handleCapture = (image: string) => {
        setCapturedImage(image);
        navigate('/theme');
    };

    const handleGalleryUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                    setCapturedImage(reader.result);
                    navigate('/theme');
                }
            };
            reader.readAsDataURL(file);
        }
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
                    />
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleGalleryUpload}
                    />


                </div>
            </div>
        </MobileLayout>
    );
};

export default Capture;
