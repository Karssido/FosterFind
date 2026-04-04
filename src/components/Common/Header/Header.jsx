import React, { useState, useEffect, useCallback } from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';

export default function Header() {
    const locale = 'en';
    const [today, setDate] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setDate(new Date());
        }, 60 * 1000);
        return () => clearInterval(timer);
    }, []);

    const day = today.toLocaleDateString(locale, { weekday: 'long' });
    const date = `${day}, ${today.getDate()} ${today.toLocaleDateString(locale, { month: 'long' })}`;
    const hour = today.getHours();
    const wish = `Good ${(hour < 12 && 'Morning') || (hour < 17 && 'Afternoon') || 'Evening'}`;
    const time = today.toLocaleTimeString(locale, { hour: 'numeric', hour12: true, minute: 'numeric' });

    const toggleMenu = useCallback(() => {
        document.querySelector('.header-tabs ul').classList.toggle('show');
    }, []);

    return (
        <div className='header'>
            <h1>FosterFind</h1>
            <nav className='header-tabs'>
                <ul>
                    <li><NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink></li>
                    <li><NavLink to="/about-us" className={({ isActive }) => isActive ? 'active' : ''}>About Us</NavLink></li>
                    <li><NavLink to="/find-orphanages" className={({ isActive }) => isActive ? 'active' : ''}>Orphanages</NavLink></li>
                    <li><NavLink to="/find-hospitals" className={({ isActive }) => isActive ? 'active' : ''}>Hospitals</NavLink></li>
                    <li><NavLink to="/find-oldAgeHomes" className={({ isActive }) => isActive ? 'active' : ''}>Old Age Homes</NavLink></li>
                </ul>
            </nav>
            <div className='dt'>
                <p>{date} {time}</p>
                <p className='wish'>{wish}</p>
            </div>
            <button className='hamburger-menu' onClick={toggleMenu} aria-label="Toggle menu">
                ☰
            </button>
        </div>
    );
}