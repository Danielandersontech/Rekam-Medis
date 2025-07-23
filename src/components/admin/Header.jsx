import React from 'react';
import { Search, Bell, BarChart3, Settings } from 'lucide-react';

export default function Header() {
  return (
    <div className="navbar bg-base-100 shadow-sm border-b border-base-300 px-4">
      <div className="navbar-start">
        <div className="relative w-full max-w-md">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Cari pasien, dokter, atau data lainnya..."
              className="input input-bordered input-primary w-full pl-10 pr-4 py-2"
            />
            <Search className="absolute left-3 h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>
      
      <div className="navbar-end">
        <div className="flex items-center gap-2">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <div className="indicator">
                <Bell className="h-5 w-5" />
                <span className="badge badge-xs badge-primary indicator-item">3</span>
              </div>
            </div>
            <div tabIndex={0} className="dropdown-content z-[1] card card-compact w-64 p-2 shadow bg-base-100">
              <div className="card-body">
                <h3 className="font-bold">Notifikasi</h3>
                <p className="text-sm">3 appointment baru hari ini</p>
              </div>
            </div>
          </div>
          
          <button className="btn btn-ghost btn-circle">
            <BarChart3 className="h-5 w-5" />
          </button>
          
          <button className="btn btn-ghost btn-circle">
            <Settings className="h-5 w-5" />
          </button>
          
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img alt="Profile" src="https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=400" />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <a className="justify-between">
                  Profil
                  <span className="badge">Baru</span>
                </a>
              </li>
              <li><a>Pengaturan</a></li>
              <li><a>Keluar</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}