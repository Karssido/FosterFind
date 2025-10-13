import React, { useState, useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

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
                    <li><NavLink to="/" exact activeClassName="active">Home</NavLink></li>
                    <li><NavLink to="/about-us" activeClassName="active">About Us</NavLink></li>
                    <li><NavLink to="/find-orphanages" activeClassName="active">Orphanages</NavLink></li>
                    <li><NavLink to="/find-hospitals" activeClassName="active">Hospitals</NavLink></li>
                    <li><NavLink to="/find-oldAgeHomes" activeClassName="active">Old Age Homes</NavLink></li>

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

