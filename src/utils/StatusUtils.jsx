export const getStatusBadge = (status) => {
  switch (status) {
    case 'Aktif':
    case 'Selesai':
      return 'badge-success';
    case 'Berlangsung':
    case 'Kontrol':
      return 'badge-warning';
    case 'Dijadwalkan':
      return 'badge-info';
    case 'Menunggu':
      return 'badge-ghost';
    case 'Dibatalkan':
      return 'badge-error';
    default:
      return 'badge-ghost';
  }
};

export const getStatusColor = (kuota, terpakai) => {
  const persentase = (terpakai / kuota) * 100;
  if (persentase >= 90) return 'text-error';
  if (persentase >= 70) return 'text-warning';
  return 'text-success';
};