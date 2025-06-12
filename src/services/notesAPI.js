import axios from 'axios'

const API_URL = "https://hazhhhzyqhbmqkpabrtx.supabase.co/rest/v1/reacttib"
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhhemhoaHp5cWhibXFrcGFicnR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2ODcwMDcsImV4cCI6MjA2NTI2MzAwN30.zPRwcwpNYpaqIOyRMzpnqdb1UDdguFGyi98dNpd-xF8"

const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
}

export const notesAPI = {
    async fetchNotes() {
        const response = await axios.get(API_URL, { headers })
        return response.data
    },

    async createNote(data) {
        const response = await axios.post(API_URL, data, { headers })
        return response.data
    },

    async deleteNote(id) {
        await axios.delete(`${API_URL}?id=eq.${id}`, { headers })
    }
}