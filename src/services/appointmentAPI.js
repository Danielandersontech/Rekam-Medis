import axios from "axios";

// PASTIKAN URL KONSISTEN - gunakan satu URL saja
const BASE_URL = "https://znhejugzzdxpiufabkea.supabase.co/rest/v1";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpuaGVqdWd6emR4cGl1ZmFia2VhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzMTc5OTAsImV4cCI6MjA2ODg5Mzk5MH0.XS21EZHK5eiLeeXrBAjyC7pnCc01ibacaxfH0xoX9Ko";

const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
    "Prefer": "return=representation"
};

// Fungsi untuk mengambil data appointment dengan relasi - DIPERBAIKI
const fetchAppointmentWithRelations = async (id) => {
    try {
        // Ambil data appointment utama dulu
        const appointmentResponse = await axios.get(`${BASE_URL}/appointments?id=eq.${id}`, {
            headers
        });
        
        if (!appointmentResponse.data || appointmentResponse.data.length === 0) {
            throw new Error('Data appointment tidak ditemukan');
        }
        
        const appointment = appointmentResponse.data[0];
        
        // Fetch data relasi secara terpisah untuk memastikan data lengkap
        const [pasienData, dokterData, poliData, jadwalData] = await Promise.all([
            // Fetch pasien
            axios.get(`${BASE_URL}/pasien?id=eq.${appointment.id_pasien}`, { headers })
                .then(res => res.data[0])
                .catch(() => null),
            
            // Fetch dokter  
            axios.get(`${BASE_URL}/dokter?id=eq.${appointment.id_dokter}`, { headers })
                .then(res => res.data[0])
                .catch(() => null),
            
            // Fetch poli
            axios.get(`${BASE_URL}/poli?id=eq.${appointment.id_poli}`, { headers })
                .then(res => res.data[0])
                .catch(() => null),
            
            // Fetch jadwal_dokter
            axios.get(`${BASE_URL}/jadwal_dokter?id=eq.${appointment.id_jadwal_dokter}`, { headers })
                .then(res => res.data[0])
                .catch(() => null)
        ]);

        // Gabungkan data
        return {
            ...appointment,
            pasien: pasienData ? {
                id: pasienData.id,
                nama: pasienData.nama,
                telepon: pasienData.telepon
            } : null,
            dokter: dokterData ? {
                id: dokterData.id,
                nama: dokterData.nama
            } : null,
            poli: poliData ? {
                id: poliData.id,
                nama_poli: poliData.nama_poli
            } : null,
            jadwal_dokter: jadwalData ? {
                id: jadwalData.id,
                hari: jadwalData.hari,
                jam_mulai: jadwalData.jam_mulai,
                jam_selesai: jadwalData.jam_selesai,
                kuota: jadwalData.kuota
            } : null
        };
    } catch (error) {
        console.error('Error fetching appointment with relations:', error);
        throw error;
    }
};

