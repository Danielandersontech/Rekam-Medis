import React, { useState, useEffect } from 'react';
import { Search, Bell, BarChart3, Settings, User, LogOut } from 'lucide-react';
import { authUtils } from '../../services/authUtils';

export default function Header() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = authUtils.getCurrentUser();
    setCurrentUser(user);
  }, []);

  const handleLogout = () => {
    if (window.confirm('Apakah Anda yakin ingin keluar?')) {
      authUtils.logout();
    }
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

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
          
          {/* User dropdown with name display */}
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost rounded-btn flex items-center gap-2">
              <div className="avatar">
                <div className="w-8 rounded-full bg-primary text-primary-content flex items-center justify-center text-sm font-bold">
                  {currentUser ? getInitials(currentUser.nama) : 'U'}
                </div>
              </div>
              <span className="hidden md:inline-block text-sm font-medium">
                {currentUser ? currentUser.nama.split(' ')[0] : 'User'}
              </span>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              {currentUser && (
                <li className="menu-title">
                  <span>{currentUser.nama}</span>
                </li>
              )}
              <li>
                <a className="justify-between">
                  <span className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Profil
                  </span>
                  <span className="badge">Baru</span>
                </a>
              </li>
              <li>
                <a className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Pengaturan
                </a>
              </li>
              <div className="divider my-1"></div>
              <li>
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-error"
                >
                  <LogOut className="h-4 w-4" />
                  Keluar
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}