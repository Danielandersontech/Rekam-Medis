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

// Fungsi untuk mengambil data resep obat dengan relasi lengkap
const fetchResepObatWithRelations = async (id) => {
    try {
        // Ambil data resep obat berdasarkan rekam medis
        const resepResponse = await axios.get(`${BASE_URL}/resep_obat?id_rekam_medis=eq.${id}`, {
            headers,
            params: {
                order: 'created_at.desc'
            }
        });

        if (!resepResponse.data || resepResponse.data.length === 0) {
            return [];
        }

        // Ambil data rekam medis
        const rekamMedisResponse = await axios.get(`${BASE_URL}/rekam_medis?id=eq.${id}`, {
            headers
        });

        const rekamMedis = rekamMedisResponse.data[0];
        
        if (!rekamMedis) {
            return resepResponse.data;
        }

        // Ambil data appointment terkait
        const appointmentResponse = await axios.get(`${BASE_URL}/appointments?id=eq.${rekamMedis.id_appointment}`, {
            headers
        });

        const appointment = appointmentResponse.data[0];

        if (!appointment) {
            return resepResponse.data;
        }

        // Ambil data pasien dan dokter
        const [pasienData, dokterData] = await Promise.all([
            axios.get(`${BASE_URL}/pasien?id=eq.${appointment.id_pasien}`, { headers })
                .then(res => res.data[0])
                .catch(() => null),
            axios.get(`${BASE_URL}/dokter?id=eq.${appointment.id_dokter}`, { headers })
                .then(res => res.data[0])
                .catch(() => null)
        ]);

        // Gabungkan data
        return resepResponse.data.map(resep => ({
            ...resep,
            rekam_medis: rekamMedis,
            appointment: appointment,
            pasien: pasienData,
            dokter: dokterData
        }));

    } catch (error) {
        console.error('Error fetching resep obat with relations:', error);
        throw error;
    }
};

