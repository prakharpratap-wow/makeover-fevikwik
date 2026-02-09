import React from 'react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '../components/layout/MobileLayout';
import Header from '../components/layout/Header';
import { useMakeover } from '../context/MakeoverContext';
import Shine from '../assets/Shine';
import add from '../assets/add.png';
import './Gallery.scss';

const Gallery: React.FC = () => {
    const navigate = useNavigate();
    const { resetState } = useMakeover();
    // Placeholder data for gallery items
    const items = Array.from({ length: 6 }, (_, i) => `Creation ${i + 1}`);

    const handleMakeoverClick = () => {
        resetState();
        navigate('/');
    };

    const handleItemClick = (index: number) => {
        navigate(`/creation/${index + 1}`);
    };

    return (
        <MobileLayout>
            <Header />
            <div className="home-content gallery-container">
                <div className="gallery-grid">
                    {items.map((item, index) => (
                        <div key={index} className="gallery-item" onClick={() => handleItemClick(index)}>
                            <Shine />
                            <div className="item-content">
                                {item}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="footer-action" onClick={handleMakeoverClick}>
                    <div className="plus-icon-box">
                        <img src={add} alt="add" style={{ borderRadius: "8px" }} />
                    </div>
                    <div className="action-text">
                        CHUTKI MEIN<br />MAKEOVER
                    </div>
                </div>
            </div>
        </MobileLayout>
    );
};

export default Gallery;
