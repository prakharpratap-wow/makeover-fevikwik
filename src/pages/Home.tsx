import React, { useRef, useState } from 'react';
import MobileLayout from '../components/layout/MobileLayout';
import Header from '../components/layout/Header';
import Button from '../components/common/Button';
import Mirror, { type MirrorHandle } from '../components/feature/Mirror';
import poweredBy from "../assets/poweredby.png"
import './Home.scss';

const Home: React.FC = () => {
    const mirrorRef = useRef<MirrorHandle>(null);
    const [isCameraActive, setIsCameraActive] = useState(false);


    const handleStartCamera = () => {
        console.log("handleStartCamera", mirrorRef);
        if (mirrorRef.current) {
            mirrorRef.current.startCamera();
        }
    };

    return (
        <MobileLayout>
            <Header />
            <div className='home-content'>
                <div className='d-flex flex-column align-items-center'>
                    <Mirror ref={mirrorRef} isCameraActive={isCameraActive} setIsCameraActive={setIsCameraActive} />
                    <div className='powered-by-icon'>
                        <img src={poweredBy} alt="poweredBy" />
                    </div>
                    <div >

                        {
                            isCameraActive ? <div>
                                <div className='d-flex gap-2'>
                                    <div className='theme-btn'>
                                        <div className="theme-name">
                                            Lol
                                        </div>
                                    </div>
                                    <div className='theme-btn'>
                                        <div className="theme-name">
                                            Pookie
                                        </div>
                                    </div>
                                </div>

                                <div className='d-flex gap-2'>
                                    <div className='theme-btn'>
                                        <div className="theme-name">
                                            Dhinchak
                                        </div>
                                    </div>
                                    <div className='theme-btn'>
                                        <div className="theme-name">
                                            Macho
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <Button
                                        label="CHUTKI MEIN MAKEOVER"
                                        onClick={handleStartCamera}
                                    />
                                </div>
                            </div> : <Button
                                label="Capture Object"
                                onClick={handleStartCamera}
                            />
                        }

                    </div>
                </div>
            </div>




            {/* <main className="home-content">
                <Mirror />
                <HollywoodMirror ref={mirrorRef} onStateChange={handleStateChange} />

                {!isMirrorActive && (
                    <div className="action-area">
                        <p className="powered-by">POWERED BY <span>kwik GPT</span></p>

                        <Button
                            label="CAPTURE OBJECT"
                            onClick={handleStartCamera}
                        />


                    </div>
                )}
            </main> */}
        </MobileLayout >
    );
};

export default Home;
