import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/admin/Header';
import Sidebar from '../components//admin/Sidebar';

export default function AdminLayout() {
  return (
    <div className="drawer lg:drawer-open">
      <input id="drawer-toggle" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <Header />
        <main className="flex-1 p-6 bg-base-200 min-h-screen">
          <Outlet />
        </main>
      </div>
      <Sidebar />
    </div>
  );
}