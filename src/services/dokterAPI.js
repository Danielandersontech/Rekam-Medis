import axios from "axios";

const API_URL = "https://znhejugzzdxpiufabkea.supabase.co/rest/v1/dokter";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpuaGVqdWd6emR4cGl1ZmFia2VhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzMTc5OTAsImV4cCI6MjA2ODg5Mzk5MH0.XS21EZHK5eiLeeXrBAjyC7pnCc01ibacaxfH0xoX9Ko";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
  Prefer: "return=representation",
};

export const dokterAPI = {
  async fetchDokter() {
    try {
      const response = await axios.get(API_URL, {
        headers,
        params: {
          select: "*,poli(nama_poli)",
          order: "created_at.desc",
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch doctors");
    }
  },

  async createDokter(data) {
    const dokterData = {
      nama: data.nama,
      nip: data.nip,
      no_lisensi: data.no_lisensi,
      telepon: data.telepon,
      email: data.email,
      alamat: data.alamat,
      tanggal_lahir: data.tanggal_lahir,
      jenis_kelamin: data.jenis_kelamin,
      pendidikan: data.pendidikan,
      pengalaman: data.pengalaman,
      jam_praktek: data.jam_praktek,
      tarif_konsultasi: parseFloat(data.tarif_konsultasi),
      id_poli: parseInt(data.id_poli),
      // status: data.status || 'Aktif', // Uncomment if status column is added
    };

    try {
      const response = await axios.post(API_URL, dokterData, { headers });
      return response.data[0];
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to create doctor"
      );
    }
  },

  async updateDokter(id, data) {
    const dokterData = {
      nama: data.nama,
      nip: data.nip,
      no_lisensi: data.no_lisensi,
      telepon: data.telepon,
      email: data.email,
      alamat: data.alamat,
      tanggal_lahir: data.tanggal_lahir,
      jenis_kelamin: data.jenis_kelamin,
      pendidikan: data.pendidikan,
      pengalaman: data.pengalaman,
      jam_praktek: data.jam_praktek,
      tarif_konsultasi: parseFloat(data.tarif_konsultasi),
      id_poli: parseInt(data.id_poli),
      // status: data.status, // Uncomment if status column is added
    };

    try {
      const response = await axios.patch(`${API_URL}?id=eq.${id}`, dokterData, {
        headers,
      });
      return response.data[0];
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update doctor"
      );
    }
  },

  async deleteDokter(id) {
    try {
      await axios.delete(`${API_URL}?id=eq.${id}`, { headers });
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to delete doctor"
      );
    }
  },

  async checkUniqueNip(nip, excludeId = null) {
    try {
      const params = { nip: `eq.${nip}` };
      if (excludeId) {
        params.id = `neq.${excludeId}`;
      }
      const response = await axios.get(API_URL, { headers, params });
      return response.data.length > 0;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to check NIP uniqueness"
      );
    }
  },

  async checkUniqueEmail(email, excludeId = null) {
    try {
      const params = { email: `eq.${email}` };
      if (excludeId) {
        params.id = `neq.${excludeId}`;
      }
      const response = await axios.get(API_URL, { headers, params });
      return response.data.length > 0;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to check email uniqueness"
      );
    }
  },

  async checkUniqueLisensi(no_lisensi, excludeId = null) {
    try {
      const params = { no_lisensi: `eq.${no_lisensi}` };
      if (excludeId) {
        params.id = `neq.${excludeId}`;
      }
      const response = await axios.get(API_URL, { headers, params });
      return response.data.length > 0;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to check license uniqueness"
      );
    }
  },

  async fetchPoli() {
    try {
      const response = await axios.get(
        "https://znhejugzzdxpiufabkea.supabase.co/rest/v1/poli",
        {
          headers,
          params: {
            select: "*",
            order: "nama_poli.asc",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch poli data"
      );
    }
  },
};