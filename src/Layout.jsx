// import React from 'react';
// import Header from './Header/Header';
// import Footer from './Footer/Footer';
// import { useLocation } from 'react-router-dom';

// export default function Layout({ children }) {
//   const location = useLocation(); 
//   const isHomePage = location.pathname === '/';
//   return (
//     <div className='layout'>
//       {!isHomePage && <Header />}
//       {children}
//       <Footer />
//     </div>
//   );
// }

import React from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
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