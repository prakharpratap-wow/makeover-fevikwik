import React from 'react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '../components/layout/MobileLayout';
import Header from '../components/layout/Header';
import Button from '../components/common/Button';
import { useMakeover } from '../context/MakeoverContext';
import transparentFrame from "../assets/transparent-frame.png";
import '../components/feature/Mirror/style.scss';
const THEMES = ['Lol', 'Pookie', 'Dhinchak', 'Macho'];

const ThemeSelection: React.FC = () => {
    const navigate = useNavigate();
    const { capturedImage, selectedTheme, setSelectedTheme } = useMakeover();

    React.useEffect(() => {
        if (!capturedImage) {
            navigate('/capture');
        }
    }, [capturedImage, navigate]);

    const handleThemeSelect = (theme: string) => {
        setSelectedTheme(theme);
    };

    const handleSurpriseMe = () => {
        const randomTheme = THEMES[Math.floor(Math.random() * THEMES.length)];
        setSelectedTheme(randomTheme);
    };

    const handleMakeover = () => {
        if (selectedTheme) {
            navigate('/result');
        } else {
            alert("Please select a theme!");
        }
    };

    if (!capturedImage) {
        return null;
    }

    return (
        <MobileLayout>
            <Header />
            <div className='home-content'>
                <div className='d-flex flex-column align-items-center'>
                    <div className="mirror-wrapper">
                        <div className="mirror-frame-container">
                            <img src={transparentFrame} alt="Frame" className="mirror-frame-img" />
                            <div className="camera-container">
                                <img src={capturedImage} alt="Captured" className="captured-image" />
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 w-100 d-flex flex-column align-items-center gap-3">
                        <div className="d-flex flex-wrap justify-content-center gap-2">
                            {THEMES.map((theme) => (
                                <div
                                    key={theme}
                                    className={`theme-btn ${selectedTheme === theme ? 'selected' : ''}`} // Add selected style in CSS if needed
                                    onClick={() => handleThemeSelect(theme)}
                                    style={{ cursor: 'pointer', border: selectedTheme === theme ? '2px solid yellow' : 'none' }} // Inline style for quick feedback
                                >
                                    <div className="theme-name">
                                        {theme}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Button
                            label="CHUTKI MEIN MAKEOVER"
                            onClick={handleMakeover}
                        />

                        <div
                            onClick={handleSurpriseMe}
                            style={{ color: '#F4E06D', textDecoration: 'underline', cursor: 'pointer', marginTop: '10px' }}
                        >
                            Surprise Me!
                        </div>
                    </div>
                </div>
            </div>
        </MobileLayout>
    );
};

export default ThemeSelection;
