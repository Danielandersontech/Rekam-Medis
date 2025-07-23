import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    UserCheck,
    Building2,
    Calendar,
    CalendarCheck,
    FileText,
    Pill,
    Heart
} from 'lucide-react';

export default function Sidebar() {
    const location = useLocation();
    
    const menuClass = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
            ? 'bg-primary text-primary-content font-semibold'
            : 'text-base-content hover:bg-base-200'
        }`;

    // Periksa apakah path saat ini adalah root path
    const isDashboardActive = location.pathname === '/admin' || location.pathname === '/admin/';

    return (
        <div className="drawer-side">
            <label htmlFor="drawer-toggle" className="drawer-overlay"></label>
            <aside className="w-72 min-h-full bg-base-100 shadow-xl">
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 bg-primary rounded-lg">
                            <Heart className="h-8 w-8 text-primary-content" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-primary">MediCare</h1>
                            <p className="text-sm text-base-content/70">Sistem Rekam Medis</p>
                        </div>
                    </div>

                    <nav className="space-y-2">
                        <NavLink 
                            to="/admin" 
                            className={menuClass}
                            end // Tambahkan prop end untuk exact matching
                        >
                            <LayoutDashboard className="h-5 w-5" />
                            Dashboard
                        </NavLink>

                        <NavLink to="/admin/pasien" className={menuClass}>
                            <Users className="h-5 w-5" />
                            Data Pasien
                        </NavLink>

                        <NavLink to="/admin/dokter" className={menuClass}>
                            <UserCheck className="h-5 w-5" />
                            Data Dokter
                        </NavLink>

                        <NavLink to="/admin/poli" className={menuClass}>
                            <Building2 className="h-5 w-5" />
                            Poliklinik
                        </NavLink>

                        <NavLink to="/admin/jadwal-dokter" className={menuClass}>
                            <Calendar className="h-5 w-5" />
                            Jadwal Dokter
                        </NavLink>

                        <NavLink to="/admin/temu-janji" className={menuClass}>
                            <CalendarCheck className="h-5 w-5" />
                            Appointment
                        </NavLink>

                        <NavLink to="/admin/rekam-medis" className={menuClass}>
                            <FileText className="h-5 w-5" />
                            Rekam Medis
                        </NavLink>

                        <NavLink to="/admin/resep-obat" className={menuClass}>
                            <Pill className="h-5 w-5" />
                            Resep Obat
                        </NavLink>
                    </nav>
                </div>

                <div className="mt-auto p-6">
                    <div className="card bg-primary text-primary-content">
                        <div className="card-body">
                            <h2 className="card-title text-sm">Sistem Terintegrasi</h2>
                            <p className="text-xs opacity-80">
                                Kelola seluruh data medis dengan mudah dan aman
                            </p>
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    );
}