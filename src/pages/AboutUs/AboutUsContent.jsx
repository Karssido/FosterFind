import React from 'react';
import '../AboutUs/AboutUs.css';

export default function AboutUsContent() {
  return (
    <div className='about-us'>
      <div className='about-us-info'>
        <h2 className='about-us-title'>"Where Rights Meet Compassion"</h2>
        <p className='about-us-description'>
          <b>FosterFind</b> is a website dedicated to connecting people in need with resources and support. It offers a search-and-find engine for hospitals, orphanages, and old-age homes, making it easy to discover and connect with these establishments nearby.
        </p>
        <p className='about-us-description'>
          Our motto, <i>"Where rights meet compassion"</i>, reflects our commitment to inclusivity.
        </p>
        <p className='about-us-description'>
          Recognizing that everyone may need assistance, we will soon launch a page for helpful government resources, including schemes and detailed information.
        </p>
        <p className='about-us-description'>
          At FosterFind, we believe in the power of compassion and empathy, regardless of one's circumstances. Our website embodies this principle, aiming to make a positive impact on lives.
        </p>
      </div>
    </div>
  );
}
