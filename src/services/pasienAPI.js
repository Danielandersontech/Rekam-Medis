import axios from "axios";

const API_URL = "https://znhejugzzdxpiufabkea.supabase.co/rest/v1/pasien";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpuaGVqdWd6emR4cGl1ZmFia2VhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzMTc5OTAsImV4cCI6MjA2ODg5Mzk5MH0.XS21EZHK5eiLeeXrBAjyC7pnCc01ibacaxfH0xoX9Ko";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
  "Prefer": "return=representation" // To get the inserted/updated data back
};

export const pasienAPI = {
  async fetchPasien() {
    const response = await axios.get(API_URL, { 
      headers,
      params: {
        select: '*',
        order: 'created_at.desc' // Urutkan berdasarkan created_at terbaru
      }
    });
    return response.data;
  },

  async createPasien(data) {
    const pasienData = {
      nama: data.nama,
      nik: data.nik,
      tanggal_lahir: data.tanggal_lahir,
      jenis_kelamin: data.jenis_kelamin,
      alamat: data.alamat,
      telepon: data.telepon,
      email: data.email,
      golongan_darah: data.golongan_darah,
      status_pernikahan: data.status_pernikahan,
      pekerjaan: data.pekerjaan,
      username: data.username,
      password: data.password,
      status: data.status || 'Aktif' // Default 'Aktif' jika tidak disediakan
    };
    
    const response = await axios.post(API_URL, pasienData, { headers });
    return response.data[0]; // Return the first item from the response array
  },

  async deletePasien(id) {
    await axios.delete(`${API_URL}?id=eq.${id}`, { headers });
  },

  async updatePasien(id, data) {
    const pasienData = {
      nama: data.nama,
      nik: data.nik,
      tanggal_lahir: data.tanggal_lahir,
      jenis_kelamin: data.jenis_kelamin,
      alamat: data.alamat,
      telepon: data.telepon,
      email: data.email,
      golongan_darah: data.golongan_darah,
      status_pernikahan: data.status_pernikahan,
      pekerjaan: data.pekerjaan,
      username: data.username,
      password: data.password,
      status: data.status
    };
    
    const response = await axios.patch(`${API_URL}?id=eq.${id}`, pasienData, { headers });
    return response.data[0]; // Return the first item from the response array
  },

  async checkUniqueNik(nik) {
    const response = await axios.get(`${API_URL}?nik=eq.${nik}`, { headers });
    return response.data.length > 0;
  },

  async checkUniqueEmail(email) {
    const response = await axios.get(`${API_URL}?email=eq.${email}`, { headers });
    return response.data.length > 0;
  },

  async checkUniqueUsername(username) {
    const response = await axios.get(`${API_URL}?username=eq.${username}`, { headers });
    return response.data.length > 0;
  }
};