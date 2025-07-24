import React, { useState, useEffect, useCallback } from 'react';
import { Users, UserCheck, CalendarCheck, FileText, TrendingUp, Clock, AlertCircle, Plus, Activity, RefreshCw } from 'lucide-react';
import { dashboardAPI } from '../../services/dashboardAPI';
import { useNavigate } from 'react-router-dom';

export default function DashboardAdmin() {
  const [dashboardData, setDashboardData] = useState({
    stats: {
      totalPasien: 0,
      dokterAktif: 0,
      appointmentHariIni: 0,
      totalRekamMedis: 0,
      totalAppointments: 0
    },
    todayAppointments: [],
    recentActivities: [],
    statusSummary: {
      antri: 0,
      berlangsung: 0,
      selesai: 0,
      dibatalkan: 0
    },
    systemAlerts: [],
    monthlyTrends: [],
    doctorPerformance: [],
    lastUpdated: null
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const navigate = useNavigate();

  // Load dashboard data function
  const loadDashboardData = useCallback(async (showRefreshIndicator = false) => {
    try {
      if (showRefreshIndicator) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }
      
      setError('');
      
      console.log('Starting to load dashboard data...');
      const data = await dashboardAPI.fetchAllDashboardData();
      
      console.log('Dashboard data loaded:', data);
      setDashboardData(data);
      
    } catch (err) {
      const errorMessage = 'Gagal memuat data dashboard. Silakan coba lagi.';
      setError(errorMessage);
      console.error('Error loading dashboard data:', err);
      
      // Show error alert
      if (typeof window !== 'undefined' && window.alert) {
        setTimeout(() => {
          window.alert(`Error: ${err.message || errorMessage}`);
        }, 100);
      }
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  // Initial data load
  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  // Auto refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      loadDashboardData(true);
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, [loadDashboardData]);

  // Manual refresh handler
  const handleRefresh = () => {
    loadDashboardData(true);
  };

  // Statistics configuration
  const stats = [
    {
      title: 'Total Pasien',
      value: dashboardData.stats.totalPasien,
      change: '+12%',
      icon: Users,
      color: 'bg-blue-500',
      textColor: 'text-blue-600'
    },
    {
      title: 'Dokter Aktif',
      value: dashboardData.stats.dokterAktif,
      change: '+3%',
      icon: UserCheck,
      color: 'bg-green-500',
      textColor: 'text-green-600'
    },
    {
      title: 'Appointment Hari Ini',
      value: dashboardData.stats.appointmentHariIni,
      change: '+8%',
      icon: CalendarCheck,
      color: 'bg-yellow-500',
      textColor: 'text-yellow-600'
    },
    {
      title: 'Rekam Medis',
      value: dashboardData.stats.totalRekamMedis,
      change: '+15%',
      icon: FileText,
      color: 'bg-purple-500',
      textColor: 'text-purple-600'
    }
  ];

  // Status badge helper
  const getStatusBadge = (status) => {
    const statusMap = {
      'selesai': 'badge badge-success',
      'berlangsung': 'badge badge-warning',
      'antri': 'badge badge-info',
      'dibatalkan': 'badge badge-error'
    };
    return statusMap[status] || 'badge badge-ghost';
  };

  // Alert icon helper
  const getAlertIcon = (iconName) => {
    const iconMap = {
      'AlertCircle': AlertCircle,
      'Clock': Clock,
      'Activity': Activity
    };
    return iconMap[iconName] || AlertCircle;
  };

  // Time formatter
  const formatTime = (dateTime) => {
    try {
      return new Date(dateTime).toLocaleTimeString('id-ID', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false
      });
    } catch (error) {
      console.error('Error formatting time:', error);
      return 'Invalid Time';
    }
  };

  // Date formatter
  const formatDate = (dateTime) => {
    try {
      return new Date(dateTime).toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid Date';
    }
  };

  // Navigation handler
  const handleQuickAction = (path) => {
    try {
      navigate(path);
    } catch (error) {
      console.error('Navigation error:', error);
      setError('Gagal navigasi ke halaman yang diminta');
    }
  };

  // Retry handler
  const handleRetry = () => {
    setError('');
    loadDashboardData();
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-base-content">Dashboard</h1>
          <p className="text-base-content/70 mt-1">Selamat datang di sistem rekam medis MediCare</p>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Refresh Button */}
          <button 
            onClick={handleRefresh}
            disabled={isRefreshing || isLoading}
            className={`btn btn-outline btn-sm ${isRefreshing ? 'loading' : ''}`}
            title="Refresh data"
          >
            {!isRefreshing && <RefreshCw className="h-4 w-4" />}
            {isRefreshing ? 'Memuat...' : 'Refresh'}
          </button>
          
          {/* Date Display */}
          <div className="text-right">
            <p className="text-sm text-base-content/70">Hari ini</p>
            <p className="text-lg font-semibold">
              {new Date().toLocaleDateString('id-ID', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
            {dashboardData.lastUpdated && (
              <p className="text-xs text-base-content/50">
                Update terakhir: {formatTime(dashboardData.lastUpdated)}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="alert alert-error shadow-lg">
          <AlertCircle className="h-5 w-5" />
          <div className="flex-1">
            <h3 className="font-semibold">Terjadi Kesalahan</h3>
            <div className="text-sm opacity-80">{error}</div>
          </div>
          <div className="flex gap-2">
            <button className="btn btn-sm btn-ghost" onClick={handleRetry}>
              Coba Lagi
            </button>
            <button className="btn btn-sm btn-ghost" onClick={() => setError('')}>
              ×
            </button>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-12">
          <span className="loading loading-spinner loading-lg mb-4"></span>
          <p className="text-base-content/70">Memuat data dashboard...</p>
        </div>
      )}

      {/* Stats Grid */}
      {!isLoading && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
                <div className="card-body">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-base-content/70 text-sm font-medium">{stat.title}</p>
                      <p className="text-3xl font-bold mt-1 mb-2">{stat.value.toLocaleString('id-ID')}</p>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-3 w-3 text-success" />
                        <span className="text-success text-xs font-medium">{stat.change}</span>
                        <span className="text-base-content/50 text-xs">vs bulan lalu</span>
                      </div>
                    </div>
                    <div className={`p-4 rounded-xl ${stat.color}`}>
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
              <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="card-title text-xl">Appointment Hari Ini</h2>
                    <button 
                      className="btn btn-primary btn-sm"
                      onClick={() => handleQuickAction('/admin/temu-janji')}
                    >
                      Lihat Semua
                    </button>
                  </div>
                  
                  {dashboardData.todayAppointments.length === 0 ? (
                    <div className="text-center py-12">
                      <CalendarCheck className="h-16 w-16 mx-auto text-base-content/30 mb-4" />
                      <p className="text-base-content/70 text-lg">Belum ada appointment hari ini</p>
                      <p className="text-base-content/50 text-sm mt-2">Appointment yang dibuat akan muncul di sini</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="table table-zebra">
                        <thead>
                          <tr>
                            <th className="font-semibold">Pasien</th>
                            <th className="font-semibold">Dokter</th>
                            <th className="font-semibold">Waktu</th>
                            <th className="font-semibold">Poliklinik</th>
                            <th className="font-semibold">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {dashboardData.todayAppointments.map((appointment) => (
                            <tr key={appointment.id} className="hover">
                              <td>
                                <div className="font-medium">{appointment.pasien_nama}</div>
                                {appointment.pasien_telepon && (
                                  <div className="text-sm text-base-content/70">{appointment.pasien_telepon}</div>
                                )}
                              </td>
                              <td className="font-medium">{appointment.dokter_nama}</td>
                              <td>
                                <div className="flex items-center gap-2">
                                  <Clock className="h-4 w-4 text-base-content/70" />
                                  <span className="font-mono">{formatTime(appointment.tgl_kunjungan)}</span>
                                </div>
                              </td>
                              <td>{appointment.poli_nama}</td>
                              <td>
                                <div className={`${getStatusBadge(appointment.status)} font-medium`}>
                                  {appointment.status}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                  <h2 className="card-title text-xl mb-6">Aksi Cepat</h2>
                  <div className="space-y-3">
                    <button 
                      className="btn btn-primary w-full justify-start gap-3 h-12"
                      onClick={() => handleQuickAction('/admin/pasien')}
                    >
                      <Users className="h-5 w-5" />
                      <span className="text-left flex-1">Tambah Pasien Baru</span>
                    </button>
                    <button 
                      className="btn btn-secondary w-full justify-start gap-3 h-12"
                      onClick={() => handleQuickAction('/admin/temu-janji')}
                    >
                      <CalendarCheck className="h-5 w-5" />
                      <span className="text-left flex-1">Buat Appointment</span>
                    </button>
                    <button 
                      className="btn btn-accent w-full justify-start gap-3 h-12"
                      onClick={() => handleQuickAction('/admin/rekam-medis')}
                    >
                      <FileText className="h-5 w-5" />
                      <span className="text-left flex-1">Input Rekam Medis</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* System Alerts */}
              <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                  <h2 className="card-title text-xl mb-6">Peringatan Sistem</h2>
                  {dashboardData.systemAlerts.length === 0 ? (
                    <div className="text-center py-6">
                      <Activity className="h-12 w-12 mx-auto text-success mb-3" />
                      <p className="text-base-content/70">Semua sistem berjalan normal</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {dashboardData.systemAlerts.map((alert, index) => {
                        const IconComponent = getAlertIcon(alert.icon);
                        return (
                          <div 
                            key={index} 
                            className={`alert alert-${alert.type} shadow-sm`}
                          >
                            <IconComponent className="h-5 w-5" />
                            <span className="text-sm font-medium">{alert.message}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Appointment Status Summary */}
              <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                  <h2 className="card-title text-xl mb-6">Status Appointment</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-base-content/70">Menunggu</span>
                      <div className="flex items-center gap-2">
                        <div className="badge badge-info">{dashboardData.statusSummary.antri}</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-base-content/70">Berlangsung</span>
                      <div className="flex items-center gap-2">
                        <div className="badge badge-warning">{dashboardData.statusSummary.berlangsung}</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-base-content/70">Selesai</span>
                      <div className="flex items-center gap-2">
                        <div className="badge badge-success">{dashboardData.statusSummary.selesai}</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-base-content/70">Dibatalkan</span>
                      <div className="flex items-center gap-2">
                        <div className="badge badge-error">{dashboardData.statusSummary.dibatalkan}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          {dashboardData.recentActivities.length > 0 && (
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h2 className="card-title text-xl mb-6">Aktivitas Terbaru</h2>
                <div className="space-y-4">
                  {dashboardData.recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-base-200 transition-colors">
                      <div className="avatar placeholder">
                        <div className="bg-neutral text-neutral-content rounded-full w-10 h-10">
                          <span className="text-xs">{activity.pasien_nama.charAt(0)}</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{activity.description}</p>
                        <p className="text-sm text-base-content/70">
                          {formatDate(activity.created_at)} • {formatTime(activity.created_at)}
                        </p>
                      </div>
                      <div className={`badge ${getStatusBadge(activity.status)}`}>
                        {activity.status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Doctor Performance */}
          {dashboardData.doctorPerformance.length > 0 && (
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h2 className="card-title text-xl mb-6">Performa Dokter</h2>
                <div className="overflow-x-auto">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Nama Dokter</th>
                        <th>Total Appointment</th>
                        <th>Selesai</th>
                        <th>Tingkat Penyelesaian</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboardData.doctorPerformance.map((doctor) => (
                        <tr key={doctor.id}>
                          <td className="font-medium">{doctor.nama}</td>
                          <td>{doctor.totalAppointments}</td>
                          <td>{doctor.completedAppointments}</td>
                          <td>
                            <div className="flex items-center gap-2">
                              <div className="w-20 bg-base-200 rounded-full h-2">
                                <div 
                                  className="bg-success h-2 rounded-full" 
                                  style={{ width: `${doctor.completionRate}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium">{doctor.completionRate}%</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}