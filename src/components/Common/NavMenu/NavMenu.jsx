import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const locale = 'en';

const links = [
    { to: '/', label: 'Home' },
    { to: '/about-us', label: 'About Us' },
    { to: '/find-orphanages', label: 'Orphanages' },
    { to: '/find-hospitals', label: 'Hospitals' },
    { to: '/find-oldAgeHomes', label: 'Old Age Homes' },
];

/**
 * Navigation links, date/time greeting and mobile menu toggle shared by the
 * Header and the Home page. `prefix` selects the CSS class set ('' or 'home-').
 */
export default function NavMenu({ prefix = '' }) {
    const [today, setDate] = useState(new Date());
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => setDate(new Date()), 60 * 1000);
        return () => clearInterval(timer);
    }, []);

    const day = today.toLocaleDateString(locale, { weekday: 'long' });
    const date = `${day}, ${today.getDate()} ${today.toLocaleDateString(locale, { month: 'long' })}`;
    const hour = today.getHours();
    const wish = `Good ${(hour < 12 && 'Morning') || (hour < 17 && 'Afternoon') || 'Evening'}`;
    const time = today.toLocaleTimeString(locale, { hour: 'numeric', hour12: true, minute: 'numeric' });

    return (
        <>
            <nav className={`${prefix}header-tabs`}>
                <ul className={menuOpen ? 'show' : ''}>
                    {links.map(({ to, label }) => (
                        <li key={to}>
                            <NavLink to={to} className={({ isActive }) => (isActive ? 'active' : '')}>{label}</NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className={`${prefix}dt`}>
                <p>{date} {time}</p>
                <p className={`${prefix}wish`}>{wish}</p>
            </div>
            <button
                className={`${prefix}hamburger-menu`}
                onClick={() => setMenuOpen((open) => !open)}
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
            >
                ☰
            </button>
        </>
    );
}
