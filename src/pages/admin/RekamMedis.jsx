import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, FileText, User, Calendar, Heart, AlertCircle } from 'lucide-react';
import { rekamMedisAPI } from '../../services/rekamMedisAPI';

export default function RekamMedis() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [rekamMedisData, setRekamMedisData] = useState([]);
  const [appointmentOptions, setAppointmentOptions] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    id_appointment: '',
    keluhan_utama: '',
    diagnosis: '',
    tindakan: '',
    tekanan_darah: '',
    suhu: '',
    nadi: '',
    berat_badan: '',
    status: 'Aktif'
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      setError('');
      console.log('Loading rekam medis data...');

      const [rekamMedis, appointments] = await Promise.all([
        rekamMedisAPI.fetchRekamMedis().catch(err => {
          console.error('Error loading rekam medis:', err);
          return [];
        }),
        rekamMedisAPI.fetchAppointmentOptions().catch(err => {
          console.error('Error loading appointments:', err);
          return [];
        })
      ]);

      console.log('Loaded data:', { rekamMedis, appointments });

      setRekamMedisData(Array.isArray(rekamMedis) ? rekamMedis : []);
      setAppointmentOptions(Array.isArray(appointments) ? appointments : []);

    } catch (error) {
      console.error('Error loading data:', error);
      setError('Gagal memuat data. Silakan periksa koneksi internet dan coba lagi.');
      setRekamMedisData([]);
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
    setError('');

    try {
      setIsLoading(true);
      console.log('Submitting form:', formData);

      if (!formData.id_appointment || !formData.keluhan_utama || !formData.diagnosis) {
        throw new Error('Field wajib harus diisi: Appointment, Keluhan Utama, dan Diagnosis');
      }

      let result;
      if (isEdit && editId) {
        result = await rekamMedisAPI.updateRekamMedis(editId, formData);
        console.log('Update result:', result);
        setRekamMedisData(prev =>
          prev.map(item => item.id === result.id ? result : item)
        );
        alert('Rekam medis berhasil diupdate!');
      } else {
        result = await rekamMedisAPI.createRekamMedis(formData);
        console.log('Create result:', result);
        setRekamMedisData(prev => [result, ...prev]);
        alert('Rekam medis berhasil dibuat!');
      }

      setShowModal(false);
      resetForm();
      const newAppointments = await rekamMedisAPI.fetchAppointmentOptions();
      setAppointmentOptions(newAppointments);

    } catch (error) {
      console.error('Error saving rekam medis:', error);
      setError(error.message || 'Gagal menyimpan rekam medis');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (record) => {
    console.log('Editing rekam medis:', record);
    if (!record) {
      alert('Data rekam medis tidak valid');
      return;
    }

    setFormData({
      id_appointment: record.id_appointment?.toString() || '',
      keluhan_utama: record.keluhan_utama || '',
      diagnosis: record.diagnosis || '',
      tindakan: record.tindakan || '',
      tekanan_darah: record.tekanan_darah || '',
      suhu: record.suhu || '',
      nadi: record.nadi || '',
      berat_badan: record.berat_badan || '',
      status: record.status || 'Aktif'
    });

    setIsEdit(true);
    setEditId(record.id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Yakin ingin menghapus rekam medis ini?')) {
      try {
        setIsLoading(true);
        await rekamMedisAPI.deleteRekamMedis(id);
        setRekamMedisData(prev => prev.filter(item => item.id !== id));
        alert('Rekam medis berhasil dihapus!');
        const newAppointments = await rekamMedisAPI.fetchAppointmentOptions();
        setAppointmentOptions(newAppointments);
      } catch (error) {
        console.error('Error deleting rekam medis:', error);
        alert('Gagal menghapus rekam medis: ' + error.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleShowDetail = (record) => {
    setSelectedRecord(record);
    setShowDetailModal(true);
  };

  const resetForm = () => {
    setFormData({
      id_appointment: '',
      keluhan_utama: '',
      diagnosis: '',
      tindakan: '',
      tekanan_darah: '',
      suhu: '',
      nadi: '',
      berat_badan: '',
      status: 'Aktif'
    });
    setIsEdit(false);
    setEditId(null);
    setError('');
  };

  const filteredRekamMedis = rekamMedisData.filter(rekam => {
    if (!rekam) return false;

    const pasienNama = rekam.appointment?.pasien?.nama || 'Unknown';
    const dokterNama = rekam.appointment?.dokter?.nama || 'Unknown';
    const nomorRM = rekam.no_rekam_medis || '';

    return pasienNama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dokterNama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nomorRM.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Aktif':
        return 'bg-green-100 text-green-800';
      case 'Selesai':
        return 'bg-blue-100 text-blue-800';
      case 'Archived':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateAge = (birthDate) => {
    if (!birthDate) return 'Unknown';
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="container mx-auto p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Rekam Medis</h1>
          <p className="text-gray-600">Kelola rekam medis dan riwayat kesehatan pasien</p>
        </div>
        <button
          className="btn btn-primary flex items-center gap-2"
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <Plus className="h-4 w-4" />
          )}
          Tambah Rekam Medis
        </button>
      </div>

      {error && (
        <div className="alert alert-error shadow-lg">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
          <button className="btn btn-sm btn-ghost" onClick={() => setError('')}>×</button>
        </div>
      )}

      <div className="card bg-white shadow-md rounded-lg">
        <div className="card-body">
          <div className="form-control">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari pasien, nomor rekam medis, atau dokter..."
                className="input input-bordered w-full pl-10 focus:ring-2 focus:ring-primary transition"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="flex justify-center py-8">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      )}

      {!isLoading && rekamMedisData.length === 0 && (
        <div className="card bg-white shadow-md rounded-lg">
          <div className="card-body text-center py-12">
            <div className="text-gray-400 mb-4">
              <FileText className="h-12 w-12 mx-auto mb-2" />
              <p>Belum ada data rekam medis</p>
              {error && <p className="text-error mt-2">{error}</p>}
            </div>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => {
                resetForm();
                setShowModal(true);
              }}
              disabled={appointmentOptions.length === 0}
            >
              Buat Rekam Medis Pertama
            </button>
          </div>
        </div>
      )}

      {!isLoading && rekamMedisData.length > 0 && (
        <div className="card bg-white shadow-md rounded-lg">
          <div className="card-body">
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr className="text-gray-700">
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
                  {filteredRekamMedis.map((rekam) => {
                    const pasienNama = rekam.appointment?.pasien?.nama || 'Unknown Patient';
                    const pasienUmur = calculateAge(rekam.appointment?.pasien?.tanggal_lahir);
                    const dokterNama = rekam.appointment?.dokter?.nama || 'Unknown Doctor';

                    return (
                      <tr key={rekam.id} className="hover:bg-gray-50">
                        <td>
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-primary" />
                            <span className="font-mono text-sm">{rekam.no_rekam_medis}</span>
                          </div>
                        </td>
                        <td>
                          <div>
                            <div className="font-medium text-gray-800">{pasienNama}</div>
                            <div className="text-sm text-gray-500">{pasienUmur} tahun</div>
                          </div>
                        </td>
                        <td className="text-gray-800">{dokterNama}</td>
                        <td>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            {new Date(rekam.created_at).toLocaleDateString('id-ID')}
                          </div>
                        </td>
                        <td>
                          <div className="max-w-xs truncate text-gray-800" title={rekam.diagnosis}>
                            {rekam.diagnosis}
                          </div>
                        </td>
                        <td>
                          <div className={`badge ${getStatusBadge(rekam.status)} px-3 py-1 rounded-full`}>
                            {rekam.status}
                          </div>
                        </td>
                        <td>
                          <div className="flex gap-2">
                            <button
                              className="btn btn-ghost btn-sm hover:bg-primary hover:text-white transition"
                              onClick={() => handleShowDetail(rekam)}
                            >
                              <FileText className="h-4 w-4" />
                            </button>
                            <button
                              className="btn btn-ghost btn-sm hover:bg-primary hover:text-white transition"
                              onClick={() => handleEdit(rekam)}
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              className="btn btn-ghost btn-sm text-error hover:bg-error hover:text-white transition"
                              onClick={() => handleDelete(rekam.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="modal modal-open fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="modal-box w-full max-w-3xl bg-white rounded-xl shadow-2xl p-6 transform transition-all duration-300">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-2xl text-gray-800">
                {isEdit ? 'Edit Rekam Medis' : 'Tambah Rekam Medis Baru'}
              </h3>
              <button
                className="btn btn-ghost btn-sm hover:bg-gray-100"
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {error && (
              <div className="alert alert-error shadow-sm mb-6">
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-gray-700">Pilih Appointment *</span>
                </label>
                <select
                  name="id_appointment"
                  value={formData.id_appointment}
                  onChange={handleInputChange}
                  className="select select-bordered w-full focus:ring-2 focus:ring-primary transition"
                  required
                  disabled={appointmentOptions.length === 0 || isEdit}
                >
                  <option value="">
                    {appointmentOptions.length === 0 ? 'Tidak ada appointment yang tersedia' : 'Pilih Appointment'}
                  </option>
                  {appointmentOptions.map(appointment => (
                    <option key={appointment.id} value={appointment.id}>
                      {appointment.pasien?.nama} - {appointment.dokter?.nama} - {new Date(appointment.tgl_kunjungan).toLocaleDateString('id-ID')}
                    </option>
                  ))}
                </select>
                {appointmentOptions.length === 0 && (
                  <div className="label">
                    <span className="label-text-alt text-error">Tidak ada appointment dengan status 'selesai' yang belum memiliki rekam medis</span>
                  </div>
                )}
                {isEdit && (
                  <div className="label">
                    <span className="label-text-alt text-info">Appointment tidak dapat diubah saat edit</span>
                  </div>
                )}
              </div>

              <div className="card bg-gray-50 rounded-lg shadow-sm">
                <div className="card-body">
                  <h4 className="font-bold text-lg text-gray-800 mb-4">Tanda-tanda Vital</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-gray-700">Tekanan Darah</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="tekanan_darah"
                          value={formData.tekanan_darah}
                          onChange={handleInputChange}
                          className="input input-bordered w-full focus:ring-2 focus:ring-primary transition"
                          placeholder="120/80 mmHg"
                        />
                        <Heart className="h-4 w-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      </div>
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-gray-700">Suhu Tubuh</span>
                      </label>
                      <input
                        type="text"
                        name="suhu"
                        value={formData.suhu}
                        onChange={handleInputChange}
                        className="input input-bordered w-full focus:ring-2 focus:ring-primary transition"
                        placeholder="36.5°C"
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-gray-700">Nadi</span>
                      </label>
                      <input
                        type="text"
                        name="nadi"
                        value={formData.nadi}
                        onChange={handleInputChange}
                        className="input input-bordered w-full focus:ring-2 focus:ring-primary transition"
                        placeholder="80 bpm"
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-gray-700">Berat Badan</span>
                      </label>
                      <input
                        type="text"
                        name="berat_badan"
                        value={formData.berat_badan}
                        onChange={handleInputChange}
                        className="input input-bordered w-full focus:ring-2 focus:ring-primary transition"
                        placeholder="65 kg"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium text-gray-700">Keluhan Utama *</span>
                  </label>
                  <textarea
                    name="keluhan_utama"
                    value={formData.keluhan_utama}
                    onChange={handleInputChange}
                    className="textarea textarea-bordered w-full h-24 focus:ring-2 focus:ring-primary transition"
                    placeholder="Keluhan utama yang disampaikan pasien..."
                    required
                  ></textarea>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium text-gray-700">Diagnosis *</span>
                  </label>
                  <textarea
                    name="diagnosis"
                    value={formData.diagnosis}
                    onChange={handleInputChange}
                    className="textarea textarea-bordered w-full h-24 focus:ring-2 focus:ring-primary transition"
                    placeholder="Diagnosis medis berdasarkan pemeriksaan..."
                    required
                  ></textarea>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium text-gray-700">Tindakan</span>
                  </label>
                  <textarea
                    name="tindakan"
                    value={formData.tindakan}
                    onChange={handleInputChange}
                    className="textarea textarea-bordered w-full h-24 focus:ring-2 focus:ring-primary transition"
                    placeholder="Tindakan medis yang dilakukan, resep obat, atau anjuran untuk pasien..."
                  ></textarea>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium text-gray-700">Status</span>
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="select select-bordered w-full focus:ring-2 focus:ring-primary transition"
                  >
                    <option value="Aktif">Aktif</option>
                    <option value="Selesai">Selesai</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
              </div>

              <div className="modal-action flex justify-end gap-3">
                <button
                  type="button"
                  className="btn btn-outline hover:bg-gray-100 transition"
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
                  className="btn btn-primary flex items-center gap-2"
                  disabled={isLoading || appointmentOptions.length === 0}
                >
                  {isLoading ? (
                    <span className="loading loading-spinner"></span>
                  ) : isEdit ? (
                    'Update Rekam Medis'
                  ) : (
                    'Simpan Rekam Medis'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDetailModal && selectedRecord && (
        <div className="modal modal-open fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="modal-box w-full max-w-4xl bg-white rounded-xl shadow-2xl p-6">
            <h3 className="font-bold text-2xl text-gray-800 mb-6">Detail Rekam Medis</h3>

            <div className="space-y-6">
              <div className="card bg-gray-50 rounded-lg shadow-sm">
                <div className="card-body">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <div className="text-sm text-gray-600">No. Rekam Medis</div>
                      <div className="font-bold text-gray-800">{selectedRecord.no_rekam_medis}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Pasien</div>
                      <div className="font-bold text-gray-800">{selectedRecord.appointment?.pasien?.nama || 'Unknown'}</div>
                      <div className="text-sm text-gray-500">
                        {calculateAge(selectedRecord.appointment?.pasien?.tanggal_lahir)} tahun, {selectedRecord.appointment?.pasien?.jenis_kelamin || 'Unknown'}
                      </div>
                      <div className="text-sm text-gray-600">
                        NIK: {selectedRecord.appointment?.pasien?.nik || 'No NIK'}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Dokter</div>
                      <div className="font-bold text-gray-800">{selectedRecord.appointment?.dokter?.nama || 'Unknown'}</div>
                      <div className="text-sm text-gray-600">
                        {selectedRecord.appointment?.poli?.nama_poli || 'Unknown Poli'}
                      </div>
                    </div>
                  </div>

                  <div className="divider my-4"></div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Tanggal Kunjungan:</span>
                      <div className="font-medium text-gray-800">
                        {selectedRecord.appointment?.tgl_kunjungan
                          ? new Date(selectedRecord.appointment.tgl_kunjungan).toLocaleString('id-ID')
                          : 'Unknown'
                        }
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600">Tanggal Rekam Medis:</span>
                      <div className="font-medium text-gray-800">
                        {new Date(selectedRecord.created_at).toLocaleString('id-ID')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card bg-gray-50 rounded-lg shadow-sm">
                <div className="card-body">
                  <h4 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-500" />
                    Tanda-tanda Vital
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="stat">
                      <div className="stat-title text-xs text-gray-600">Tekanan Darah</div>
                      <div className="stat-value text-sm text-gray-800">
                        {selectedRecord.tekanan_darah || 'Tidak dicatat'}
                      </div>
                    </div>
                    <div className="stat">
                      <div className="stat-title text-xs text-gray-600">Suhu</div>
                      <div className="stat-value text-sm text-gray-800">
                        {selectedRecord.suhu || 'Tidak dicatat'}
                      </div>
                    </div>
                    <div className="stat">
                      <div className="stat-title text-xs text-gray-600">Nadi</div>
                      <div className="stat-value text-sm text-gray-800">
                        {selectedRecord.nadi || 'Tidak dicatat'}
                      </div>
                    </div>
                    <div className="stat">
                      <div className="stat-title text-xs text-gray-600">Berat Badan</div>
                      <div className="stat-value text-sm text-gray-800">
                        {selectedRecord.berat_badan || 'Tidak dicatat'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-lg text-gray-800 mb-2">Keluhan Utama</h4>
                  <div className="bg-gray-50 p-4 rounded-lg text-gray-800">
                    {selectedRecord.keluhan_utama || 'Tidak ada keluhan tercatat'}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-lg text-gray-800 mb-2">Diagnosis</h4>
                  <div className="bg-gray-50 p-4 rounded-lg text-gray-800">
                    {selectedRecord.diagnosis || 'Tidak ada diagnosis tercatat'}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-lg text-gray-800 mb-2">Tindakan & Pengobatan</h4>
                  <div className="bg-gray-50 p-4 rounded-lg text-gray-800">
                    {selectedRecord.tindakan || 'Tidak ada tindakan tercatat'}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm text-gray-600">Status:</span>
                    <div className={`badge ${getStatusBadge(selectedRecord.status)} px-3 py-1 rounded-full ml-2`}>
                      {selectedRecord.status}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-action flex justify-end gap-3">
              <button
                className="btn btn-outline hover:bg-gray-100 transition"
                onClick={() => setShowDetailModal(false)}
              >
                Tutup
              </button>
              <button
                className="btn btn-primary flex items-center gap-2"
                onClick={() => {
                  setShowDetailModal(false);
                  handleEdit(selectedRecord);
                }}
              >
                Edit Rekam Medis
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}