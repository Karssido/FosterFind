import React from 'react';
import PageHero from '../../components/Common/PageHero/PageHero';
import AboutUsContent from './AboutUsContent';
import heroImage from '../../assets/images/bg2.jpg';

export default function AboutUs() {
  return (
    <>
      <PageHero title="About FosterFind" subtitle="Connecting people in need with the care and support around them." image={heroImage} />
      <AboutUsContent />
    </>
  );
}
