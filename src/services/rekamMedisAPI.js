import axios from "axios";

// Gunakan URL dan API Key yang sama dengan appointmentAPI
const BASE_URL = "https://znhejugzzdxpiufabkea.supabase.co/rest/v1";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpuaGVqdWd6emR4cGl1ZmFia2VhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzMTc5OTAsImV4cCI6MjA2ODg5Mzk5MH0.XS21EZHK5eiLeeXrBAjyC7pnCc01ibacaxfH0xoX9Ko";

const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
    "Prefer": "return=representation"
};

// Fungsi untuk generate nomor rekam medis
const generateNoRekamMedis = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const date = String(today.getDate()).padStart(2, '0');
    const timestamp = Date.now().toString().slice(-3); // 3 digit terakhir timestamp
    return `RM-${year}${month}${date}-${timestamp}`;
};

// Fungsi untuk mengambil rekam medis dengan relasi
const fetchRekamMedisWithRelations = async (id) => {
    try {
        // Ambil data rekam medis utama
        const rekamMedisResponse = await axios.get(`${BASE_URL}/rekam_medis?id=eq.${id}`, {
            headers
        });
        
        if (!rekamMedisResponse.data || rekamMedisResponse.data.length === 0) {
            throw new Error('Data rekam medis tidak ditemukan');
        }
        
        const rekamMedis = rekamMedisResponse.data[0];
        
        // Fetch data appointment dan relasinya
        const appointmentData = await axios.get(`${BASE_URL}/appointments?id=eq.${rekamMedis.id_appointment}`, { headers })
            .then(res => res.data[0])
            .catch(() => null);

        if (appointmentData) {
            // Fetch data relasi dari appointment
            const [pasienData, dokterData, poliData] = await Promise.all([
                axios.get(`${BASE_URL}/pasien?id=eq.${appointmentData.id_pasien}`, { headers })
                    .then(res => res.data[0])
                    .catch(() => null),
                axios.get(`${BASE_URL}/dokter?id=eq.${appointmentData.id_dokter}`, { headers })
                    .then(res => res.data[0])
                    .catch(() => null),
                axios.get(`${BASE_URL}/poli?id=eq.${appointmentData.id_poli}`, { headers })
                    .then(res => res.data[0])
                    .catch(() => null)
            ]);

            // Gabungkan data
            return {
                ...rekamMedis,
                appointment: {
                    ...appointmentData,
                    pasien: pasienData ? {
                        id: pasienData.id,
                        nama: pasienData.nama,
                        nik: pasienData.nik,
                        tanggal_lahir: pasienData.tanggal_lahir,
                        jenis_kelamin: pasienData.jenis_kelamin,
                        telepon: pasienData.telepon
                    } : null,
                    dokter: dokterData ? {
                        id: dokterData.id,
                        nama: dokterData.nama,
                        nip: dokterData.nip
                    } : null,
                    poli: poliData ? {
                        id: poliData.id,
                        nama_poli: poliData.nama_poli
                    } : null
                }
            };
        }

        return {
            ...rekamMedis,
            appointment: null
        };
    } catch (error) {
        console.error('Error fetching rekam medis with relations:', error);
        throw error;
    }
};

