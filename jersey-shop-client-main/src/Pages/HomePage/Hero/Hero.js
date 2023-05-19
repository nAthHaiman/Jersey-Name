import React from 'react';
import banner from '../../../assets/banner.png'
const Hero = () => {
    return (
        <div className="hero h-[650px] rounded-xl" style={{ backgroundImage: `url(${banner})` }}>
        </div>
    );
};

export default Hero;