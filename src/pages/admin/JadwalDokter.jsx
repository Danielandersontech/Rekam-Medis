import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Calendar, Clock, User } from 'lucide-react';
import { jadwalDokterAPI } from '../../services/jadwalDokterAPI';

export default function JadwalDokter() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [filterHari, setFilterHari] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [jadwalData, setJadwalData] = useState([]);
  const [dokterOptions, setDokterOptions] = useState([]);
  const [poliOptions, setPoliOptions] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  
  const [formData, setFormData] = useState({
    dokter_id: '',
    poli_id: '',
    hari: '',
    jam_mulai: '',
    jam_selesai: '',
    kuota: '',
    status: 'Aktif',
  });

  const hariOptions = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      // Parallel data fetching
      const [jadwal, dokter, poli] = await Promise.all([
        jadwalDokterAPI.fetchJadwal(),
        jadwalDokterAPI.fetchDokterOptions(),
        jadwalDokterAPI.fetchPoliOptions()
      ]);
      
      setJadwalData(jadwal);
      setDokterOptions(dokter);
      setPoliOptions(poli);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      if (isEdit && editId) {
        await jadwalDokterAPI.updateJadwal(editId, formData);
      } else {
        await jadwalDokterAPI.createJadwal(formData);
      }
      setShowModal(false);
      loadData();
      resetForm();
    } catch (error) {
      console.error('Error saving schedule:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (jadwal) => {
    setFormData({
      dokter_id: jadwal.dokter_id,
      poli_id: jadwal.poli_id,
      hari: jadwal.hari,
      jam_mulai: jadwal.jam_mulai,
      jam_selesai: jadwal.jam_selesai,
      kuota: jadwal.kuota,
      status: jadwal.status
    });
    setIsEdit(true);
    setEditId(jadwal.id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Yakin ingin menghapus jadwal ini?')) {
      try {
        setIsLoading(true);
        await jadwalDokterAPI.deleteJadwal(id);
        loadData();
      } catch (error) {
        console.error('Error deleting schedule:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      dokter_id: '',
      poli_id: '',
      hari: '',
      jam_mulai: '',
      jam_selesai: '',
      kuota: '',
      status: 'Aktif',
    });
    setIsEdit(false);
    setEditId(null);
  };

  const filteredJadwal = jadwalData.filter(jadwal => {
    const matchSearch = jadwal.dokter.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       jadwal.poli.nama_poli.toLowerCase().includes(searchTerm.toLowerCase());
    const matchHari = filterHari === '' || jadwal.hari === filterHari;
    return matchSearch && matchHari;
  });

  const getStatusColor = (kuota, terpakai) => {
    const persentase = (terpakai / kuota) * 100;
    if (persentase >= 90) return 'bg-red-100 text-red-800';
    if (persentase >= 70) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  return (
    <div className="container mx-auto p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Jadwal Dokter</h1>
          <p className="text-sm text-gray-600">Kelola jadwal praktek dokter dengan mudah</p>
        </div>
        <button 
          className="btn btn-primary flex items-center gap-2 transition-all hover:scale-105"
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          disabled={isLoading}
        >
          <Plus className="h-5 w-5" />
          Tambah Jadwal
        </button>
      </div>

      {/* Search and Filter Section */}
      <div className="card bg-white shadow-sm rounded-lg">
        <div className="card-body">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Cari dokter atau poliklinik..."
                className="input input-bordered w-full pl-10 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select 
              className="select select-bordered w-full sm:w-48 rounded-lg focus:ring-2 focus:ring-primary"
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

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center py-12">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      )}

      {/* Main Content */}
      {!isLoading && (
        <>
          {/* Schedule Table */}
          <div className="card bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="card-body p-0">
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead className="bg-gray-100">
                    <tr className="text-gray-600">
                      <th className="p-4">No</th>
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
                      <tr key={jadwal.id} className="hover:bg-gray-50 transition-colors">
                        <td className="p-4">{index + 1}</td>
                        <td>
                          <div className="flex items-center gap-3">
                            <User className="h-5 w-5 text-primary" />
                            <span className="font-medium text-gray-800">{jadwal.dokter.nama}</span>
                          </div>
                        </td>
                        <td className="text-gray-700">{jadwal.poli.nama_poli}</td>
                        <td>
                          <div className="flex items-center gap-3">
                            <Calendar className="h-5 w-5 text-gray-500" />
                            <span className="font-medium text-gray-800">{jadwal.hari}</span>
                          </div>
                        </td>
                        <td>
                          <div className="flex items-center gap-3">
                            <Clock className="h-5 w-5 text-gray-500" />
                            <span className="text-gray-700">{jadwal.jam_mulai} - {jadwal.jam_selesai}</span>
                          </div>
                        </td>
                        <td>
                          <div className={`px-3 py-1 rounded-full ${getStatusColor(jadwal.kuota, jadwal.terpakai || 0)}`}>
                            <span className="font-medium">{jadwal.terpakai || 0}/{jadwal.kuota}</span>
                            <div className="text-xs opacity-80">
                              {Math.round(((jadwal.terpakai || 0) / jadwal.kuota) * 100)}% terisi
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className={`badge font-medium ${jadwal.status === 'Aktif' ? 'badge-success' : 'badge-error'}`}>
                            {jadwal.status}
                          </span>
                        </td>
                        <td>
                          <div className="flex gap-2">
                            <button 
                              className="btn btn-ghost btn-sm hover:bg-blue-100"
                              onClick={() => handleEdit(jadwal)}
                            >
                              <Edit className="h-5 w-5 text-blue-600" />
                            </button>
                            <button 
                              className="btn btn-ghost btn-sm hover:bg-red-100"
                              onClick={() => handleDelete(jadwal.id)}
                            >
                              <Trash2 className="h-5 w-5 text-red-600" />
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

          {/* Weekly Schedule View */}
          <div className="card bg-white shadow/EventDrivenArchitecture.pngsm rounded-lg">
            <div className="card-body">
              <h3 className="font-semibold text-lg text-gray-800 mb-4">Jadwal Mingguan</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                {hariOptions.map(hari => (
                  <div key={hari} className="bg-gray-50 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-semibold text-base text-center text-gray-800 mb-3">{hari}</h4>
                    <div className="space-y-3">
                      {jadwalData
                        .filter(jadwal => jadwal.hari === hari)
                        .map(jadwal => (
                          <div key={jadwal.id} className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                            <div className="font-medium text-gray-800 truncate">{jadwal.dokter.nama.split(',')[0]}</div>
                            <div className="text-sm text-primary font-medium">{jadwal.jam_mulai}-{jadwal.jam_selesai}</div>
                            <div className="text-sm text-gray-600">{jadwal.poli.nama_poli}</div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Modal Form */}
      {showModal && (
        <div className="modal modal-open bg-black/50">
          <div className="modal-box w-11/12 max-w-3xl bg-white rounded-xl shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-xl text-gray-800">
                {isEdit ? 'Edit Jadwal Dokter' : 'Tambah Jadwal Dokter'}
              </h3>
              <button 
                className="btn btn-ghost btn-sm"
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label text-gray-700 font-medium">
                    <span>Dokter *</span>
                  </label>
                  <select
                    name="dokter_id"
                    value={formData.dokter_id}
                    onChange={handleInputChange}
                    className="select select-bordered w-full rounded-lg focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="">Pilih Dokter</option>
                    {dokterOptions.map(dokter => (
                      <option key={dokter.id} value={dokter.id}>{dokter.nama}</option>
                    ))}
                  </select>
                </div>
                
                <div className="form-control">
                  <label className="label text-gray-700 font-medium">
                    <span>Poliklinik *</span>
                  </label>
                  <select
                    name="poli_id"
                    value={formData.poli_id}
                    onChange={handleInputChange}
                    className="select select-bordered w-full rounded-lg focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="">Pilih Poliklinik</option>
                    {poliOptions.map(poli => (
                      <option key={poli.id} value={poli.id}>{poli.nama_poli}</option>
                    ))}
                  </select>
                </div>
                
                <div className="form-control">
                  <label className="label text-gray-700 font-medium">
                    <span>Hari *</span>
                  </label>
                  <select
                    name="hari"
                    value={formData.hari}
                    onChange={handleInputChange}
                    className="select select-bordered w-full rounded-lg focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="">Pilih Hari</option>
                    {hariOptions.map(hari => (
                      <option key={hari} value={hari}>{hari}</option>
                    ))}
                  </select>
                </div>
                
                <div className="form-control">
                  <label className="label text-gray-700 font-medium">
                    <span>Kuota Pasien *</span>
                  </label>
                  <input
                    type="number"
                    name="kuota"
                    value={formData.kuota}
                    onChange={handleInputChange}
                    className="input input-bordered w-full rounded-lg focus:ring-2 focus:ring-primary"
                    min="1"
                    required
                  />
                </div>
                
                <div className="form-control">
                  <label className="label text-gray-700 font-medium">
                    <span>Jam Mulai *</span>
                  </label>
                  <input
                    type="time"
                    name="jam_mulai"
                    value={formData.jam_mulai}
                    onChange={handleInputChange}
                    className="input input-bordered w-full rounded-lg focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                
                <div className="form-control">
                  <label className="label text-gray-700 font-medium">
                    <span>Jam Selesai *</span>
                  </label>
                  <input
                    type="time"
                    name="jam_selesai"
                    value={formData.jam_selesai}
                    onChange={handleInputChange}
                    className="input input-bordered w-full rounded-lg focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
              </div>
              
              <div className="form-control">
                <label className="label text-gray-700 font-medium">
                  <span>Status</span>
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="select select-bordered w-full rounded-lg focus:ring-2 focus:ring-primary"
                >
                  <option value="Aktif">Aktif</option>
                  <option value="Tidak Aktif">Tidak Aktif</option>
                </select>
              </div>
              
              <div className="modal-action flex justify-end gap-3">
                <button 
                  type="button" 
                  className="btn btn-outline rounded-lg hover:bg-gray-100 transition-colors"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  disabled={isLoading}
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary rounded-lg flex items-center gap-2"
                  disabled={isLoading}
                >
                  {isLoading && <span className="loading loading-spinner"></span>}
                  {isEdit ? 'Update Jadwal' : 'Simpan Jadwal'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}