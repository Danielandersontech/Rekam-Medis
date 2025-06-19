import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Building2, Users, Clock } from 'lucide-react';

export default function Poli() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nama_poli: '',
    kode_poli: '',
    deskripsi: '',
    lokasi: '',
    kapasitas: '',
    fasilitas: '',
    jam_operasional: '',
    telepon: '',
    kepala_poli: '',
  });

  const poliData = [
    {
      id: 1,
      nama_poli: 'Poliklinik Penyakit Dalam',
      kode_poli: 'POLI-PD',
      deskripsi: 'Pelayanan kesehatan untuk penyakit dalam dewasa',
      lokasi: 'Lantai 2, Ruang 201-205',
      kapasitas: 20,
      jam_operasional: '08:00-16:00',
      total_dokter: 4,
      status: 'Aktif',
      kepala_poli: 'Dr. Ahmad Fadli, Sp.PD',
    },
    {
      id: 2,
      nama_poli: 'Poliklinik Anak',
      kode_poli: 'POLI-A',
      deskripsi: 'Pelayanan kesehatan khusus anak dan remaja',
      lokasi: 'Lantai 1, Ruang 101-103',
      kapasitas: 15,
      jam_operasional: '08:00-17:00',
      total_dokter: 3,
      status: 'Aktif',
      kepala_poli: 'Dr. Maya Sari, Sp.A',
    },
    {
      id: 3,
      nama_poli: 'Poliklinik Obstetri & Ginekologi',
      kode_poli: 'POLI-OG',
      deskripsi: 'Pelayanan kesehatan wanita dan kandungan',
      lokasi: 'Lantai 3, Ruang 301-308',
      kapasitas: 25,
      jam_operasional: '08:00-18:00',
      total_dokter: 5,
      status: 'Aktif',
      kepala_poli: 'Dr. Reza Pratama, Sp.OG',
    },
    {
      id: 4,
      nama_poli: 'Poliklinik Bedah',
      kode_poli: 'POLI-B',
      deskripsi: 'Pelayanan bedah umum dan konsultasi pre-operasi',
      lokasi: 'Lantai 2, Ruang 206-210',
      kapasitas: 18,
      jam_operasional: '07:00-15:00',
      total_dokter: 3,
      status: 'Aktif',
      kepala_poli: 'Dr. Indra Gunawan, Sp.B',
    },
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

  const filteredPoli = poliData.filter(poli =>
    poli.nama_poli.toLowerCase().includes(searchTerm.toLowerCase()) ||
    poli.kode_poli.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Data Poliklinik</h1>
          <p className="text-base-content/70">Kelola data poliklinik dan unit pelayanan</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
        >
          <Plus className="h-4 w-4" />
          Tambah Poliklinik
        </button>
      </div>

      {/* Search */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <div className="form-control">
            <div className="input-group">
              <input
                type="text"
                placeholder="Cari nama poliklinik atau kode..."
                className="input input-bordered w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="btn btn-square">
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Polyclinic Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPoli.map((poli) => (
          <div key={poli.id} className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="card-body">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="card-title text-lg">{poli.nama_poli}</h3>
                    <div className="badge badge-outline">{poli.kode_poli}</div>
                  </div>
                </div>
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="btn btn-ghost btn-sm">
                    ⋮
                  </div>
                  <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><a><Edit className="h-4 w-4" />Edit</a></li>
                    <li><a className="text-error"><Trash2 className="h-4 w-4" />Hapus</a></li>
                  </ul>
                </div>
              </div>
              
              <p className="text-sm text-base-content/70 mt-2">{poli.deskripsi}</p>
              
              <div className="space-y-2 mt-4">
                <div className="flex items-center gap-2 text-sm">
                  <Building2 className="h-4 w-4 text-base-content/50" />
                  <span>{poli.lokasi}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-base-content/50" />
                  <span>{poli.jam_operasional}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-base-content/50" />
                  <span>Kapasitas: {poli.kapasitas} pasien</span>
                </div>
              </div>
              
              <div className="divider my-4"></div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-base-content/70">Kepala Poliklinik</div>
                  <div className="font-medium text-sm">{poli.kepala_poli}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-base-content/70">Total Dokter</div>
                  <div className="font-bold text-primary text-lg">{poli.total_dokter}</div>
                </div>
              </div>
              
              <div className="card-actions justify-end mt-4">
                <div className="badge badge-success">{poli.status}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Polyclinic Modal */}
      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box w-11/12 max-w-3xl">
            <h3 className="font-bold text-lg mb-4">Tambah Poliklinik Baru</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Nama Poliklinik *</span>
                  </label>
                  <input
                    type="text"
                    name="nama_poli"
                    value={formData.nama_poli}
                    onChange={handleInputChange}
                    className="input input-bordered"
                    required
                  />
                </div>
                
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Kode Poliklinik *</span>
                  </label>
                  <input
                    type="text"
                    name="kode_poli"
                    value={formData.kode_poli}
                    onChange={handleInputChange}
                    className="input input-bordered"
                    placeholder="POLI-XX"
                    required
                  />
                </div>
                
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Lokasi *</span>
                  </label>
                  <input
                    type="text"
                    name="lokasi"
                    value={formData.lokasi}
                    onChange={handleInputChange}
                    className="input input-bordered"
                    placeholder="Lantai X, Ruang XXX"
                    required
                  />
                </div>
                
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Kapasitas Pasien *</span>
                  </label>
                  <input
                    type="number"
                    name="kapasitas"
                    value={formData.kapasitas}
                    onChange={handleInputChange}
                    className="input input-bordered"
                    min="1"
                    required
                  />
                </div>
                
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Jam Operasional *</span>
                  </label>
                  <input
                    type="text"
                    name="jam_operasional"
                    value={formData.jam_operasional}
                    onChange={handleInputChange}
                    className="input input-bordered"
                    placeholder="08:00-16:00"
                    required
                  />
                </div>
                
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Telepon</span>
                  </label>
                  <input
                    type="tel"
                    name="telepon"
                    value={formData.telepon}
                    onChange={handleInputChange}
                    className="input input-bordered"
                  />
                </div>
                
                <div className="form-control md:col-span-2">
                  <label className="label">
                    <span className="label-text">Kepala Poliklinik</span>
                  </label>
                  <input
                    type="text"
                    name="kepala_poli"
                    value={formData.kepala_poli}
                    onChange={handleInputChange}
                    className="input input-bordered"
                    placeholder="Dr. Nama Lengkap, Sp.XX"
                  />
                </div>
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Deskripsi *</span>
                </label>
                <textarea
                  name="deskripsi"
                  value={formData.deskripsi}
                  onChange={handleInputChange}
                  className="textarea textarea-bordered"
                  rows={3}
                  placeholder="Jelaskan layanan yang tersedia di poliklinik ini..."
                  required
                ></textarea>
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Fasilitas</span>
                </label>
                <textarea
                  name="fasilitas"
                  value={formData.fasilitas}
                  onChange={handleInputChange}
                  className="textarea textarea-bordered"
                  rows={2}
                  placeholder="Ruang tunggu, ruang periksa, dll..."
                ></textarea>
              </div>
              
              <div className="modal-action">
                <button type="button" className="btn" onClick={() => setShowModal(false)}>
                  Batal
                </button>
                <button type="submit" className="btn btn-primary">
                  Simpan Data
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}