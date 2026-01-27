import React from 'react';
import chutkime_makeover from "../../assets/chutkime_makeover.png";
import fevikwik from "../../assets/feviwik.png";
import './Header.scss';

const Header = () => {
    return (
        <header className="header">
            <div></div>
            <div className="brand-logo">
                <img src={chutkime_makeover} alt="Chutki Me Makeover" style={
                    { height: "70px" }
                } />
                <img src={fevikwik} alt="Fevikwik" style={
                    { height: "15px", marginTop: "-3px" }
                } />
            </div>
            <button className="hamburger-menu" aria-label="Menu">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </header>
    );
};

export default Header;
