import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Body.css';

export default function Body() {
    const navigate = useNavigate();

    const handleCTAClick = () => {
        navigate('/about-us'); // Change this to the desired route
    };

    return (
        <div className='body'>
            <div className='hero'>
                <h1 className='hero-title'>Comfort: A Click Away</h1>
                <hr />
                <p className='hero-subtitle'>Your trusty guide for locating immediate medical assistance in your vicinity. Whether it's finding the nearest hospital, urgent care, or emergency services, FosterFind ensures you're always in the know and ready to act swiftly in any medical crisis.</p>
                <button className='cta-button' onClick={handleCTAClick}>Learn More</button>
            </div>
        </div>
    );
}
