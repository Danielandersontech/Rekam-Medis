import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Building2, Users, Clock } from 'lucide-react';
import { poliAPI } from '../../services/poliAPI';
import FormModal from '../../components/admin/FormModal';
import FormInput from '../../components/admin/FormInput';
import FormSection from '../../components/admin/FormSection';

export default function Poli() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [poliData, setPoliData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const [formData, setFormData] = useState({
    nama_poli: '',
    kode_poli: '',
    deskripsi: '',
    lokasi: '',
    jam_operasional: '',
    telepon: '',
    kepala_poli: '',
  });

  useEffect(() => {
    loadPoli();
  }, []);

  const loadPoli = async () => {
    try {
      setIsLoading(true);
      setError('');
      const data = await poliAPI.fetchPoli();
      setPoliData(data);
    } catch (err) {
      setError('Gagal memuat data poli');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = async () => {
    const errors = {};

    if (!formData.nama_poli) errors.nama_poli = 'Nama poli wajib diisi';
    if (!formData.kode_poli) errors.kode_poli = 'Kode poli wajib diisi';
    if (!formData.deskripsi) errors.deskripsi = 'Deskripsi wajib diisi';
    if (!formData.lokasi) errors.lokasi = 'Lokasi wajib diisi';
    if (!formData.jam_operasional) errors.jam_operasional = 'Jam operasional wajib diisi';

    if (!isEdit) {
      if (formData.kode_poli) {
        const isKodeExist = await poliAPI.checkUniqueKodePoli(formData.kode_poli);
        if (isKodeExist) errors.kode_poli = 'Kode poli sudah terdaftar';
      }

      if (formData.nama_poli) {
        const isNamaExist = await poliAPI.checkUniqueNamaPoli(formData.nama_poli);
        if (isNamaExist) errors.nama_poli = 'Nama poli sudah terdaftar';
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = await validateForm();
    if (!isValid) return;

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      if (isEdit && editId) {
        await poliAPI.updatePoli(editId, formData);
        setSuccess('Data poli berhasil diperbarui!');
      } else {
        await poliAPI.createPoli(formData);
        setSuccess('Data poli berhasil ditambahkan!');
      }

      setFormData({
        nama_poli: '',
        kode_poli: '',
        deskripsi: '',
        lokasi: '',
        jam_operasional: '',
        telepon: '',
        kepala_poli: '',
      });

      setIsEdit(false);
      setEditId(null);
      setShowModal(false);
      loadPoli();

      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError('Error menyimpan data poli: ' + error.message);
      console.error('Error saving poli:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (poli) => {
    setFormData({
      nama_poli: poli.nama_poli,
      kode_poli: poli.kode_poli,
      deskripsi: poli.deskripsi,
      lokasi: poli.lokasi,
      jam_operasional: poli.jam_operasional,
      telepon: poli.telepon || '',
      kepala_poli: poli.kepala_poli || ''
    });
    setIsEdit(true);
    setEditId(poli.id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Yakin ingin menghapus data poli ini?')) {
      try {
        setIsLoading(true);
        setError('');
        setSuccess('');

        await poliAPI.deletePoli(id);
        setSuccess('Data poli berhasil dihapus!');
        loadPoli();

        setTimeout(() => setSuccess(''), 3000);
      } catch (error) {
        setError('Gagal menghapus data poli: ' + error.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleAddNew = () => {
    setFormData({
      nama_poli: '',
      kode_poli: '',
      deskripsi: '',
      lokasi: '',
      jam_operasional: '',
      telepon: '',
      kepala_poli: '',
    });
    setIsEdit(false);
    setEditId(null);
    setValidationErrors({});
    setShowModal(true);
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
          onClick={handleAddNew}
        >
          <Plus className="h-4 w-4" />
          Tambah Poliklinik
        </button>
      </div>

      {error && (
        <div className="alert alert-error">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="alert alert-success">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{success}</span>
        </div>
      )}

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

      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <span className="loading loading-spinner loading-lg"></span>
          <span className="ml-2">Memuat data poli...</span>
        </div>
      )}

      {/* Polyclinic Cards */}
      {!isLoading && (
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
                      <li><a onClick={() => handleEdit(poli)}><Edit className="h-4 w-4" />Edit</a></li>
                      <li><a className="text-error" onClick={() => handleDelete(poli.id)}><Trash2 className="h-4 w-4" />Hapus</a></li>
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
                    <span>Kepala Poli: {poli.kepala_poli || '-'}</span>
                  </div>
                </div>

                <div className="divider my-4"></div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-base-content/70">Telepon</div>
                    <div className="font-medium text-sm">{poli.telepon || '-'}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-base-content/70">Status</div>
                    <div className="badge badge-success">Aktif</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form Modal menggunakan komponen reusable */}
      <FormModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setValidationErrors({});
        }}
        title={isEdit ? "Edit Poliklinik" : "Tambah Poliklinik Baru"}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        submitText={isLoading ? "Menyimpan..." : isEdit ? "Update Data" : "Simpan Data"}
      >
        <FormSection title="Informasi Dasar Poliklinik">
          <FormInput
            label="Nama Poliklinik"
            name="nama_poli"
            value={formData.nama_poli}
            onChange={handleInputChange}
            required
            error={validationErrors.nama_poli}
          />
          
          <FormInput
            label="Kode Poliklinik"
            name="kode_poli"
            value={formData.kode_poli}
            onChange={handleInputChange}
            required
            error={validationErrors.kode_poli}
            disabled={isEdit}
            placeholder="POLI-XX"
          />
        </FormSection>

        <FormSection title="Lokasi dan Jam Operasional">
          <FormInput
            label="Lokasi"
            name="lokasi"
            value={formData.lokasi}
            onChange={handleInputChange}
            required
            error={validationErrors.lokasi}
            placeholder="Lantai X, Ruang XXX"
          />
          
          <FormInput
            label="Jam Operasional"
            name="jam_operasional"
            value={formData.jam_operasional}
            onChange={handleInputChange}
            required
            error={validationErrors.jam_operasional}
            placeholder="08:00-16:00"
          />
        </FormSection>

        <FormSection title="Kontak dan Kepala Poli">
          <FormInput
            label="Telepon"
            name="telepon"
            type="tel"
            value={formData.telepon}
            onChange={handleInputChange}
          />
          
          <FormInput
            label="Kepala Poliklinik"
            name="kepala_poli"
            value={formData.kepala_poli}
            onChange={handleInputChange}
            placeholder="Dr. Nama Lengkap, Sp.XX"
          />
        </FormSection>

        <FormSection title="Deskripsi Poliklinik" columns={1}>
          <FormInput
            label="Deskripsi"
            name="deskripsi"
            type="textarea"
            value={formData.deskripsi}
            onChange={handleInputChange}
            required
            error={validationErrors.deskripsi}
            placeholder="Jelaskan layanan yang tersedia di poliklinik ini..."
            rows={3}
          />
        </FormSection>
      </FormModal>
    </div>
  );
}