export const resepObatAPI = {
    // Fetch resep obat dengan data lengkap
    async fetchResepObat() {
        try {
            console.log('Fetching resep obat...');
            
            // Ambil semua data resep obat
            const response = await axios.get(`${BASE_URL}/resep_obat`, {
                headers,
                params: {
                    order: 'created_at.desc'
                }
            });

            if (!response.data || response.data.length === 0) {
                console.log('No resep obat found');
                return [];
            }

            console.log('Raw resep obat:', response.data);

            // Group resep berdasarkan id_rekam_medis
            const groupedResep = response.data.reduce((acc, resep) => {
                const key = resep.id_rekam_medis;
                if (!acc[key]) {
                    acc[key] = [];
                }
                acc[key].push(resep);
                return acc;
            }, {});

            // Untuk setiap group, fetch data relasi
            const resepWithRelations = await Promise.all(
                Object.keys(groupedResep).map(async (rekamMedisId) => {
                    try {
                        const resepList = groupedResep[rekamMedisId];
                        
                        // Fetch data rekam medis
                        const rekamMedisResponse = await axios.get(`${BASE_URL}/rekam_medis?id=eq.${rekamMedisId}`, {
                            headers
                        });

                        const rekamMedis = rekamMedisResponse.data[0];
                        
                        if (!rekamMedis) {
                            return null;
                        }

                        // Fetch data appointment
                        const appointmentResponse = await axios.get(`${BASE_URL}/appointments?id=eq.${rekamMedis.id_appointment}`, {
                            headers
                        });

                        const appointment = appointmentResponse.data[0];

                        if (!appointment) {
                            return null;
                        }

                        // Fetch data pasien dan dokter
                        const [pasienData, dokterData] = await Promise.all([
                            axios.get(`${BASE_URL}/pasien?id=eq.${appointment.id_pasien}`, { headers })
                                .then(res => res.data && res.data.length > 0 ? res.data[0] : null)
                                .catch(err => {
                                    console.error(`Error fetching pasien ${appointment.id_pasien}:`, err);
                                    return null;
                                }),
                            axios.get(`${BASE_URL}/dokter?id=eq.${appointment.id_dokter}`, { headers })
                                .then(res => res.data && res.data.length > 0 ? res.data[0] : null)
                                .catch(err => {
                                    console.error(`Error fetching dokter ${appointment.id_dokter}:`, err);
                                    return null;
                                })
                        ]);

                        // Generate nomor resep unik
                        const tanggal = new Date().toISOString().slice(0, 10).replace(/-/g, '');
                        const no_resep = `RX-${rekamMedis.no_rekam_medis.split('-')[2] || '001'}-${tanggal}`;

                        // Return format yang sesuai dengan UI
                        return {
                            id: parseInt(rekamMedisId),
                            no_resep: no_resep,
                            pasien: pasienData?.nama || 'Unknown Patient',
                            dokter: dokterData?.nama || 'Unknown Doctor',
                            tanggal: rekamMedis.created_at.split('T')[0],
                            status: rekamMedis.status === 'Aktif' ? 'Aktif' : 'Selesai',
                            total_obat: resepList.length,
                            obat_list: resepList.map(resep => ({
                                nama_obat: resep.nama_obat,
                                dosis: resep.dosis,
                                frekuensi: resep.aturan_pakai, // Mapping aturan_pakai ke frekuensi
                                durasi: '30 hari', // Default durasi, bisa disesuaikan
                                jumlah: `${resep.jumlah} tablet`, // Format jumlah
                                instruksi: resep.aturan_pakai
                            })),
                            rekam_medis_id: rekamMedis.id,
                            rekam_medis: rekamMedis,
                            appointment: appointment,
                            pasien_data: pasienData,
                            dokter_data: dokterData
                        };

                    } catch (error) {
                        console.error('Error processing resep group:', rekamMedisId, error);
                        return null;
                    }
                })
            );

            // Filter null values
            const validResep = resepWithRelations.filter(resep => resep !== null);
            
            console.log('Resep obat with relations:', validResep);
            return validResep;

        } catch (error) {
            console.error('Error fetching resep obat:', error);
            console.error('Error details:', error.response?.data);
            return [];
        }
    },

    // Create resep obat baru (multiple obat untuk satu rekam medis)
    async createResepObat(data) {
        try {
            console.log('Creating resep obat with data:', data);
            
            const { rekam_medis_id, obat_list, catatan } = data;

            if (!rekam_medis_id || !obat_list || obat_list.length === 0) {
                throw new Error('Data rekam medis dan daftar obat harus diisi');
            }

            // Validate obat list
            for (let i = 0; i < obat_list.length; i++) {
                const obat = obat_list[i];
                if (!obat.nama_obat || !obat.dosis || !obat.frekuensi || !obat.jumlah) {
                    throw new Error(`Data obat #${i + 1} tidak lengkap`);
                }
            }

            // Insert multiple obat untuk satu rekam medis
            const obatData = obat_list.map(obat => ({
                id_rekam_medis: parseInt(rekam_medis_id),
                nama_obat: obat.nama_obat,
                dosis: obat.dosis,
                aturan_pakai: obat.frekuensi, // Map frekuensi ke aturan_pakai
                jumlah: parseInt(obat.jumlah.toString().replace(/\D/g, '')) || 1 // Extract number from string
            }));

            console.log('Processed obat data:', obatData);

            const response = await axios.post(`${BASE_URL}/resep_obat`, obatData, {
                headers: {
                    ...headers,
                    "Prefer": "return=representation"
                }
            });

            console.log('Create response:', response.data);

            if (response.data && response.data.length > 0) {
                // Return data dalam format yang sesuai dengan UI
                return await this.fetchResepObatByRekamMedis(rekam_medis_id);
            }
            
            throw new Error('Gagal membuat resep obat');
        } catch (error) {
            console.error('Error creating resep obat:', error);
            console.error('Error response:', error.response?.data);
            throw new Error(error.response?.data?.message || error.message || 'Gagal membuat resep obat');
        }
    },

    // Update resep obat
    async updateResepObat(rekamMedisId, data) {
        try {
            console.log('Updating resep obat:', rekamMedisId, data);
            
            const { obat_list } = data;

            // Delete existing resep obat untuk rekam medis ini
            await axios.delete(`${BASE_URL}/resep_obat?id_rekam_medis=eq.${rekamMedisId}`, {
                headers
            });

            // Insert new resep obat
            const obatData = obat_list.map(obat => ({
                id_rekam_medis: parseInt(rekamMedisId),
                nama_obat: obat.nama_obat,
                dosis: obat.dosis,
                aturan_pakai: obat.frekuensi,
                jumlah: parseInt(obat.jumlah.toString().replace(/\D/g, '')) || 1
            }));

            await axios.post(`${BASE_URL}/resep_obat`, obatData, {
                headers: {
                    ...headers,
                    "Prefer": "return=representation"
                }
            });

            return await this.fetchResepObatByRekamMedis(rekamMedisId);
        } catch (error) {
            console.error('Error updating resep obat:', error);
            throw new Error(error.response?.data?.message || 'Gagal mengupdate resep obat');
        }
    },

    // Delete resep obat (delete all obat untuk rekam medis)
    async deleteResepObat(rekamMedisId) {
        try {
            await axios.delete(`${BASE_URL}/resep_obat?id_rekam_medis=eq.${rekamMedisId}`, { 
                headers 
            });
            return true;
        } catch (error) {
            console.error('Error deleting resep obat:', error);
            throw new Error('Gagal menghapus resep obat');
        }
    },

    // Fetch resep obat berdasarkan rekam medis ID
    async fetchResepObatByRekamMedis(rekamMedisId) {
        try {
            return await fetchResepObatWithRelations(rekamMedisId);
        } catch (error) {
            console.error('Error fetching resep obat by rekam medis:', error);
            return [];
        }
    },

    // Fetch rekam medis options untuk dropdown
    async fetchRekamMedisOptions() {
        try {
            console.log('Fetching rekam medis options...');
            
            // Ambil rekam medis dengan status aktif
            const response = await axios.get(`${BASE_URL}/rekam_medis`, {
                headers,
                params: {
                    select: 'id, no_rekam_medis, id_appointment, diagnosis, created_at',
                    status: 'eq.Aktif',
                    order: 'created_at.desc'
                }
            });

            if (!response.data || response.data.length === 0) {
                console.log('No rekam medis found');
                return [];
            }

            // Untuk setiap rekam medis, ambil data pasien
            const rekamMedisWithPasien = await Promise.all(
                response.data.map(async (rekamMedis) => {
                    try {
                        // Ambil data appointment
                        const appointmentResponse = await axios.get(`${BASE_URL}/appointments?id=eq.${rekamMedis.id_appointment}`, {
                            headers
                        });

                        const appointment = appointmentResponse.data[0];
                        
                        if (!appointment) {
                            return {
                                id: rekamMedis.id,
                                no_rekam: rekamMedis.no_rekam_medis,
                                pasien: 'Unknown Patient',
                                diagnosis: rekamMedis.diagnosis,
                                tanggal: rekamMedis.created_at.split('T')[0]
                            };
                        }

                        // Ambil data pasien
                        const pasienResponse = await axios.get(`${BASE_URL}/pasien?id=eq.${appointment.id_pasien}`, {
                            headers
                        });

                        const pasien = pasienResponse.data[0];

                        return {
                            id: rekamMedis.id,
                            no_rekam: rekamMedis.no_rekam_medis,
                            pasien: pasien?.nama || 'Unknown Patient',
                            diagnosis: rekamMedis.diagnosis,
                            tanggal: rekamMedis.created_at.split('T')[0]
                        };

                    } catch (error) {
                        console.error('Error processing rekam medis:', rekamMedis.id, error);
                        return {
                            id: rekamMedis.id,
                            no_rekam: rekamMedis.no_rekam_medis,
                            pasien: 'Unknown Patient',
                            diagnosis: rekamMedis.diagnosis,
                            tanggal: rekamMedis.created_at.split('T')[0]
                        };
                    }
                })
            );

            console.log('Rekam medis options:', rekamMedisWithPasien);
            return rekamMedisWithPasien;

        } catch (error) {
            console.error('Error fetching rekam medis options:', error);
            return [];
        }
    },

    // Update status resep (jika diperlukan)
    async updateStatusResep(rekamMedisId, status) {
        try {
            // Update status di rekam medis
            await axios.patch(`${BASE_URL}/rekam_medis?id=eq.${rekamMedisId}`, 
                { status }, 
                {
                    headers: {
                        ...headers,
                        "Prefer": "return=representation"
                    }
                }
            );

            return await this.fetchResepObatByRekamMedis(rekamMedisId);
        } catch (error) {
            console.error('Error updating status resep:', error);
            throw new Error('Gagal mengupdate status resep');
        }
    },

    // Cetak resep (placeholder untuk future implementation)
    async cetakResep(rekamMedisId) {
        try {
            // Implementasi cetak resep bisa ditambahkan di sini
            // Untuk saat ini, return data resep yang bisa dicetak
            return await this.fetchResepObatByRekamMedis(rekamMedisId);
        } catch (error) {
            console.error('Error printing resep:', error);
            throw new Error('Gagal mencetak resep');
        }
    },

    // Debug function untuk testing
    async debugResepObat() {
        try {
            console.log('=== DEBUGGING RESEP OBAT ===');
            
            const results = {};
            
            // Test tabel resep_obat
            const resepResponse = await axios.get(`${BASE_URL}/resep_obat`, {
                headers,
                params: { limit: 5 }
            });
            results.resep_obat = {
                success: true,
                count: resepResponse.data?.length || 0,
                sample: resepResponse.data?.[0] || null
            };

            // Test tabel rekam_medis
            const rekamResponse = await axios.get(`${BASE_URL}/rekam_medis`, {
                headers,
                params: { limit: 5 }
            });
            results.rekam_medis = {
                success: true,
                count: rekamResponse.data?.length || 0,
                sample: rekamResponse.data?.[0] || null
            };

            console.log('Debug results:', results);
            return results;
        } catch (error) {
            console.error('Error in debug resep obat:', error);
            return { error: error.message };
        }
    }
};