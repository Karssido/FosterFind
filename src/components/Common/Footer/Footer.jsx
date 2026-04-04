import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

export default function Footer() {
  return (
    <div className='footer'>
      <ul>
        <li><FontAwesomeIcon icon={faTwitter} className="icon" /></li>
        <li><FontAwesomeIcon icon={faLinkedin} className="icon" /></li>        
        <li>
          <button
            className="icon-button"
            aria-label="Show phone number"
            onClick={() => alert('Need Help? Call us at +91 9911264235')}
          >
            <FontAwesomeIcon icon={faPhone} className="icon" />
          </button>
        </li>
        <li>
          <a href="https://www.instagram.com/fosterfind?igsh=enBwY2p5MGNnZXVh" className="icon-link" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} className="icon" />
          </a>

        </li>
        <li>
          <a href="mailto:fosterfind376@gmail.com" className="icon-link">
            <FontAwesomeIcon icon={faEnvelope} className="icon" />
          </a>
        </li>
      </ul>
    </div>
  );
}
