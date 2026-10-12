import React from 'react';
import './PageHero.css';

export default function PageHero({ title, subtitle, image }) {
    return (
        <section className="page-hero" style={{ backgroundImage: `url(${image})` }}>
            <div className="page-hero-overlay"></div>
            <h2 className="page-hero-title">{title}</h2>
            <span className="page-hero-accent"></span>
            {subtitle && <p className="page-hero-subtitle">{subtitle}</p>}
        </section>
    );
}
