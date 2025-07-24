import axios from "axios";

// GUNAKAN URL YANG SAMA DENGAN appointmentAPI.js
const API_URL = "https://znhejugzzdxpiufabkea.supabase.co/rest/v1/jadwal_dokter";
const BASE_URL = "https://znhejugzzdxpiufabkea.supabase.co/rest/v1";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpuaGVqdWd6emR4cGl1ZmFia2VhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzMTc5OTAsImV4cCI6MjA2ODg5Mzk5MH0.XS21EZHK5eiLeeXrBAjyC7pnCc01ibacaxfH0xoX9Ko";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
  "Prefer": "return=representation"
};

export const jadwalDokterAPI = {
  async fetchJadwal() {
    const response = await axios.get(API_URL, { 
      headers,
      params: {
        select: `*, dokter(nama), poli(nama_poli)`,
        order: 'hari, jam_mulai'
      }
    });
    return response.data;
  },

  async createJadwal(data) {
    const jadwalData = {
      dokter_id: data.dokter_id,
      poli_id: data.poli_id,
      hari: data.hari,
      jam_mulai: data.jam_mulai,
      jam_selesai: data.jam_selesai,
      kuota: data.kuota,
      status: data.status || 'aktif' // PERBAIKAN: gunakan lowercase 'aktif'
    };
    
    const response = await axios.post(API_URL, jadwalData, { headers });
    return response.data[0];
  },

  async deleteJadwal(id) {
    await axios.delete(`${API_URL}?id=eq.${id}`, { headers });
  },

  async updateJadwal(id, data) {
    const jadwalData = {
      dokter_id: data.dokter_id,
      poli_id: data.poli_id,
      hari: data.hari,
      jam_mulai: data.jam_mulai,
      jam_selesai: data.jam_selesai,
      kuota: data.kuota,
      status: data.status
    };
    
    const response = await axios.patch(`${API_URL}?id=eq.${id}`, jadwalData, { headers });
    return response.data[0];
  },

  async fetchDokterOptions() {
    const response = await axios.get(`${BASE_URL}/dokter`, {
      headers,
      params: {
        select: 'id, nama',
        order: 'nama'
      }
    });
    return response.data;
  },

  async fetchPoliOptions() {
    const response = await axios.get(`${BASE_URL}/poli`, {
      headers,
      params: {
        select: 'id, nama_poli',
        order: 'nama_poli'
      }
    });
    return response.data;
  }
};