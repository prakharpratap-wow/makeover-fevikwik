import React from 'react';
import './MobileLayout.scss';

interface MobileLayoutProps {
    children: React.ReactNode;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ children }) => {
    return (
        <div className="mobile-layout">
            {children}
        </div>
    );
};

export default MobileLayout;
