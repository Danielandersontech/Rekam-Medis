import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Pill, User, Calendar, FileText } from 'lucide-react';

export default function ResepObat() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedResep, setSelectedResep] = useState(null);
  const [formData, setFormData] = useState({
    rekam_medis_id: '',
    nama_obat: '',
    dosis: '',
    frekuensi: '',
    durasi: '',
    jumlah: '',
    instruksi: '',
    catatan: '',
  });

  const [obatList, setObatList] = useState([
    { nama_obat: '', dosis: '', frekuensi: '', durasi: '', jumlah: '', instruksi: '' }
  ]);

  const resepObatData = [
    {
      id: 1,
      no_resep: 'RX-001-2024',
      pasien: 'Sari Dewi Lestari',
      dokter: 'Dr. Ahmad Fadli, Sp.PD',
      tanggal: '2024-01-15',
      status: 'Aktif',
      total_obat: 3,
      obat_list: [
        {
          nama_obat: 'Amlodipine 5mg',
          dosis: '5mg',
          frekuensi: '1x sehari',
          durasi: '30 hari',
          jumlah: '30 tablet',
          instruksi: 'Diminum pagi hari setelah makan'
        },
        {
          nama_obat: 'Captopril 25mg',
          dosis: '25mg',
          frekuensi: '2x sehari',
          durasi: '30 hari',
          jumlah: '60 tablet',
          instruksi: 'Diminum pagi dan sore sebelum makan'
        },
        {
          nama_obat: 'Simvastatin 20mg',
          dosis: '20mg',
          frekuensi: '1x sehari',
          durasi: '30 hari',
          jumlah: '30 tablet',
          instruksi: 'Diminum malam hari setelah makan'
        }
      ]
    },
    {
      id: 2,
      no_resep: 'RX-002-2024',
      pasien: 'Budi Santoso',
      dokter: 'Dr. Maya Sari, Sp.A',
      tanggal: '2024-01-15',
      status: 'Selesai',
      total_obat: 2,
      obat_list: [
        {
          nama_obat: 'Amoxicillin Sirup 125mg/5ml',
          dosis: '125mg',
          frekuensi: '3x sehari',
          durasi: '7 hari',
          jumlah: '1 botol (60ml)',
          instruksi: 'Diminum setelah makan, kocok dahulu sebelum diminum'
        },
        {
          nama_obat: 'Paracetamol Sirup 120mg/5ml',
          dosis: '120mg',
          frekuensi: '3x sehari bila demam',
          durasi: '7 hari',
          jumlah: '1 botol (60ml)',
          instruksi: 'Diminum bila suhu >38°C'
        }
      ]
    },
    {
      id: 3,
      no_resep: 'RX-003-2024',
      pasien: 'Lisa Andriani',
      dokter: 'Dr. Reza Pratama, Sp.OG',
      tanggal: '2024-01-14',
      status: 'Aktif',
      total_obat: 2,
      obat_list: [
        {
          nama_obat: 'Asam Folat 400mcg',
          dosis: '400mcg',
          frekuensi: '1x sehari',
          durasi: '30 hari',
          jumlah: '30 tablet',
          instruksi: 'Diminum pagi hari setelah makan'
        },
        {
          nama_obat: 'Kalsium Laktat 500mg',
          dosis: '500mg',
          frekuensi: '2x sehari',
          durasi: '30 hari',
          jumlah: '60 tablet',
          instruksi: 'Diminum pagi dan malam dengan segelas susu'
        }
      ]
    },
  ];

  const rekamMedisOptions = [
    { id: 1, pasien: 'Sari Dewi Lestari', no_rekam: 'RM-001-2024' },
    { id: 2, pasien: 'Budi Santoso', no_rekam: 'RM-002-2024' },
    { id: 3, pasien: 'Lisa Andriani', no_rekam: 'RM-003-2024' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleObatChange = (index, field, value) => {
    const newObatList = [...obatList];
    newObatList[index] = { ...newObatList[index], [field]: value };
    setObatList(newObatList);
  };

  const addObat = () => {
    setObatList([...obatList, { nama_obat: '', dosis: '', frekuensi: '', durasi: '', jumlah: '', instruksi: '' }]);
  };

  const removeObat = (index) => {
    if (obatList.length > 1) {
      setObatList(obatList.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', { ...formData, obat_list: obatList });
    setShowModal(false);
  };

  const handleShowDetail = (resep) => {
    setSelectedResep(resep);
    setShowDetailModal(true);
  };

  const filteredResep = resepObatData.filter(resep =>
    resep.pasien.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resep.no_resep.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resep.dokter.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Aktif':
        return 'badge-success';
      case 'Selesai':
        return 'badge-info';
      case 'Dibatalkan':
        return 'badge-error';
      default:
        return 'badge-ghost';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Resep Obat</h1>
          <p className="text-base-content/70">Kelola resep obat dan pengobatan pasien</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
        >
          <Plus className="h-4 w-4" />
          Buat Resep Obat
        </button>
      </div>

      {/* Search */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <div className="form-control">
            <div className="input-group">
              <input
                type="text"
                placeholder="Cari pasien, nomor resep, atau dokter..."
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

      {/* Prescription Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResep.map((resep) => (
          <div key={resep.id} className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="card-body">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Pill className="h-5 w-5 text-primary" />
                  <span className="font-mono text-sm">{resep.no_resep}</span>
                </div>
                <div className={`badge ${getStatusBadge(resep.status)}`}>
                  {resep.status}
                </div>
              </div>
              
              <div className="space-y-3 mt-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <User className="h-4 w-4 text-primary" />
                    <span className="font-bold">{resep.pasien}</span>
                  </div>
                  <div className="text-sm text-base-content/70">
                    Dokter: {resep.dokter}
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(resep.tanggal).toLocaleDateString('id-ID')}</span>
                </div>
                
                <div className="divider my-2"></div>
                
                <div className="bg-base-200 p-3 rounded">
                  <div className="text-sm font-medium mb-2">Daftar Obat ({resep.total_obat} item)</div>
                  <div className="space-y-1">
                    {resep.obat_list.slice(0, 2).map((obat, index) => (
                      <div key={index} className="text-xs">
                        • {obat.nama_obat} - {obat.frekuensi}
                      </div>
                    ))}
                    {resep.obat_list.length > 2 && (
                      <div className="text-xs text-primary">
                        +{resep.obat_list.length - 2} obat lainnya
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="card-actions justify-between mt-4">
                <button 
                  className="btn btn-sm btn-outline"
                  onClick={() => handleShowDetail(resep)}
                >
                  <FileText className="h-4 w-4" />
                  Detail
                </button>
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="btn btn-ghost btn-sm">
                    ⋮
                  </div>
                  <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><a><Edit className="h-4 w-4" />Edit</a></li>
                    <li><a>Cetak Resep</a></li>
                    <li><a className="text-error"><Trash2 className="h-4 w-4" />Batalkan</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Prescription Modal */}
      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box w-11/12 max-w-6xl">
            <h3 className="font-bold text-lg mb-4">Buat Resep Obat Baru</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Patient Info */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Rekam Medis Pasien *</span>
                </label>
                <select
                  name="rekam_medis_id"
                  value={formData.rekam_medis_id}
                  onChange={handleInputChange}
                  className="select select-bordered"
                  required
                >
                  <option value="">Pilih Rekam Medis</option>
                  {rekamMedisOptions.map(rekam => (
                    <option key={rekam.id} value={rekam.id}>
                      {rekam.no_rekam} - {rekam.pasien}
                    </option>
                  ))}
                </select>
              </div>

              {/* Medicine List */}
              <div className="card bg-base-200">
                <div className="card-body">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold">Daftar Obat</h4>
                    <button type="button" className="btn btn-sm btn-primary" onClick={addObat}>
                      <Plus className="h-4 w-4" />
                      Tambah Obat
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {obatList.map((obat, index) => (
                      <div key={index} className="card bg-base-100">
                        <div className="card-body">
                          <div className="flex items-center justify-between mb-4">
                            <h5 className="font-medium">Obat #{index + 1}</h5>
                            {obatList.length > 1 && (
                              <button 
                                type="button" 
                                className="btn btn-sm btn-error btn-outline"
                                onClick={() => removeObat(index)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="form-control">
                              <label className="label">
                                <span className="label-text">Nama Obat *</span>
                              </label>
                              <input
                                type="text"
                                value={obat.nama_obat}
                                onChange={(e) => handleObatChange(index, 'nama_obat', e.target.value)}
                                className="input input-bordered input-sm"
                                placeholder="Nama obat dan kekuatan"
                                required
                              />
                            </div>
                            
                            <div className="form-control">
                              <label className="label">
                                <span className="label-text">Dosis *</span>
                              </label>
                              <input
                                type="text"
                                value={obat.dosis}
                                onChange={(e) => handleObatChange(index, 'dosis', e.target.value)}
                                className="input input-bordered input-sm"
                                placeholder="5mg, 10ml, dll"
                                required
                              />
                            </div>
                            
                            <div className="form-control">
                              <label className="label">
                                <span className="label-text">Frekuensi *</span>
                              </label>
                              <input
                                type="text"
                                value={obat.frekuensi}
                                onChange={(e) => handleObatChange(index, 'frekuensi', e.target.value)}
                                className="input input-bordered input-sm"
                                placeholder="3x sehari, 2x sehari, dll"
                                required
                              />
                            </div>
                            
                            <div className="form-control">
                              <label className="label">
                                <span className="label-text">Durasi *</span>
                              </label>
                              <input
                                type="text"
                                value={obat.durasi}
                                onChange={(e) => handleObatChange(index, 'durasi', e.target.value)}
                                className="input input-bordered input-sm"
                                placeholder="7 hari, 14 hari, dll"
                                required
                              />
                            </div>
                            
                            <div className="form-control">
                              <label className="label">
                                <span className="label-text">Jumlah *</span>
                              </label>
                              <input
                                type="text"
                                value={obat.jumlah}
                                onChange={(e) => handleObatChange(index, 'jumlah', e.target.value)}
                                className="input input-bordered input-sm"
                                placeholder="30 tablet, 1 botol, dll"
                                required
                              />
                            </div>
                            
                            <div className="form-control">
                              <label className="label">
                                <span className="label-text">Instruksi</span>
                              </label>
                              <input
                                type="text"
                                value={obat.instruksi}
                                onChange={(e) => handleObatChange(index, 'instruksi', e.target.value)}
                                className="input input-bordered input-sm"
                                placeholder="Setelah makan, sebelum tidur, dll"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
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
                  rows={3}
                  placeholder="Catatan khusus untuk pasien atau apoteker..."
                ></textarea>
              </div>
              
              <div className="modal-action">
                <button type="button" className="btn" onClick={() => setShowModal(false)}>
                  Batal
                </button>
                <button type="submit" className="btn btn-primary">
                  Simpan Resep
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedResep && (
        <div className="modal modal-open">
          <div className="modal-box w-11/12 max-w-4xl">
            <h3 className="font-bold text-lg mb-4">Detail Resep Obat</h3>
            
            <div className="space-y-6">
              {/* Header Info */}
              <div className="card bg-base-200">
                <div className="card-body">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <div className="text-sm text-base-content/70">No. Resep</div>
                      <div className="font-bold">{selectedResep.no_resep}</div>
                    </div>
                    <div>
                      <div className="text-sm text-base-content/70">Pasien</div>
                      <div className="font-bold">{selectedResep.pasien}</div>
                    </div>
                    <div>
                      <div className="text-sm text-base-content/70">Dokter</div>
                      <div className="font-bold">{selectedResep.dokter}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Medicine List */}
              <div className="card bg-base-100">
                <div className="card-body">
                  <h4 className="font-bold mb-4">Daftar Obat</h4>
                  <div className="space-y-4">
                    {selectedResep.obat_list.map((obat, index) => (
                      <div key={index} className="border border-base-300 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h5 className="font-bold text-primary">{obat.nama_obat}</h5>
                          <div className="badge badge-outline">{obat.dosis}</div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Frekuensi:</span> {obat.frekuensi}
                          </div>
                          <div>
                            <span className="font-medium">Durasi:</span> {obat.durasi}
                          </div>
                          <div>
                            <span className="font-medium">Jumlah:</span> {obat.jumlah}
                          </div>
                        </div>
                        
                        {obat.instruksi && (
                          <div className="mt-2 p-2 bg-base-200 rounded text-sm">
                            <span className="font-medium">Instruksi:</span> {obat.instruksi}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="modal-action">
              <button className="btn" onClick={() => setShowDetailModal(false)}>
                Tutup
              </button>
              <button className="btn btn-primary">
                Cetak Resep
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}