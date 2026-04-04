import React from 'react';
import Header from '../Common/Header/Header';
import Footer from '../Common/Footer/Footer';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className='layout'>
      <Header />
      <Outlet />
      <Footer /> {/* Always render Footer */}
    </div>
  );
}