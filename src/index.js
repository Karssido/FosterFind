import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Hospital from './Pages/Hospital';
import Orphanage from './Pages/Orphanage';
import OldAgeHome from './Pages/OldAgeHome';
import AboutUs from './Pages/AboutUs';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="find-hospitals" element={<Hospital />} />
        <Route path="find-orphanages" element={<Orphanage />} />
        <Route path="find-oldAgeHomes" element={<OldAgeHome />} />
        <Route path="about-us" element={<AboutUs />} />
       
      </Routes>
    </Layout>
  </BrowserRouter>
);

reportWebVitals();