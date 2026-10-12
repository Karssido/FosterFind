import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavMenu from '../../components/Common/NavMenu/NavMenu';
import bg1 from '../../assets/images/bg1.jpg';
import bg2 from '../../assets/images/bg2.jpg';
import bg3 from '../../assets/images/bg3.jpg';
import bg4 from '../../assets/images/bg4.jpg';
import bg5 from '../../assets/images/bg5.jpg';
import './Home.css';

const images = [
    bg1,
    bg2,
    bg3,
    bg4,
    bg5
];

export default function Home() {
    const navigate = useNavigate();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(interval);
    }, []);

    const handleCTAClick = () => {
        navigate('/about-us');
    };

    return (
        <div className='homepage' style={{ backgroundImage: `url(${images[currentImageIndex]})` }}>
            <div className="overlay"></div>
            <div className='home-header'>
                <h1>FosterFind</h1>
                <NavMenu prefix='home-' />
            </div>

            <div className='home-body'>
                <h1 className='home-body-title'>Comfort: A Click Away</h1>
                <hr />
                <p className='home-body-subtitle'>
                    FosterFind bridges the gap between need and help. With compassion at our core, we strive to make resources accessible to everyone. Empowering lives; where rights meet compassion.
                </p>
                <button className='home-cta-button' onClick={handleCTAClick}>
                    Learn More
                </button>
            </div>
        </div>
    );
}