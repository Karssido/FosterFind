import React from 'react';
import DirectoryPage from '../../components/DirectoryPage/DirectoryPage';
import heroImage from '../../assets/images/bg1.jpg';

export default function Orphanage() {
  return (
    <DirectoryPage
      dataFile="orphanages.json"
      title="Find Orphanages"
      subtitle="Discover orphanages and children's homes near you, and reach out to support them."
      heroImage={heroImage}
    />
  );
}
