import axios from "axios";

const API_URL = "https://znhejugzzdxpiufabkea.supabase.co/rest/v1/poli";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpuaGVqdWd6emR4cGl1ZmFia2VhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzMTc5OTAsImV4cCI6MjA2ODg5Mzk5MH0.XS21EZHK5eiLeeXrBAjyC7pnCc01ibacaxfH0xoX9Ko";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
  "Prefer": "return=representation"
};

export const poliAPI = {
  async fetchPoli() {
    const response = await axios.get(API_URL, { 
      headers,
      params: {
        select: '*',
        order: 'id.asc'
      }
    });
    return response.data;
  },

  async createPoli(data) {
    const poliData = {
      nama_poli: data.nama_poli,
      kode_poli: data.kode_poli,
      deskripsi: data.deskripsi,
      lokasi: data.lokasi,
      jam_operasional: data.jam_operasional,
      telepon: data.telepon,
      kepala_poli: data.kepala_poli
    };
    
    const response = await axios.post(API_URL, poliData, { headers });
    return response.data[0];
  },

  async deletePoli(id) {
    await axios.delete(`${API_URL}?id=eq.${id}`, { headers });
  },

  async updatePoli(id, data) {
    const poliData = {
      nama_poli: data.nama_poli,
      kode_poli: data.kode_poli,
      deskripsi: data.deskripsi,
      lokasi: data.lokasi,
      jam_operasional: data.jam_operasional,
      telepon: data.telepon,
      kepala_poli: data.kepala_poli
    };
    
    const response = await axios.patch(`${API_URL}?id=eq.${id}`, poliData, { headers });
    return response.data[0];
  },

  async checkUniqueKodePoli(kode_poli) {
    const response = await axios.get(`${API_URL}?kode_poli=eq.${kode_poli}`, { headers });
    return response.data.length > 0;
  },

  async checkUniqueNamaPoli(nama_poli) {
    const response = await axios.get(`${API_URL}?nama_poli=eq.${nama_poli}`, { headers });
    return response.data.length > 0;
  }
};