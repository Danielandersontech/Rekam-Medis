import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, FileText, User, Calendar, Heart } from 'lucide-react';

export default function RekamMedis() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [formData, setFormData] = useState({
    pasien_id: '',
    dokter_id: '',
    tanggal_kunjungan: '',
    keluhan_utama: '',
    riwayat_penyakit: '',
    pemeriksaan_fisik: '',
    diagnosis: '',
    tindakan: '',
    resep: '',
    catatan: '',
    tekanan_darah: '',
    suhu_tubuh: '',
    nadi: '',
    berat_badan: '',
    tinggi_badan: '',
  });

  const rekamMedisData = [
    {
      id: 1,
      no_rekam_medis: 'RM-001-2024',
      pasien: 'Sari Dewi Lestari',
      umur: 34,
      dokter: 'Dr. Ahmad Fadli, Sp.PD',
      tanggal_kunjungan: '2024-01-15',
      keluhan_utama: 'Nyeri dada dan sesak napas',
      diagnosis: 'Hipertensi Stage 1',
      tindakan: 'Pemberian obat antihipertensi',
      status: 'Aktif',
      vital_signs: {
        tekanan_darah: '150/90 mmHg',
        suhu: '36.5°C',
        nadi: '88 bpm',
        berat_badan: '65 kg',
      }
    },
    {
      id: 2,
      no_rekam_medis: 'RM-002-2024',
      pasien: 'Budi Santoso',
      umur: 8,
      dokter: 'Dr. Maya Sari, Sp.A',
      tanggal_kunjungan: '2024-01-15',
      keluhan_utama: 'Demam tinggi pada anak',
      diagnosis: 'Infeksi Saluran Pernapasan Atas',
      tindakan: 'Pemberian antibiotik dan antipiretik',
      status: 'Selesai',
      vital_signs: {
        tekanan_darah: '-',
        suhu: '39.2°C',
        nadi: '110 bpm',
        berat_badan: '25 kg',
      }
    },
    {
      id: 3,
      no_rekam_medis: 'RM-003-2024',
      pasien: 'Lisa Andriani',
      umur: 28,
      dokter: 'Dr. Reza Pratama, Sp.OG',
      tanggal_kunjungan: '2024-01-14',
      keluhan_utama: 'Konsultasi kehamilan rutin',
      diagnosis: 'Kehamilan Normal 20 minggu',
      tindakan: 'USG dan konseling kehamilan',
      status: 'Kontrol',
      vital_signs: {
        tekanan_darah: '120/80 mmHg',
        suhu: '36.8°C',
        nadi: '75 bpm',
        berat_badan: '58 kg',
      }
    },
  ];

  const pasienOptions = [
    { id: 1, nama: 'Sari Dewi Lestari' },
    { id: 2, nama: 'Budi Santoso' },
    { id: 3, nama: 'Lisa Andriani' },
    { id: 4, nama: 'Andi Wijaya' },
  ];

  const dokterOptions = [
    { id: 1, nama: 'Dr. Ahmad Fadli, Sp.PD' },
    { id: 2, nama: 'Dr. Maya Sari, Sp.A' },
    { id: 3, nama: 'Dr. Reza Pratama, Sp.OG' },
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

  const handleShowDetail = (record) => {
    setSelectedRecord(record);
    setShowDetailModal(true);
  };

  const filteredRekamMedis = rekamMedisData.filter(rekam =>
    rekam.pasien.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rekam.no_rekam_medis.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rekam.dokter.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Aktif':
        return 'badge-success';
      case 'Selesai':
        return 'badge-info';
      case 'Kontrol':
        return 'badge-warning';
      default:
        return 'badge-ghost';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Rekam Medis</h1>
          <p className="text-base-content/70">Kelola rekam medis dan riwayat kesehatan pasien</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
        >
          <Plus className="h-4 w-4" />
          Tambah Rekam Medis
        </button>
      </div>

      {/* Search */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <div className="form-control">
            <div className="input-group">
              <input
                type="text"
                placeholder="Cari pasien, nomor rekam medis, atau dokter..."
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

      {/* Medical Records Table */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>No. Rekam Medis</th>
                  <th>Pasien</th>
                  <th>Dokter</th>
                  <th>Tanggal</th>
                  <th>Diagnosis</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredRekamMedis.map((rekam) => (
                  <tr key={rekam.id}>
                    <td>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        <span className="font-mono text-sm">{rekam.no_rekam_medis}</span>
                      </div>
                    </td>
                    <td>
                      <div>
                        <div className="font-medium">{rekam.pasien}</div>
                        <div className="text-sm text-base-content/70">{rekam.umur} tahun</div>
                      </div>
                    </td>
                    <td>{rekam.dokter}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {new Date(rekam.tanggal_kunjungan).toLocaleDateString('id-ID')}
                      </div>
                    </td>
                    <td>
                      <div className="max-w-xs truncate" title={rekam.diagnosis}>
                        {rekam.diagnosis}
                      </div>
                    </td>
                    <td>
                      <div className={`badge ${getStatusBadge(rekam.status)}`}>
                        {rekam.status}
                      </div>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button 
                          className="btn btn-ghost btn-sm"
                          onClick={() => handleShowDetail(rekam)}
                        >
                          <FileText className="h-4 w-4" />
                        </button>
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

      {/* Add Medical Record Modal */}
      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box w-11/12 max-w-6xl">
            <h3 className="font-bold text-lg mb-4">Tambah Rekam Medis Baru</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Patient and Doctor Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Pasien *</span>
                  </label>
                  <select
                    name="pasien_id"
                    value={formData.pasien_id}
                    onChange={handleInputChange}
                    className="select select-bordered"
                    required
                  >
                    <option value="">Pilih Pasien</option>
                    {pasienOptions.map(pasien => (
                      <option key={pasien.id} value={pasien.id}>{pasien.nama}</option>
                    ))}
                  </select>
                </div>
                
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
                
                <div className="form-control md:col-span-2">
                  <label className="label">
                    <span className="label-text">Tanggal Kunjungan *</span>
                  </label>
                  <input
                    type="date"
                    name="tanggal_kunjungan"
                    value={formData.tanggal_kunjungan}
                    onChange={handleInputChange}
                    className="input input-bordered"
                    required
                  />
                </div>
              </div>

              {/* Vital Signs */}
              <div className="card bg-base-200">
                <div className="card-body">
                  <h4 className="font-bold mb-4">Tanda-tanda Vital</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Tekanan Darah</span>
                      </label>
                      <input
                        type="text"
                        name="tekanan_darah"
                        value={formData.tekanan_darah}
                        onChange={handleInputChange}
                        className="input input-bordered input-sm"
                        placeholder="120/80 mmHg"
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Suhu Tubuh</span>
                      </label>
                      <input
                        type="text"
                        name="suhu_tubuh"
                        value={formData.suhu_tubuh}
                        onChange={handleInputChange}
                        className="input input-bordered input-sm"
                        placeholder="36.5°C"
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Nadi</span>
                      </label>
                      <input
                        type="text"
                        name="nadi"
                        value={formData.nadi}
                        onChange={handleInputChange}
                        className="input input-bordered input-sm"
                        placeholder="80 bpm"
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Berat Badan</span>
                      </label>
                      <input
                        type="text"
                        name="berat_badan"
                        value={formData.berat_badan}
                        onChange={handleInputChange}
                        className="input input-bordered input-sm"
                        placeholder="65 kg"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Medical Information */}
              <div className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Keluhan Utama *</span>
                  </label>
                  <textarea
                    name="keluhan_utama"
                    value={formData.keluhan_utama}
                    onChange={handleInputChange}
                    className="textarea textarea-bordered"
                    rows={2}
                    placeholder="Keluhan utama yang disampaikan pasien..."
                    required
                  ></textarea>
                </div>
                
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Riwayat Penyakit</span>
                  </label>
                  <textarea
                    name="riwayat_penyakit"
                    value={formData.riwayat_penyakit}
                    onChange={handleInputChange}
                    className="textarea textarea-bordered"
                    rows={2}
                    placeholder="Riwayat penyakit pasien..."
                  ></textarea>
                </div>
                
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Pemeriksaan Fisik</span>
                  </label>
                  <textarea
                    name="pemeriksaan_fisik"
                    value={formData.pemeriksaan_fisik}
                    onChange={handleInputChange}
                    className="textarea textarea-bordered"
                    rows={3}
                    placeholder="Hasil pemeriksaan fisik pasien..."
                  ></textarea>
                </div>
                
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Diagnosis *</span>
                  </label>
                  <textarea
                    name="diagnosis"
                    value={formData.diagnosis}
                    onChange={handleInputChange}
                    className="textarea textarea-bordered"
                    rows={2}
                    placeholder="Diagnosis medis berdasarkan pemeriksaan..."
                    required
                  ></textarea>
                </div>
                
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Tindakan</span>
                  </label>
                  <textarea
                    name="tindakan"
                    value={formData.tindakan}
                    onChange={handleInputChange}
                    className="textarea textarea-bordered"
                    rows={2}
                    placeholder="Tindakan medis yang dilakukan..."
                  ></textarea>
                </div>
                
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Catatan Tambahan</span>
                  </label>
                  <textarea
                    name="catatan"
                    value={formData.catatan}
                    onChange={handleInputChange}
                    className="textarea textarea-bordered"
                    rows={2}
                    placeholder="Catatan khusus atau instruksi untuk pasien..."
                  ></textarea>
                </div>
              </div>
              
              <div className="modal-action">
                <button type="button" className="btn" onClick={() => setShowModal(false)}>
                  Batal
                </button>
                <button type="submit" className="btn btn-primary">
                  Simpan Rekam Medis
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedRecord && (
        <div className="modal modal-open">
          <div className="modal-box w-11/12 max-w-4xl">
            <h3 className="font-bold text-lg mb-4">Detail Rekam Medis</h3>
            
            <div className="space-y-6">
              {/* Header Info */}
              <div className="card bg-base-200">
                <div className="card-body">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <div className="text-sm text-base-content/70">No. Rekam Medis</div>
                      <div className="font-bold">{selectedRecord.no_rekam_medis}</div>
                    </div>
                    <div>
                      <div className="text-sm text-base-content/70">Pasien</div>
                      <div className="font-bold">{selectedRecord.pasien}</div>
                      <div className="text-sm">{selectedRecord.umur} tahun</div>
                    </div>
                    <div>
                      <div className="text-sm text-base-content/70">Dokter</div>
                      <div className="font-bold">{selectedRecord.dokter}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vital Signs */}
              <div className="card bg-base-200">
                <div className="card-body">
                  <h4 className="font-bold mb-4 flex items-center gap-2">
                    <Heart className="h-5 w-5 text-error" />
                    Tanda-tanda Vital
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="stat">
                      <div className="stat-title text-xs">Tekanan Darah</div>
                      <div className="stat-value text-sm">{selectedRecord.vital_signs.tekanan_darah}</div>
                    </div>
                    <div className="stat">
                      <div className="stat-title text-xs">Suhu</div>
                      <div className="stat-value text-sm">{selectedRecord.vital_signs.suhu}</div>
                    </div>
                    <div className="stat">
                      <div className="stat-title text-xs">Nadi</div>
                      <div className="stat-value text-sm">{selectedRecord.vital_signs.nadi}</div>
                    </div>
                    <div className="stat">
                      <div className="stat-title text-xs">Berat Badan</div>
                      <div className="stat-value text-sm">{selectedRecord.vital_signs.berat_badan}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Medical Info */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold mb-2">Keluhan Utama</h4>
                  <div className="bg-base-200 p-3 rounded">{selectedRecord.keluhan_utama}</div>
                </div>
                
                <div>
                  <h4 className="font-bold mb-2">Diagnosis</h4>
                  <div className="bg-base-200 p-3 rounded">{selectedRecord.diagnosis}</div>
                </div>
                
                <div>
                  <h4 className="font-bold mb-2">Tindakan</h4>
                  <div className="bg-base-200 p-3 rounded">{selectedRecord.tindakan}</div>
                </div>
              </div>
            </div>
            
            <div className="modal-action">
              <button className="btn" onClick={() => setShowDetailModal(false)}>
                Tutup
              </button>
              <button className="btn btn-primary">
                Cetak Rekam Medis
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}