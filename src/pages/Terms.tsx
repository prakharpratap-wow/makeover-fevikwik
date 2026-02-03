import React from 'react';
import MobileLayout from '../components/layout/MobileLayout';
import Header from '../components/layout/Header';

const Terms: React.FC = () => {
    return (
        <MobileLayout>
            <Header />
            <div className="home-content d-flex flex-column align-items-center justify-content-center" style={{ color: 'white', minHeight: '60vh' }}>
                <h2>Terms & Conditions</h2>
                <p>Content coming soon...</p>
            </div>
        </MobileLayout>
    );
};

export default Terms;
