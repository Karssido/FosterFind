import React from 'react';
import DirectoryPage from '../../components/DirectoryPage/DirectoryPage';
import heroImage from '../../assets/images/bg5.jpg';

export default function Hospital() {
  return (
    <DirectoryPage
      dataFile="hospitals.json"
      title="Find Hospitals"
      subtitle="Search hospitals and healthcare centres across India by state, city or name."
      heroImage={heroImage}
    />
  );
}