export const appointmentAPI = {
    // Fetch appointments dengan fetch relasi secara terpisah - DIPERBAIKI
    async fetchAppointments() {
        try {
            console.log('Fetching appointments...');
            
            // Ambil data appointments utama dulu
            const response = await axios.get(`${BASE_URL}/appointments`, {
                headers,
                params: {
                    order: 'created_at.desc'
                }
            });
            
            if (!response.data || response.data.length === 0) {
                console.log('No appointments found');
                return [];
            }

            console.log('Raw appointments:', response.data);

            // Untuk setiap appointment, fetch data relasi secara terpisah
            const appointmentsWithRelations = await Promise.all(
                response.data.map(async (appointment) => {
                    try {
                        // Fetch data relasi secara parallel
                        const [pasienData, dokterData, poliData, jadwalData] = await Promise.all([
                            // Fetch pasien
                            axios.get(`${BASE_URL}/pasien?id=eq.${appointment.id_pasien}`, { headers })
                                .then(res => res.data && res.data.length > 0 ? res.data[0] : null)
                                .catch(err => {
                                    console.error(`Error fetching pasien ${appointment.id_pasien}:`, err);
                                    return null;
                                }),
                            
                            // Fetch dokter  
                            axios.get(`${BASE_URL}/dokter?id=eq.${appointment.id_dokter}`, { headers })
                                .then(res => res.data && res.data.length > 0 ? res.data[0] : null)
                                .catch(err => {
                                    console.error(`Error fetching dokter ${appointment.id_dokter}:`, err);
                                    return null;
                                }),
                            
                            // Fetch poli
                            axios.get(`${BASE_URL}/poli?id=eq.${appointment.id_poli}`, { headers })
                                .then(res => res.data && res.data.length > 0 ? res.data[0] : null)
                                .catch(err => {
                                    console.error(`Error fetching poli ${appointment.id_poli}:`, err);
                                    return null;
                                }),
                            
                            // Fetch jadwal_dokter
                            axios.get(`${BASE_URL}/jadwal_dokter?id=eq.${appointment.id_jadwal_dokter}`, { headers })
                                .then(res => res.data && res.data.length > 0 ? res.data[0] : null)
                                .catch(err => {
                                    console.error(`Error fetching jadwal ${appointment.id_jadwal_dokter}:`, err);
                                    return null;
                                })
                        ]);

                        // Gabungkan data dengan fallback values
                        return {
                            ...appointment,
                            pasien: pasienData ? {
                                id: pasienData.id,
                                nama: pasienData.nama || 'Unknown Patient',
                                telepon: pasienData.telepon || 'No Phone'
                            } : {
                                id: null,
                                nama: 'Unknown Patient', 
                                telepon: 'No Phone'
                            },
                            dokter: dokterData ? {
                                id: dokterData.id,
                                nama: dokterData.nama || 'Unknown Doctor'
                            } : {
                                id: null,
                                nama: 'Unknown Doctor'
                            },
                            poli: poliData ? {
                                id: poliData.id,
                                nama_poli: poliData.nama_poli || 'Unknown Poli'
                            } : {
                                id: null,
                                nama_poli: 'Unknown Poli'
                            },
                            jadwal_dokter: jadwalData ? {
                                id: jadwalData.id,
                                hari: jadwalData.hari || 'Unknown Day',
                                jam_mulai: jadwalData.jam_mulai || '00:00',
                                jam_selesai: jadwalData.jam_selesai || '00:00',
                                kuota: jadwalData.kuota || 0
                            } : {
                                id: null,
                                hari: 'Unknown Day',
                                jam_mulai: '00:00',
                                jam_selesai: '00:00',
                                kuota: 0
                            }
                        };
                    } catch (error) {
                        console.error('Error processing appointment:', appointment.id, error);
                        // Return appointment dengan data default jika gagal
                        return {
                            ...appointment,
                            pasien: { id: null, nama: 'Unknown Patient', telepon: 'No Phone' },
                            dokter: { id: null, nama: 'Unknown Doctor' },
                            poli: { id: null, nama_poli: 'Unknown Poli' },
                            jadwal_dokter: { id: null, hari: 'Unknown Day', jam_mulai: '00:00', jam_selesai: '00:00', kuota: 0 }
                        };
                    }
                })
            );

            console.log('Appointments with relations:', appointmentsWithRelations);
            return appointmentsWithRelations;
            
        } catch (error) {
            console.error('Error fetching appointments:', error);
            console.error('Error details:', error.response?.data);
            return [];
        }
    },

    // Create appointment baru dengan mengambil data lengkap setelah dibuat
    async createAppointment(data) {
        try {
            console.log('Creating appointment with data:', data);
            
            const appointmentData = {
                tgl_kunjungan: data.tgl_kunjungan,
                keluhan: data.keluhan,
                status: data.status || 'antri',
                id_pasien: parseInt(data.id_pasien),
                id_dokter: parseInt(data.id_dokter),
                id_poli: parseInt(data.id_poli),
                id_jadwal_dokter: parseInt(data.id_jadwal_dokter)
            };

            console.log('Processed appointment data:', appointmentData);

            const response = await axios.post(`${BASE_URL}/appointments`, appointmentData, {
                headers: {
                    ...headers,
                    "Prefer": "return=representation"
                }
            });

            console.log('Create response:', response.data);

            if (response.data && response.data.length > 0) {
                const createdId = response.data[0].id;
                return await fetchAppointmentWithRelations(createdId);
            }
            
            throw new Error('Gagal membuat appointment');
        } catch (error) {
            console.error('Error creating appointment:', error);
            console.error('Error response:', error.response?.data);
            throw new Error(error.response?.data?.message || error.message || 'Gagal membuat appointment');
        }
    },

    // Update appointment dengan mengambil data lengkap setelah update
    async updateAppointment(id, data) {
        try {
            const appointmentData = {
                tgl_kunjungan: data.tgl_kunjungan,
                keluhan: data.keluhan,
                status: data.status,
                id_pasien: parseInt(data.id_pasien),
                id_dokter: parseInt(data.id_dokter),
                id_poli: parseInt(data.id_poli),
                id_jadwal_dokter: parseInt(data.id_jadwal_dokter)
            };

            await axios.patch(`${BASE_URL}/appointments?id=eq.${id}`, appointmentData, {
                headers: {
                    ...headers,
                    "Prefer": "return=representation"
                }
            });

            return await fetchAppointmentWithRelations(id);
        } catch (error) {
            console.error('Error updating appointment:', error);
            throw new Error(error.response?.data?.message || 'Gagal mengupdate appointment');
        }
    },

    // Delete appointment
    async deleteAppointment(id) {
        try {
            await axios.delete(`${BASE_URL}/appointments?id=eq.${id}`, { headers });
            return true;
        } catch (error) {
            console.error('Error deleting appointment:', error);
            throw new Error('Gagal menghapus appointment');
        }
    },

    // Update status appointment
    async updateStatus(id, status) {
        try {
            await axios.patch(`${BASE_URL}/appointments?id=eq.${id}`, { status }, {
                headers: {
                    ...headers,
                    "Prefer": "return=representation"
                }
            });

            return await fetchAppointmentWithRelations(id);
        } catch (error) {
            console.error('Error updating status:', error);
            throw new Error('Gagal mengupdate status');
        }
    },

    // Fetch pasien options
    async fetchPasienOptions() {
        try {
            console.log('Fetching pasien options...');
            const response = await axios.get(`${BASE_URL}/pasien`, {
                headers,
                params: {
                    select: 'id, nama, telepon',
                    order: 'nama'
                }
            });
            console.log('Pasien options:', response.data);
            return response.data || [];
        } catch (error) {
            console.error('Error fetching pasien options:', error);
            return [];
        }
    },

    // Fetch dokter options berdasarkan poli - BARU
    async fetchDokterByPoli(poliId) {
        try {
            console.log('Fetching dokter by poli:', poliId);
            const response = await axios.get(`${BASE_URL}/dokter`, {
                headers,
                params: {
                    select: 'id, nama, id_poli',
                    id_poli: `eq.${poliId}`,
                    order: 'nama'
                }
            });
            console.log('Dokter by poli options:', response.data);
            return response.data || [];
        } catch (error) {
            console.error('Error fetching dokter by poli:', error);
            return [];
        }
    },

    // Fetch dokter options - UNTUK BACKUP
    async fetchDokterOptions() {
        try {
            console.log('Fetching all dokter options...');
            const response = await axios.get(`${BASE_URL}/dokter`, {
                headers,
                params: {
                    select: 'id, nama, id_poli',
                    order: 'nama'
                }
            });
            console.log('All dokter options:', response.data);
            return response.data || [];
        } catch (error) {
            console.error('Error fetching dokter options:', error);
            return [];
        }
    },

    // Fetch poli options
    async fetchPoliOptions() {
        try {
            console.log('Fetching poli options...');
            const response = await axios.get(`${BASE_URL}/poli`, {
                headers,
                params: {
                    select: 'id, nama_poli',
                    order: 'nama_poli'
                }
            });
            console.log('Poli options:', response.data);
            return response.data || [];
        } catch (error) {
            console.error('Error fetching poli options:', error);
            return [];
        }
    },

    // Fetch jadwal dokter berdasarkan dokter dan hari - DIPERBAIKI
    async fetchJadwalDokterOptions(dokterId, hari = null) {
        try {
            console.log('Fetching jadwal dokter for:', { dokterId, hari });
            
            const params = {
                select: 'id, hari, jam_mulai, jam_selesai, kuota, dokter_id, poli_id, status',
                dokter_id: `eq.${dokterId}`,
                order: 'hari, jam_mulai'
            };

            // Filter berdasarkan hari jika diberikan
            if (hari) {
                params.hari = `eq.${hari}`;
            }

            // Filter hanya yang aktif
            params.status = 'eq.Aktif';

            const response = await axios.get(`${BASE_URL}/jadwal_dokter`, {
                headers,
                params
            });
            
            console.log('Jadwal dokter raw response:', response.data);
            console.log('Filter params used:', params);
            
            return response.data || [];
        } catch (error) {
            console.error('Error fetching jadwal dokter options:', error);
            return [];
        }
    },

    // FUNGSI BARU: Fetch jadwal dokter dengan info yang lebih lengkap
    async fetchJadwalWithDokterInfo(poliId = null) {
        try {
            console.log('Fetching jadwal with dokter info for poli:', poliId);
            
            const params = {
                select: 'id, hari, jam_mulai, jam_selesai, kuota, dokter_id, poli_id, status',
                status: 'eq.Aktif',
                order: 'hari, jam_mulai'
            };

            if (poliId) {
                params.poli_id = `eq.${poliId}`;
            }

            const response = await axios.get(`${BASE_URL}/jadwal_dokter`, {
                headers,
                params
            });
            
            console.log('Jadwal with dokter info:', response.data);
            return response.data || [];
        } catch (error) {
            console.error('Error fetching jadwal with dokter info:', error);
            return [];
        }
    },

    // Fetch jadwal dokter berdasarkan ID
    async fetchJadwalById(jadwalId) {
        try {
            const response = await axios.get(`${BASE_URL}/jadwal_dokter`, {
                headers,
                params: {
                    select: 'id, hari, jam_mulai, jam_selesai, kuota, dokter_id, poli_id',
                    id: `eq.${jadwalId}`
                }
            });
            return response.data && response.data.length > 0 ? response.data[0] : null;
        } catch (error) {
            console.error('Error fetching jadwal by id:', error);
            return null;
        }
    },

    // Count appointments untuk jadwal tertentu pada tanggal tertentu
    async countAppointmentsByJadwalAndDate(jadwalId, tanggal) {
        try {
            const startDate = `${tanggal}T00:00:00`;
            const endDate = `${tanggal}T23:59:59`;

            const response = await axios.get(`${BASE_URL}/appointments`, {
                headers,
                params: {
                    select: 'id',
                    id_jadwal_dokter: `eq.${jadwalId}`,
                    tgl_kunjungan: `gte.${startDate}`,
                    tgl_kunjungan: `lte.${endDate}`,
                    status: `not.eq.dibatalkan`
                }
            });
            return response.data ? response.data.length : 0;
        } catch (error) {
            console.error('Error counting appointments:', error);
            return 0;
        }
    },

    // Get queue number for appointment
    async getQueueNumber(jadwalId, tanggal) {
        try {
            const count = await this.countAppointmentsByJadwalAndDate(jadwalId, tanggal);
            return count + 1;
        } catch (error) {
            console.error('Error getting queue number:', error);
            return 1;
        }
    },

    // FUNGSI BARU: Debug jadwal dokter
    async debugJadwalDokter() {
        try {
            const response = await axios.get(`${BASE_URL}/jadwal_dokter`, {
                headers,
                params: {
                    select: '*',
                    order: 'created_at.desc',
                    limit: 10
                }
            });
            console.log('DEBUG: Sample jadwal_dokter data:', response.data);
            return response.data || [];
        } catch (error) {
            console.error('Error debugging jadwal dokter:', error);
            return [];
        }
    },

    // FUNGSI DEBUG: Test koneksi ke semua tabel
    async debugAllTables() {
        try {
            console.log('=== DEBUGGING ALL TABLES ===');
            
            const results = {};
            
            // Test setiap tabel
            const tables = ['appointments', 'pasien', 'dokter', 'poli', 'jadwal_dokter'];
            
            for (const table of tables) {
                try {
                    const response = await axios.get(`${BASE_URL}/${table}`, {
                        headers,
                        params: {
                            limit: 5
                        }
                    });
                    results[table] = {
                        success: true,
                        count: response.data?.length || 0,
                        sample: response.data?.[0] || null
                    };
                    console.log(`✅ ${table}: ${results[table].count} records`);
                } catch (error) {
                    results[table] = {
                        success: false,
                        error: error.message
                    };
                    console.error(`❌ ${table}: ${error.message}`);
                }
            }
            
            console.log('=== DEBUG RESULTS ===', results);
            return results;
        } catch (error) {
            console.error('Error in debug all tables:', error);
            return {};
        }
    }
};