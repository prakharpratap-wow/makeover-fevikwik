import React, { useRef } from 'react';
import MobileLayout from '../components/layout/MobileLayout';
import Header from '../components/layout/Header';
import HollywoodMirror from '../components/feature/HollywoodMirror';
import { type HollywoodMirrorHandle } from '../components/feature/HollywoodMirror';
import Button from '../components/common/Button';
import './Home.scss';

const Home: React.FC = () => {
    const mirrorRef = useRef<HollywoodMirrorHandle>(null);

    const handleStartCamera = () => {
        console.log("handleStartCamera");
        if (mirrorRef.current) {
            mirrorRef.current.startCamera();
        }
    };

    return (
        <MobileLayout>
            <Header />

            <main className="home-content">
                <HollywoodMirror ref={mirrorRef} />

                <div className="action-area">
                    <p className="powered-by">POWERED BY <span>kwik GPT</span></p>

                    <Button
                        className="capture-btn"
                        onClick={handleStartCamera}
                    >
                        Capture Object
                    </Button>
                </div>
            </main>
        </MobileLayout>
    );
};

export default Home;