export const rekamMedisAPI = {
    // Fetch rekam medis dengan relasi
    async fetchRekamMedis() {
        try {
            console.log('Fetching rekam medis...');
            
            // Ambil data rekam medis utama
            const response = await axios.get(`${BASE_URL}/rekam_medis`, {
                headers,
                params: {
                    order: 'created_at.desc'
                }
            });
            
            if (!response.data || response.data.length === 0) {
                console.log('No rekam medis found');
                return [];
            }

            console.log('Raw rekam medis:', response.data);

            // Untuk setiap rekam medis, fetch data relasi
            const rekamMedisWithRelations = await Promise.all(
                response.data.map(async (rekamMedis) => {
                    try {
                        // Fetch appointment data
                        const appointmentData = await axios.get(`${BASE_URL}/appointments?id=eq.${rekamMedis.id_appointment}`, { headers })
                            .then(res => res.data && res.data.length > 0 ? res.data[0] : null)
                            .catch(err => {
                                console.error(`Error fetching appointment ${rekamMedis.id_appointment}:`, err);
                                return null;
                            });

                        if (appointmentData) {
                            // Fetch data relasi dari appointment
                            const [pasienData, dokterData, poliData] = await Promise.all([
                                axios.get(`${BASE_URL}/pasien?id=eq.${appointmentData.id_pasien}`, { headers })
                                    .then(res => res.data && res.data.length > 0 ? res.data[0] : null)
                                    .catch(() => null),
                                axios.get(`${BASE_URL}/dokter?id=eq.${appointmentData.id_dokter}`, { headers })
                                    .then(res => res.data && res.data.length > 0 ? res.data[0] : null)
                                    .catch(() => null),
                                axios.get(`${BASE_URL}/poli?id=eq.${appointmentData.id_poli}`, { headers })
                                    .then(res => res.data && res.data.length > 0 ? res.data[0] : null)
                                    .catch(() => null)
                            ]);

                            // Gabungkan data dengan fallback
                            return {
                                ...rekamMedis,
                                appointment: {
                                    ...appointmentData,
                                    pasien: pasienData ? {
                                        id: pasienData.id,
                                        nama: pasienData.nama || 'Unknown Patient',
                                        nik: pasienData.nik || 'No NIK',
                                        tanggal_lahir: pasienData.tanggal_lahir,
                                        jenis_kelamin: pasienData.jenis_kelamin || 'Unknown',
                                        telepon: pasienData.telepon || 'No Phone'
                                    } : {
                                        id: null,
                                        nama: 'Unknown Patient',
                                        nik: 'No NIK',
                                        tanggal_lahir: null,
                                        jenis_kelamin: 'Unknown',
                                        telepon: 'No Phone'
                                    },
                                    dokter: dokterData ? {
                                        id: dokterData.id,
                                        nama: dokterData.nama || 'Unknown Doctor',
                                        nip: dokterData.nip || 'No NIP'
                                    } : {
                                        id: null,
                                        nama: 'Unknown Doctor',
                                        nip: 'No NIP'
                                    },
                                    poli: poliData ? {
                                        id: poliData.id,
                                        nama_poli: poliData.nama_poli || 'Unknown Poli'
                                    } : {
                                        id: null,
                                        nama_poli: 'Unknown Poli'
                                    }
                                }
                            };
                        } else {
                            return {
                                ...rekamMedis,
                                appointment: {
                                    pasien: { id: null, nama: 'Unknown Patient', nik: 'No NIK', tanggal_lahir: null, jenis_kelamin: 'Unknown', telepon: 'No Phone' },
                                    dokter: { id: null, nama: 'Unknown Doctor', nip: 'No NIP' },
                                    poli: { id: null, nama_poli: 'Unknown Poli' }
                                }
                            };
                        }
                    } catch (error) {
                        console.error('Error processing rekam medis:', rekamMedis.id, error);
                        return {
                            ...rekamMedis,
                            appointment: {
                                pasien: { id: null, nama: 'Unknown Patient', nik: 'No NIK', tanggal_lahir: null, jenis_kelamin: 'Unknown', telepon: 'No Phone' },
                                dokter: { id: null, nama: 'Unknown Doctor', nip: 'No NIP' },
                                poli: { id: null, nama_poli: 'Unknown Poli' }
                            }
                        };
                    }
                })
            );

            console.log('Rekam medis with relations:', rekamMedisWithRelations);
            return rekamMedisWithRelations;
            
        } catch (error) {
            console.error('Error fetching rekam medis:', error);
            console.error('Error details:', error.response?.data);
            return [];
        }
    },

    // Create rekam medis baru
    async createRekamMedis(data) {
        try {
            console.log('Creating rekam medis with data:', data);
            
            const rekamMedisData = {
                no_rekam_medis: generateNoRekamMedis(),
                id_appointment: parseInt(data.id_appointment),
                keluhan_utama: data.keluhan_utama,
                diagnosis: data.diagnosis,
                tindakan: data.tindakan,
                tekanan_darah: data.tekanan_darah || '',
                suhu: data.suhu || '',
                nadi: data.nadi || '',
                berat_badan: data.berat_badan || '',
                status: data.status || 'Aktif'
            };

            console.log('Processed rekam medis data:', rekamMedisData);

            const response = await axios.post(`${BASE_URL}/rekam_medis`, rekamMedisData, {
                headers: {
                    ...headers,
                    "Prefer": "return=representation"
                }
            });

            console.log('Create response:', response.data);

            if (response.data && response.data.length > 0) {
                const createdId = response.data[0].id;
                return await fetchRekamMedisWithRelations(createdId);
            }
            
            throw new Error('Gagal membuat rekam medis');
        } catch (error) {
            console.error('Error creating rekam medis:', error);
            console.error('Error response:', error.response?.data);
            throw new Error(error.response?.data?.message || error.message || 'Gagal membuat rekam medis');
        }
    },

    // Update rekam medis
    async updateRekamMedis(id, data) {
        try {
            const rekamMedisData = {
                keluhan_utama: data.keluhan_utama,
                diagnosis: data.diagnosis,
                tindakan: data.tindakan,
                tekanan_darah: data.tekanan_darah || '',
                suhu: data.suhu || '',
                nadi: data.nadi || '',
                berat_badan: data.berat_badan || '',
                status: data.status || 'Aktif'
            };

            await axios.patch(`${BASE_URL}/rekam_medis?id=eq.${id}`, rekamMedisData, {
                headers: {
                    ...headers,
                    "Prefer": "return=representation"
                }
            });

            return await fetchRekamMedisWithRelations(id);
        } catch (error) {
            console.error('Error updating rekam medis:', error);
            throw new Error(error.response?.data?.message || 'Gagal mengupdate rekam medis');
        }
    },

    // Delete rekam medis
    async deleteRekamMedis(id) {
        try {
            await axios.delete(`${BASE_URL}/rekam_medis?id=eq.${id}`, { headers });
            return true;
        } catch (error) {
            console.error('Error deleting rekam medis:', error);
            throw new Error('Gagal menghapus rekam medis');
        }
    },

    // Fetch appointments untuk dropdown (hanya yang belum ada rekam medisnya)
    async fetchAppointmentOptions() {
        try {
            console.log('Fetching appointment options...');
            
            // Ambil semua appointment yang statusnya 'selesai'
            const appointmentsResponse = await axios.get(`${BASE_URL}/appointments`, {
                headers,
                params: {
                    status: 'eq.selesai',
                    order: 'tgl_kunjungan.desc'
                }
            });

            // Ambil ID appointment yang sudah ada rekam medisnya
            const existingRekamMedisResponse = await axios.get(`${BASE_URL}/rekam_medis`, {
                headers,
                params: {
                    select: 'id_appointment'
                }
            });

            const existingAppointmentIds = existingRekamMedisResponse.data.map(rm => rm.id_appointment);
            
            // Filter appointment yang belum ada rekam medisnya
            const availableAppointments = appointmentsResponse.data.filter(
                app => !existingAppointmentIds.includes(app.id)
            );

            // Fetch data relasi untuk setiap appointment
            const appointmentsWithRelations = await Promise.all(
                availableAppointments.map(async (appointment) => {
                    const [pasienData, dokterData] = await Promise.all([
                        axios.get(`${BASE_URL}/pasien?id=eq.${appointment.id_pasien}`, { headers })
                            .then(res => res.data[0])
                            .catch(() => null),
                        axios.get(`${BASE_URL}/dokter?id=eq.${appointment.id_dokter}`, { headers })
                            .then(res => res.data[0])
                            .catch(() => null)
                    ]);

                    return {
                        ...appointment,
                        pasien: pasienData,
                        dokter: dokterData
                    };
                })
            );

            console.log('Available appointments:', appointmentsWithRelations);
            return appointmentsWithRelations || [];
        } catch (error) {
            console.error('Error fetching appointment options:', error);
            return [];
        }
    },

    // Update status rekam medis
    async updateStatus(id, status) {
        try {
            await axios.patch(`${BASE_URL}/rekam_medis?id=eq.${id}`, { status }, {
                headers: {
                    ...headers,
                    "Prefer": "return=representation"
                }
            });

            return await fetchRekamMedisWithRelations(id);
        } catch (error) {
            console.error('Error updating status:', error);
            throw new Error('Gagal mengupdate status');
        }
    }
};