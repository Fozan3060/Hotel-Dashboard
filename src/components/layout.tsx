import React from 'react';

import Header from './Header';
import { Outlet } from 'react-router'
import Sidebar from './sidebar';

const Layout = () => {
  return (
    <div className="flex">

        <Sidebar />
          <Header />
        <main className="mt-20 ">
          <Outlet />
        </main>
    </div>
  );
};

export default Layout;
