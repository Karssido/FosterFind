import React from 'react';
import DirectoryPage from '../../components/DirectoryPage/DirectoryPage';
import heroImage from '../../assets/images/bg4.jpg';

export default function OldAgeHome() {
  return (
    <DirectoryPage
      dataFile="oldAgeHomes.json"
      title="Find Old Age Homes"
      subtitle="Look up old age homes and elder care facilities by state, city or name."
      heroImage={heroImage}
    />
  );
}
