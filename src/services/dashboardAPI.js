import axios from "axios";

const BASE_URL = "https://znhejugzzdxpiufabkea.supabase.co/rest/v1";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpuaGVqdWd6emR4cGl1ZmFia2VhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzMTc5OTAsImV4cCI6MjA2ODg5Mzk5MH0.XS21EZHK5eiLeeXrBAjyC7pnCc01ibacaxfH0xoX9Ko";

const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
    "Prefer": "return=representation"
};

export const dashboardAPI = {
    // Fetch dashboard statistics
    async fetchDashboardStats() {
        try {
            console.log('Fetching dashboard statistics...');

            // Fetch all statistics in parallel using correct Supabase PostgREST syntax
            const [
                pasienResponse,
                dokterResponse,
                appointmentResponse,
                rekamMedisResponse
            ] = await Promise.all([
                axios.get(`${BASE_URL}/pasien?select=id,status`, { headers }),
                axios.get(`${BASE_URL}/dokter?select=id`, { headers }),
                axios.get(`${BASE_URL}/appointments?select=id,status,created_at`, { headers }),
                axios.get(`${BASE_URL}/rekam_medis?select=id,status`, { headers })
            ]);

            console.log('Raw data responses:', {
                pasien: pasienResponse.data,
                dokter: dokterResponse.data,
                appointments: appointmentResponse.data,
                rekamMedis: rekamMedisResponse.data
            });

            // Count with proper validation
            const totalPasien = pasienResponse.data?.filter(p => p.status === 'Aktif').length || 0;
            const dokterAktif = dokterResponse.data?.length || 0;
            const totalAppointments = appointmentResponse.data?.length || 0;
            const totalRekamMedis = rekamMedisResponse.data?.filter(r => r.status === 'Aktif').length || 0;

            // Get today's appointments count - fix date filtering
            const today = new Date();
            const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString();
            const todayEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1).toISOString();
            
            const appointmentHariIni = appointmentResponse.data?.filter(a => {
                if (!a.created_at) return false;
                const appointmentDate = new Date(a.created_at);
                const todayDate = new Date();
                return appointmentDate.toDateString() === todayDate.toDateString();
            }).length || 0;

            const stats = {
                totalPasien,
                dokterAktif,
                appointmentHariIni,
                totalRekamMedis,
                totalAppointments
            };

            console.log('Calculated stats:', stats);
            return stats;

        } catch (error) {
            console.error('Error fetching dashboard stats:', error.response?.data || error.message);
            throw new Error('Gagal memuat statistik dashboard: ' + (error.response?.data?.message || error.message));
        }
    },

    // Fetch today's appointments with relations
    async fetchTodayAppointments() {
        try {
            console.log('Fetching today appointments...');
            
            const today = new Date();
            const todayStart = today.toISOString().split('T')[0] + 'T00:00:00';
            const todayEnd = today.toISOString().split('T')[0] + 'T23:59:59';

            // Fetch appointments for today with proper filter
            const appointmentResponse = await axios.get(`${BASE_URL}/appointments`, {
                headers,
                params: {
                    'tgl_kunjungan': `gte.${todayStart}`,
                    'tgl_kunjungan': `lte.${todayEnd}`,
                    'order': 'tgl_kunjungan.asc',
                    'limit': 10
                }
            });

            const appointments = appointmentResponse.data || [];
            console.log('Raw today appointments:', appointments);

            if (appointments.length === 0) {
                return [];
            }

            // Get unique IDs for batch fetching
            const pasienIds = [...new Set(appointments.map(a => a.id_pasien))];
            const dokterIds = [...new Set(appointments.map(a => a.id_dokter))];
            const poliIds = [...new Set(appointments.map(a => a.id_poli))];

            // Batch fetch related data
            const [pasienData, dokterData, poliData] = await Promise.all([
                // Fetch all required patients
                pasienIds.length > 0 ? 
                    axios.get(`${BASE_URL}/pasien?id=in.(${pasienIds.join(',')})&select=id,nama,telepon`, { headers })
                    .then(res => res.data || []) : [],
                
                // Fetch all required doctors
                dokterIds.length > 0 ? 
                    axios.get(`${BASE_URL}/dokter?id=in.(${dokterIds.join(',')})&select=id,nama`, { headers })
                    .then(res => res.data || []) : [],
                    
                // Fetch all required poli
                poliIds.length > 0 ? 
                    axios.get(`${BASE_URL}/poli?id=in.(${poliIds.join(',')})&select=id,nama_poli`, { headers })
                    .then(res => res.data || []) : []
            ]);

            // Create lookup maps for efficient data joining
            const pasienMap = pasienData.reduce((map, p) => {
                map[p.id] = p;
                return map;
            }, {});

            const dokterMap = dokterData.reduce((map, d) => {
                map[d.id] = d;
                return map;
            }, {});

            const poliMap = poliData.reduce((map, p) => {
                map[p.id] = p;
                return map;
            }, {});

            // Join data efficiently
            const appointmentsWithRelations = appointments.map(appointment => {
                const pasien = pasienMap[appointment.id_pasien];
                const dokter = dokterMap[appointment.id_dokter];
                const poli = poliMap[appointment.id_poli];

                return {
                    ...appointment,
                    pasien_nama: pasien?.nama || 'Unknown Patient',
                    pasien_telepon: pasien?.telepon || '',
                    dokter_nama: dokter?.nama || 'Unknown Doctor',
                    poli_nama: poli?.nama_poli || 'Unknown Poli'
                };
            });

            console.log('Today appointments with relations:', appointmentsWithRelations);
            return appointmentsWithRelations;

        } catch (error) {
            console.error('Error fetching today appointments:', error.response?.data || error.message);
            return [];
        }
    },

    // Fetch recent activities (appointments from last 7 days)
    async fetchRecentActivities() {
        try {
            console.log('Fetching recent activities...');
            
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
            const startDate = sevenDaysAgo.toISOString();

            const response = await axios.get(`${BASE_URL}/appointments`, {
                headers,
                params: {
                    'created_at': `gte.${startDate}`,
                    'order': 'created_at.desc',
                    'limit': 5,
                    'select': 'id,created_at,status,id_pasien'
                }
            });

            const activities = response.data || [];
            
            if (activities.length === 0) {
                return [];
            }

            // Get patient names for activities
            const pasienIds = [...new Set(activities.map(a => a.id_pasien))];
            const pasienData = pasienIds.length > 0 ? 
                await axios.get(`${BASE_URL}/pasien?id=in.(${pasienIds.join(',')})&select=id,nama`, { headers })
                .then(res => res.data || []) : [];

            const pasienMap = pasienData.reduce((map, p) => {
                map[p.id] = p;
                return map;
            }, {});

            const activitiesWithNames = activities.map(activity => {
                const pasien = pasienMap[activity.id_pasien];
                const pasienNama = pasien?.nama || 'Unknown Patient';
                
                return {
                    ...activity,
                    pasien_nama: pasienNama,
                    type: 'appointment',
                    description: `Appointment dibuat untuk ${pasienNama}`
                };
            });

            return activitiesWithNames;

        } catch (error) {
            console.error('Error fetching recent activities:', error.response?.data || error.message);
            return [];
        }
    },

    // Fetch appointment status summary
    async fetchAppointmentStatusSummary() {
        try {
            console.log('Fetching appointment status summary...');
            
            const response = await axios.get(`${BASE_URL}/appointments?select=status`, { headers });
            const appointments = response.data || [];

            const summary = {
                antri: appointments.filter(a => a.status === 'antri').length,
                berlangsung: appointments.filter(a => a.status === 'berlangsung').length,
                selesai: appointments.filter(a => a.status === 'selesai').length,
                dibatalkan: appointments.filter(a => a.status === 'dibatalkan').length
            };

            console.log('Appointment status summary:', summary);
            return summary;

        } catch (error) {
            console.error('Error fetching appointment status summary:', error.response?.data || error.message);
            return { antri: 0, berlangsung: 0, selesai: 0, dibatalkan: 0 };
        }
    },

    // Fetch system alerts/notifications
    async fetchSystemAlerts() {
        try {
            console.log('Fetching system alerts...');
            
            const alerts = [];
            
            // Check for pending appointments
            const pendingResponse = await axios.get(`${BASE_URL}/appointments?status=eq.antri&select=id`, { headers });
            const pendingCount = pendingResponse.data?.length || 0;
            
            if (pendingCount > 0) {
                alerts.push({
                    type: 'warning',
                    message: `${pendingCount} pasien menunggu konfirmasi`,
                    icon: 'AlertCircle'
                });
            }

            // Check for overdue appointments (appointments that should have started)
            const now = new Date().toISOString();
            const overdueResponse = await axios.get(`${BASE_URL}/appointments`, {
                headers,
                params: {
                    'status': 'eq.antri',
                    'tgl_kunjungan': `lt.${now}`,
                    'select': 'id'
                }
            });
            
            const overdueCount = overdueResponse.data?.length || 0;
            if (overdueCount > 0) {
                alerts.push({
                    type: 'error',
                    message: `${overdueCount} appointment terlambat`,
                    icon: 'Clock'
                });
            }

            // Check database connection
            try {
                await axios.get(`${BASE_URL}/pasien?limit=1&select=id`, { headers });
                alerts.push({
                    type: 'success',
                    message: 'Database terhubung normal',
                    icon: 'Activity'
                });
            } catch (error) {
                alerts.push({
                    type: 'error',
                    message: 'Masalah koneksi database',
                    icon: 'AlertCircle'
                });
            }

            return alerts;

        } catch (error) {
            console.error('Error fetching system alerts:', error.response?.data || error.message);
            return [{
                type: 'error',
                message: 'Gagal memuat peringatan sistem',
                icon: 'AlertCircle'
            }];
        }
    },

    // Get monthly appointment trends (last 6 months)
    async fetchMonthlyTrends() {
        try {
            console.log('Fetching monthly trends...');
            
            const sixMonthsAgo = new Date();
            sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
            
            const response = await axios.get(`${BASE_URL}/appointments`, {
                headers,
                params: {
                    'created_at': `gte.${sixMonthsAgo.toISOString()}`,
                    'select': 'created_at,status',
                    'order': 'created_at.desc'
                }
            });

            const appointments = response.data || [];
            
            // Group by month
            const monthlyData = {};
            appointments.forEach(appointment => {
                const date = new Date(appointment.created_at);
                const month = date.toLocaleDateString('id-ID', { year: 'numeric', month: 'short' });
                if (!monthlyData[month]) {
                    monthlyData[month] = { total: 0, selesai: 0 };
                }
                monthlyData[month].total++;
                if (appointment.status === 'selesai') {
                    monthlyData[month].selesai++;
                }
            });

            // Convert to array format and sort by date
            const trends = Object.keys(monthlyData)
                .map(month => ({
                    month,
                    total: monthlyData[month].total,
                    selesai: monthlyData[month].selesai
                }))
                .slice(-6); // Last 6 months

            return trends;

        } catch (error) {
            console.error('Error fetching monthly trends:', error.response?.data || error.message);
            return [];
        }
    },

    // Fetch doctor performance summary
    async fetchDoctorPerformance() {
        try {
            console.log('Fetching doctor performance...');
            
            const [appointmentResponse, dokterResponse] = await Promise.all([
                axios.get(`${BASE_URL}/appointments?select=id_dokter,status`, { headers }),
                axios.get(`${BASE_URL}/dokter?select=id,nama`, { headers })
            ]);

            const appointments = appointmentResponse.data || [];
            const doctors = dokterResponse.data || [];

            // Calculate performance for each doctor
            const doctorStats = {};
            appointments.forEach(appointment => {
                const dokterId = appointment.id_dokter;
                if (!doctorStats[dokterId]) {
                    doctorStats[dokterId] = { total: 0, selesai: 0 };
                }
                doctorStats[dokterId].total++;
                if (appointment.status === 'selesai') {
                    doctorStats[dokterId].selesai++;
                }
            });

            // Combine with doctor names and calculate completion rate
            const performance = doctors.map(doctor => {
                const stats = doctorStats[doctor.id] || { total: 0, selesai: 0 };
                const completionRate = stats.total > 0 ? (stats.selesai / stats.total * 100) : 0;
                
                return {
                    id: doctor.id,
                    nama: doctor.nama,
                    totalAppointments: stats.total,
                    completedAppointments: stats.selesai,
                    completionRate: Math.round(completionRate * 10) / 10 // Round to 1 decimal
                };
            }).sort((a, b) => b.totalAppointments - a.totalAppointments);

            return performance.slice(0, 5); // Top 5 doctors

        } catch (error) {
            console.error('Error fetching doctor performance:', error.response?.data || error.message);
            return [];
        }
    },

    // Test database connection
    async testConnection() {
        try {
            console.log('Testing database connection...');
            
            const response = await axios.get(`${BASE_URL}/pasien?limit=1&select=id`, { headers });
            console.log('Connection test successful:', response.status === 200);
            
            return {
                success: true,
                message: 'Koneksi database berhasil',
                timestamp: new Date().toISOString()
            };

        } catch (error) {
            console.error('Database connection test failed:', error.response?.data || error.message);
            
            return {
                success: false,
                message: 'Koneksi database gagal: ' + (error.response?.data?.message || error.message),
                timestamp: new Date().toISOString()
            };
        }
    },

    // Fetch all dashboard data at once
    async fetchAllDashboardData() {
        try {
            console.log('Fetching all dashboard data...');
            
            // Execute all API calls with proper error handling
            const results = await Promise.allSettled([
                this.fetchDashboardStats(),
                this.fetchTodayAppointments(),
                this.fetchRecentActivities(),
                this.fetchAppointmentStatusSummary(),
                this.fetchSystemAlerts(),
                this.fetchMonthlyTrends(),
                this.fetchDoctorPerformance()
            ]);

            // Process results with fallback values
            const [
                statsResult,
                todayAppointmentsResult,
                recentActivitiesResult,
                statusSummaryResult,
                systemAlertsResult,
                monthlyTrendsResult,
                doctorPerformanceResult
            ] = results;

            const dashboardData = {
                stats: statsResult.status === 'fulfilled' ? statsResult.value : {
                    totalPasien: 0,
                    dokterAktif: 0,
                    appointmentHariIni: 0,
                    totalRekamMedis: 0,
                    totalAppointments: 0
                },
                todayAppointments: todayAppointmentsResult.status === 'fulfilled' ? todayAppointmentsResult.value : [],
                recentActivities: recentActivitiesResult.status === 'fulfilled' ? recentActivitiesResult.value : [],
                statusSummary: statusSummaryResult.status === 'fulfilled' ? statusSummaryResult.value : {
                    antri: 0, berlangsung: 0, selesai: 0, dibatalkan: 0
                },
                systemAlerts: systemAlertsResult.status === 'fulfilled' ? systemAlertsResult.value : [],
                monthlyTrends: monthlyTrendsResult.status === 'fulfilled' ? monthlyTrendsResult.value : [],
                doctorPerformance: doctorPerformanceResult.status === 'fulfilled' ? doctorPerformanceResult.value : [],
                lastUpdated: new Date().toISOString()
            };

            // Log any failed requests
            results.forEach((result, index) => {
                if (result.status === 'rejected') {
                    const functionNames = [
                        'fetchDashboardStats',
                        'fetchTodayAppointments',
                        'fetchRecentActivities',
                        'fetchAppointmentStatusSummary',
                        'fetchSystemAlerts',
                        'fetchMonthlyTrends',
                        'fetchDoctorPerformance'
                    ];
                    console.error(`Error in ${functionNames[index]}:`, result.reason);
                }
            });

            console.log('Dashboard data loaded successfully:', dashboardData);
            return dashboardData;

        } catch (error) {
            console.error('Error fetching all dashboard data:', error);
            throw new Error('Gagal memuat data dashboard: ' + error.message);
        }
    }
};