import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Hospital from './pages/Hospital/Hospital';
import Orphanage from './pages/Orphanage/Orphanage';
import OldAgeHome from './pages/OldAgeHome/OldAgeHome';
import AboutUs from './pages/AboutUs/AboutUs';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      {/* Homepage without Layout */}
      <Route path="/" element={<App />} />

      {/* All other routes wrapped in Layout */}
      <Route element={<Layout />}>
        <Route path="find-hospitals" element={<Hospital />} />
        <Route path="find-orphanages" element={<Orphanage />} />
        <Route path="find-oldAgeHomes" element={<OldAgeHome />} />
        <Route path="about-us" element={<AboutUs />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

reportWebVitals();