import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from "react-router";
import Layout from './components/layout';
import Booking from './components/Booking';
import Cabin from './components/Cabin';
import Users from './components/Users';
import Settings from './components/Settings';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Layout />} />
        <Route path="/" element={<Layout />} >
          <Route path="booking" element={<Booking />} />
          <Route path="cabin" element={<Cabin />} />
          <Route path="users" element={<Users />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
