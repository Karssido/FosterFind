import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
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

export default function Body() {
    const navigate = useNavigate();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [today, setDate] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setDate(new Date());
        }, 60000); // Update time every minute

        return () => clearInterval(timer);
    }, []);

    const handleCTAClick = () => {
        navigate('/about-us');
    };

    const locale = 'en';
    const day = today.toLocaleDateString(locale, { weekday: 'long' });
    const date = `${day}, ${today.getDate()} ${today.toLocaleDateString(locale, { month: 'long' })}`;
    const hour = today.getHours();
    const wish = `Good ${(hour < 12 && 'Morning') || (hour < 17 && 'Afternoon') || 'Evening'}`;
    const time = today.toLocaleTimeString(locale, { hour: 'numeric', hour12: true, minute: 'numeric' });

    const toggleMenu = useCallback(() => {
        document.querySelector('.home-header-tabs ul').classList.toggle('show');
    }, []);

    return (
        <div className='homepage' style={{ backgroundImage: `url(${images[currentImageIndex]})` }}>
            <div className="overlay"></div>
            <div className='home-header'>
                <h1>FosterFind</h1>
                <nav className='home-header-tabs'>
                    <ul>
                        <li><NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink></li>
                        <li><NavLink to="/about-us" className={({ isActive }) => isActive ? 'active' : ''}>About Us</NavLink></li>
                        <li><NavLink to="/find-orphanages" className={({ isActive }) => isActive ? 'active' : ''}>Orphanages</NavLink></li>
                        <li><NavLink to="/find-hospitals" className={({ isActive }) => isActive ? 'active' : ''}>Hospitals</NavLink></li>
                        <li><NavLink to="/find-oldAgeHomes" className={({ isActive }) => isActive ? 'active' : ''}>Old Age Homes</NavLink></li>
                    </ul>
                </nav>
                <div className='home-dt'>
                    <p>{date} {time}</p>
                    <p className='home-wish'>{wish}</p>
                </div>
                <button className='home-hamburger-menu' onClick={toggleMenu} aria-label="Toggle menu">
                    ☰
                </button>
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