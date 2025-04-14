import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from "react-router";
import Layout from './components/layout';
import Booking from './components/Booking';
import Cabin from './components/Cabin';
import Users from './components/Users';
import Settings from './components/Settings';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient()
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
};

export default App;
