import { appointmentAPI } from './appointmentAPI';

export const quotaUtils = {
  // Mengecek ketersediaan kuota untuk jadwal tertentu pada tanggal tertentu
  async checkQuotaAvailability(jadwalId, tanggal) {
    try {
      const jadwal = await appointmentAPI.fetchJadwalById(jadwalId);
      if (!jadwal) {
        throw new Error('Jadwal tidak ditemukan');
      }

      const existingCount = await appointmentAPI.countAppointmentsByJadwalAndDate(jadwalId, tanggal);
      
      return {
        totalQuota: jadwal.kuota,
        usedQuota: existingCount,
        availableQuota: jadwal.kuota - existingCount,
        isFull: existingCount >= jadwal.kuota,
        percentage: Math.round((existingCount / jadwal.kuota) * 100)
      };
    } catch (error) {
      console.error('Error checking quota:', error);
      throw error;
    }
  },

  // Mendapatkan statistik kuota untuk semua jadwal pada tanggal tertentu
  async getQuotaStatistics(tanggal) {
    try {
      const jadwalList = await appointmentAPI.fetchJadwalDokterOptions();
      const statistics = [];

      for (const jadwal of jadwalList) {
        const quotaInfo = await this.checkQuotaAvailability(jadwal.id, tanggal);
        statistics.push({
          jadwalId: jadwal.id,
          dokterNama: jadwal.dokter?.nama || 'Unknown',
          hari: jadwal.hari,
          jamMulai: jadwal.jam_mulai,
          jamSelesai: jadwal.jam_selesai,
          ...quotaInfo
        });
      }

      return statistics;
    } catch (error) {
      console.error('Error getting quota statistics:', error);
      throw error;
    }
  },

  // Validasi sebelum membuat appointment baru
  async validateAppointment(jadwalId, tanggal, excludeAppointmentId = null) {
    try {
      const quotaInfo = await this.checkQuotaAvailability(jadwalId, tanggal);
      
      // Jika ini adalah update appointment, kurangi 1 dari used quota
      if (excludeAppointmentId) {
        quotaInfo.usedQuota -= 1;
        quotaInfo.availableQuota += 1;
        quotaInfo.isFull = quotaInfo.usedQuota >= quotaInfo.totalQuota;
      }

      return {
        isValid: !quotaInfo.isFull,
        message: quotaInfo.isFull 
          ? `Kuota penuh! Tersedia ${quotaInfo.totalQuota} slot, sudah terisi ${quotaInfo.usedQuota}` 
          : `Tersedia ${quotaInfo.availableQuota} dari ${quotaInfo.totalQuota} slot`,
        quotaInfo
      };
    } catch (error) {
      console.error('Error validating appointment:', error);
      return {
        isValid: false,
        message: 'Gagal memvalidasi kuota',
        quotaInfo: null
      };
    }
  },

  // Format tanggal untuk query database
  formatDateForQuery(date) {
    if (typeof date === 'string') {
      return date.split('T')[0];
    }
    return date.toISOString().split('T')[0];
  },

  // Mendapatkan daftar tanggal yang memiliki kuota penuh untuk dokter tertentu
  async getFullQuotaDates(dokterId, startDate, endDate) {
    try {
      const jadwalList = await appointmentAPI.fetchJadwalDokterOptions(dokterId);
      const fullDates = [];

      // Generate tanggal dari startDate ke endDate
      const start = new Date(startDate);
      const end = new Date(endDate);
      const dateList = [];

      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        dateList.push(new Date(d));
      }

      // Cek setiap tanggal
      for (const date of dateList) {
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
        const indonesianDay = this.convertToIndonesianDay(dayName);
        
        // Cari jadwal yang sesuai dengan hari
        const relevantSchedules = jadwalList.filter(j => j.hari === indonesianDay);
        
        for (const jadwal of relevantSchedules) {
          const quotaInfo = await this.checkQuotaAvailability(jadwal.id, this.formatDateForQuery(date));
          if (quotaInfo.isFull) {
            fullDates.push({
              date: this.formatDateForQuery(date),
              jadwalId: jadwal.id,
              hari: jadwal.hari,
              jam: `${jadwal.jam_mulai} - ${jadwal.jam_selesai}`
            });
          }
        }
      }

      return fullDates;
    } catch (error) {
      console.error('Error getting full quota dates:', error);
      return [];
    }
  },

  convertToIndonesianDay(day) {
    const dayMap = {
      'Sunday': 'Minggu',
      'Monday': 'Senin',
      'Tuesday': 'Selasa',
      'Wednesday': 'Rabu',
      'Thursday': 'Kamis',
      'Friday': 'Jumat',
      'Saturday': 'Sabtu'
    };
    return dayMap[day] || day;
  }
};