import React, { useRef, useState } from 'react';
import MobileLayout from '../components/layout/MobileLayout';
import Header from '../components/layout/Header';
import Mirror, { type MirrorHandle } from '../components/feature/Mirror';
import poweredBy from "../assets/poweredby.png"
import './Home.scss';

const Home: React.FC = () => {
    const mirrorRef = useRef<MirrorHandle>(null);
    const [isCameraActive, setIsCameraActive] = useState(false);




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



                    </div>
                </div>
            </div>





        </MobileLayout >
    );
};

export default Home;
