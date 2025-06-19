import React from 'react';
import { Users, UserCheck, CalendarCheck, FileText, TrendingUp, Clock, AlertCircle } from 'lucide-react';

export default function DashboardAdmin() {
  const stats = [
    {
      title: 'Total Pasien',
      value: '1,234',
      change: '+12%',
      icon: Users,
      color: 'bg-primary',
    },
    {
      title: 'Dokter Aktif',
      value: '45',
      change: '+3%',
      icon: UserCheck,
      color: 'bg-secondary',
    },
    {
      title: 'Appointment Hari Ini',
      value: '28',
      change: '+8%',
      icon: CalendarCheck,
      color: 'bg-accent',
    },
    {
      title: 'Rekam Medis',
      value: '2,156',
      change: '+15%',
      icon: FileText,
      color: 'bg-success',
    },
  ];

  const recentAppointments = [
    {
      id: 1,
      patient: 'Sari Dewi',
      doctor: 'Dr. Ahmad Fadli',
      time: '09:00',
      status: 'Menunggu',
      type: 'Konsultasi',
    },
    {
      id: 2,
      patient: 'Budi Santoso',
      doctor: 'Dr. Maya Sari',
      time: '10:30',
      status: 'Berlangsung',
      type: 'Pemeriksaan',
    },
    {
      id: 3,
      patient: 'Lisa Andriani',
      doctor: 'Dr. Reza Pratama',
      time: '14:00',
      status: 'Selesai',
      type: 'Kontrol',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-base-content">Dashboard</h1>
          <p className="text-base-content/70">Selamat datang di sistem rekam medis MediCare</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-base-content/70">Hari ini</p>
          <p className="text-lg font-semibold">{new Date().toLocaleDateString('id-ID', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="card bg-base-100 shadow-sm">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-base-content/70 text-sm">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3 text-success" />
                    <span className="text-success text-xs">{stat.change}</span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Appointments */}
        <div className="lg:col-span-2">
          <div className="card bg-base-100 shadow-sm">
            <div className="card-body">
              <div className="flex items-center justify-between mb-4">
                <h2 className="card-title">Appointment Hari Ini</h2>
                <button className="btn btn-primary btn-sm">Lihat Semua</button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="table table-zebra">
                  <thead>
                    <tr>
                      <th>Pasien</th>
                      <th>Dokter</th>
                      <th>Waktu</th>
                      <th>Jenis</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentAppointments.map((appointment) => (
                      <tr key={appointment.id}>
                        <td className="font-medium">{appointment.patient}</td>
                        <td>{appointment.doctor}</td>
                        <td>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {appointment.time}
                          </div>
                        </td>
                        <td>{appointment.type}</td>
                        <td>
                          <div className={`badge ${
                            appointment.status === 'Selesai' ? 'badge-success' :
                            appointment.status === 'Berlangsung' ? 'badge-warning' :
                            'badge-info'
                          }`}>
                            {appointment.status}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions & Alerts */}
        <div className="space-y-6">
          <div className="card bg-base-100 shadow-sm">
            <div className="card-body">
              <h2 className="card-title mb-4">Aksi Cepat</h2>
              <div className="space-y-3">
                <button className="btn btn-primary w-full justify-start">
                  <Users className="h-4 w-4" />
                  Tambah Pasien Baru
                </button>
                <button className="btn btn-secondary w-full justify-start">
                  <CalendarCheck className="h-4 w-4" />
                  Buat Appointment
                </button>
                <button className="btn btn-accent w-full justify-start">
                  <FileText className="h-4 w-4" />
                  Input Rekam Medis
                </button>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-sm">
            <div className="card-body">
              <h2 className="card-title mb-4">Peringatan</h2>
              <div className="space-y-3">
                <div className="alert alert-warning">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm">5 pasien menunggu konfirmasi</span>
                </div>
                <div className="alert alert-info">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">3 appointment terlambat</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}