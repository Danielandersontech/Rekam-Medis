import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Calendar, Clock, User } from 'lucide-react';

export default function JadwalDokter() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [filterHari, setFilterHari] = useState('');
  const [formData, setFormData] = useState({
    dokter_id: '',
    poli_id: '',
    hari: '',
    jam_mulai: '',
    jam_selesai: '',
    kuota: '',
    status: 'Aktif',
  });

  const jadwalData = [
    {
      id: 1,
      dokter: 'Dr. Ahmad Fadli, Sp.PD',
      poli: 'Penyakit Dalam',
      hari: 'Senin',
      jam_mulai: '08:00',
      jam_selesai: '12:00',
      kuota: 20,
      terpakai: 15,
      status: 'Aktif',
    },
    {
      id: 2,
      dokter: 'Dr. Ahmad Fadli, Sp.PD',
      poli: 'Penyakit Dalam',
      hari: 'Rabu',
      jam_mulai: '13:00',
      jam_selesai: '17:00',
      kuota: 20,
      terpakai: 8,
      status: 'Aktif',
    },
    {
      id: 3,
      dokter: 'Dr. Maya Sari, Sp.A',
      poli: 'Anak',
      hari: 'Selasa',
      jam_mulai: '09:00',
      jam_selesai: '15:00',
      kuota: 15,
      terpakai: 12,
      status: 'Aktif',
    },
    {
      id: 4,
      dokter: 'Dr. Maya Sari, Sp.A',
      poli: 'Anak',
      hari: 'Kamis',
      jam_mulai: '08:00',
      jam_selesai: '14:00',
      kuota: 15,
      terpakai: 6,
      status: 'Aktif',
    },
    {
      id: 5,
      dokter: 'Dr. Reza Pratama, Sp.OG',
      poli: 'Obstetri & Ginekologi',
      hari: 'Senin',
      jam_mulai: '10:00',
      jam_selesai: '16:00',
      kuota: 25,
      terpakai: 20,
      status: 'Aktif',
    },
  ];

  const hariOptions = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
  
  const dokterOptions = [
    { id: 1, nama: 'Dr. Ahmad Fadli, Sp.PD' },
    { id: 2, nama: 'Dr. Maya Sari, Sp.A' },
    { id: 3, nama: 'Dr. Reza Pratama, Sp.OG' },
  ];
  
  const poliOptions = [
    { id: 1, nama: 'Penyakit Dalam' },
    { id: 2, nama: 'Anak' },
    { id: 3, nama: 'Obstetri & Ginekologi' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    setShowModal(false);
  };

  const filteredJadwal = jadwalData.filter(jadwal => {
    const matchSearch = jadwal.dokter.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       jadwal.poli.toLowerCase().includes(searchTerm.toLowerCase());
    const matchHari = filterHari === '' || jadwal.hari === filterHari;
    return matchSearch && matchHari;
  });

  const getStatusColor = (kuota, terpakai) => {
    const persentase = (terpakai / kuota) * 100;
    if (persentase >= 90) return 'text-error';
    if (persentase >= 70) return 'text-warning';
    return 'text-success';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Jadwal Dokter</h1>
          <p className="text-base-content/70">Kelola jadwal praktek dokter di setiap poliklinik</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
        >
          <Plus className="h-4 w-4" />
          Tambah Jadwal
        </button>
      </div>

      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="form-control flex-1">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Cari dokter atau poliklinik..."
                  className="input input-bordered w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="btn btn-square">
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </div>
            <select 
              className="select select-bordered"
              value={filterHari}
              onChange={(e) => setFilterHari(e.target.value)}
            >
              <option value="">Semua Hari</option>
              {hariOptions.map(hari => (
                <option key={hari} value={hari}>{hari}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Dokter</th>
                  <th>Poliklinik</th>
                  <th>Hari</th>
                  <th>Waktu</th>
                  <th>Kuota</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredJadwal.map((jadwal, index) => (
                  <tr key={jadwal.id}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-primary" />
                        <span className="font-medium">{jadwal.dokter}</span>
                      </div>
                    </td>
                    <td>{jadwal.poli}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span className="font-medium">{jadwal.hari}</span>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{jadwal.jam_mulai} - {jadwal.jam_selesai}</span>
                      </div>
                    </td>
                    <td>
                      <div>
                        <div className={`font-bold ${getStatusColor(jadwal.kuota, jadwal.terpakai)}`}>
                          {jadwal.terpakai}/{jadwal.kuota}
                        </div>
                        <div className="text-xs text-base-content/70">
                          {Math.round((jadwal.terpakai / jadwal.kuota) * 100)}% terisi
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="badge badge-success">{jadwal.status}</div>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button className="btn btn-ghost btn-sm">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="btn btn-ghost btn-sm text-error">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <h3 className="font-bold text-lg mb-4">Jadwal Mingguan</h3>
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            {hariOptions.map(hari => (
              <div key={hari} className="border border-base-300 rounded-lg p-3">
                <h4 className="font-bold text-sm mb-2 text-center">{hari}</h4>
                <div className="space-y-2">
                  {jadwalData
                    .filter(jadwal => jadwal.hari === hari)
                    .map(jadwal => (
                      <div key={jadwal.id} className="bg-primary/10 p-2 rounded text-xs">
                        <div className="font-medium truncate">{jadwal.dokter.split(',')[0]}</div>
                        <div className="text-primary">{jadwal.jam_mulai}-{jadwal.jam_selesai}</div>
                        <div className="text-base-content/70">{jadwal.poli}</div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box w-11/12 max-w-2xl">
            <h3 className="font-bold text-lg mb-4">Tambah Jadwal Dokter</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Dokter *</span>
                  </label>
                  <select
                    name="dokter_id"
                    value={formData.dokter_id}
                    onChange={handleInputChange}
                    className="select select-bordered"
                    required
                  >
                    <option value="">Pilih Dokter</option>
                    {dokterOptions.map(dokter => (
                      <option key={dokter.id} value={dokter.id}>{dokter.nama}</option>
                    ))}
                  </select>
                </div>
                
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Poliklinik *</span>
                  </label>
                  <select
                    name="poli_id"
                    value={formData.poli_id}
                    onChange={handleInputChange}
                    className="select select-bordered"
                    required
                  >
                    <option value="">Pilih Poliklinik</option>
                    {poliOptions.map(poli => (
                      <option key={poli.id} value={poli.id}>{poli.nama}</option>
                    ))}
                  </select>
                </div>
                
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Hari *</span>
                  </label>
                  <select
                    name="hari"
                    value={formData.hari}
                    onChange={handleInputChange}
                    className="select select-bordered"
                    required
                  >
                    <option value="">Pilih Hari</option>
                    {hariOptions.map(hari => (
                      <option key={hari} value={hari}>{hari}</option>
                    ))}
                  </select>
                </div>
                
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Kuota Pasien *</span>
                  </label>
                  <input
                    type="number"
                    name="kuota"
                    value={formData.kuota}
                    onChange={handleInputChange}
                    className="input input-bordered"
                    min="1"
                    required
                  />
                </div>
                
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Jam Mulai *</span>
                  </label>
                  <input
                    type="time"
                    name="jam_mulai"
                    value={formData.jam_mulai}
                    onChange={handleInputChange}
                    className="input input-bordered"
                    required
                  />
                </div>
                
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Jam Selesai *</span>
                  </label>
                  <input
                    type="time"
                    name="jam_selesai"
                    value={formData.jam_selesai}
                    onChange={handleInputChange}
                    className="input input-bordered"
                    required
                  />
                </div>
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Status</span>
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="select select-bordered"
                >
                  <option value="Aktif">Aktif</option>
                  <option value="Tidak Aktif">Tidak Aktif</option>
                </select>
              </div>
              
              <div className="modal-action">
                <button type="button" className="btn" onClick={() => setShowModal(false)}>
                  Batal
                </button>
                <button type="submit" className="btn btn-primary">
                  Simpan Jadwal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}