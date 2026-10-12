import React from 'react';
import './Header.css';
import NavMenu from '../NavMenu/NavMenu';

export default function Header() {
    return (
        <div className='header'>
            <h1>FosterFind</h1>
            <NavMenu />
        </div>
    );
}
