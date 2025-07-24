import React, { useState, useEffect } from 'react';
import { useForm } from '../../components/admin/useForm';
import { useModal } from '../../components/admin/useModal';
import PageHeader from '../../components/admin/PageHeader';
import SearchBar from '../../components/admin/SearchBar';
import FormModal from '../../components/admin/FormModal';
import ActionDropdown from '../../components/admin/ActionDropdown';
import StatusBadge from '../../components/admin/StatusBadge';
import { pasienAPI } from '../../services/pasienAPI';
import AlertBox from '../../components/AlertBox';
import LoadingSpinner from '../../components/LoadingSpinner';
import EmptyState from '../../components/EmptyState';
import FormSection from '../../components/admin/FormSection';
import FormInput from '../../components/admin/FormInput';

export default function PasienPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [pasienData, setPasienData] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});

  const initialFormData = {
    nama: '',
    nik: '',
    tanggal_lahir: '',
    jenis_kelamin: '',
    alamat: '',
    telepon: '',
    email: '',
    golongan_darah: '',
    status_pernikahan: '',
    pekerjaan: '',
    username: '',
    password: '',
    status: 'Aktif'
  };

  const { formData, handleInputChange, resetForm, setFormData } = useForm(initialFormData);
  const { showModal, openModal, closeModal } = useModal();

  useEffect(() => {
    loadPasien();
  }, []);

  const loadPasien = async () => {
    try {
      setIsLoading(true);
      setError('');
      const data = await pasienAPI.fetchPasien();
      setPasienData(data);
    } catch (err) {
      setError('Gagal memuat data pasien');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = async () => {
    const errors = {};

    if (!formData.nama) errors.nama = 'Nama lengkap wajib diisi';
    if (!formData.nik) errors.nik = 'NIK wajib diisi';
    if (!formData.tanggal_lahir) errors.tanggal_lahir = 'Tanggal lahir wajib diisi';
    if (!formData.jenis_kelamin) errors.jenis_kelamin = 'Jenis kelamin wajib diisi';
    if (!formData.alamat) errors.alamat = 'Alamat wajib diisi';
    if (!formData.telepon) errors.telepon = 'Telepon wajib diisi';
    if (!formData.username) errors.username = 'Username wajib diisi';
    if (!formData.password) errors.password = 'Password wajib diisi';

    if (!isEdit) {
      if (formData.nik) {
        const isNikExist = await pasienAPI.checkUniqueNik(formData.nik);
        if (isNikExist) errors.nik = 'NIK sudah terdaftar';
      }

      if (formData.email) {
        const isEmailExist = await pasienAPI.checkUniqueEmail(formData.email);
        if (isEmailExist) errors.email = 'Email sudah terdaftar';
      }

      if (formData.username) {
        const isUsernameExist = await pasienAPI.checkUniqueUsername(formData.username);
        if (isUsernameExist) errors.username = 'Username sudah terdaftar';
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
        await pasienAPI.updatePasien(editId, formData);
        setSuccess('Data pasien berhasil diperbarui!');
      } else {
        await pasienAPI.createPasien(formData);
        setSuccess('Data pasien berhasil ditambahkan!');
      }

      resetForm();
      setIsEdit(false);
      setEditId(null);
      closeModal();
      loadPasien();

      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError('Error menyimpan data pasien: ' + error.message);
      console.error('Error saving patient:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (pasien) => {
    setFormData({
      ...pasien,
      tanggal_lahir: pasien.tanggal_lahir.split('T')[0]
    });
    setIsEdit(true);
    setEditId(pasien.id);
    openModal();
  };

  const handleDelete = async (id) => {
    if (confirm('Yakin ingin menghapus data pasien ini?')) {
      try {
        setIsLoading(true);
        setError('');
        setSuccess('');

        await pasienAPI.deletePasien(id);
        setSuccess('Data pasien berhasil dihapus!');
        loadPasien();

        setTimeout(() => setSuccess(''), 3000);
      } catch (error) {
        setError('Gagal menghapus data pasien: ' + error.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleAddNew = () => {
    resetForm();
    setIsEdit(false);
    setEditId(null);
    setValidationErrors({});
    openModal();
  };

  const filteredPasien = pasienData.filter(pasien =>
    pasien.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pasien.nik.includes(searchTerm) ||
    pasien.telepon.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Data Pasien"
        description="Kelola data pasien rumah sakit"
        buttonText="Tambah Pasien"
        onButtonClick={handleAddNew}
      />

      {error && <AlertBox type="error">{error}</AlertBox>}
      {success && <AlertBox type="success">{success}</AlertBox>}

      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder="Cari nama, NIK, atau telepon..."
        filters={
          <select className="select select-bordered">
            <option>Semua Status</option>
            <option>Aktif</option>
            <option>Tidak Aktif</option>
          </select>
        }
      />

      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          {isLoading && <LoadingSpinner text="Memuat data pasien..." />}

          {!isLoading && pasienData.length === 0 && !error && (
            <EmptyState text="Belum ada data pasien. Tambah pasien pertama!" />
          )}

          {!isLoading && pasienData.length === 0 && error && (
            <EmptyState text="Terjadi kesalahan. Coba lagi nanti." />
          )}

          {!isLoading && pasienData.length > 0 && (
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama Lengkap</th>
                    <th>NIK</th>
                    <th>Tanggal Lahir</th>
                    <th>Jenis Kelamin</th>
                    <th>Telepon</th>
                    <th>Status</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPasien.map((pasien, index) => (
                    <tr key={pasien.id}>
                      <td>{index + 1}</td>
                      <td>
                        <div className="font-medium">{pasien.nama}</div>
                        <div className="text-sm text-base-content/70">{pasien.email}</div>
                        <div className="text-xs text-gray-500">@{pasien.username}</div>
                      </td>
                      <td className="font-mono text-sm">{pasien.nik}</td>
                      <td>{new Date(pasien.tanggal_lahir).toLocaleDateString('id-ID')}</td>
                      <td>{pasien.jenis_kelamin}</td>
                      <td>{pasien.telepon}</td>
                      <td>
                        <StatusBadge status={pasien.status} />
                      </td>
                      <td>
                        <ActionDropdown
                          onEdit={() => handleEdit(pasien)}
                          onDelete={() => handleDelete(pasien.id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <FormModal
        isOpen={showModal}
        onClose={() => {
          closeModal();
          setValidationErrors({});
        }}
        title={isEdit ? "Edit Data Pasien" : "Tambah Pasien Baru"}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        submitText={isLoading ? "Mohon Tunggu..." : isEdit ? "Update Data" : "Simpan Data"}
      >
        {/* Section 1: Data Pribadi */}
        <FormSection title="Data Pribadi">
          <FormInput
            label="Nama Lengkap"
            name="nama"
            value={formData.nama}
            onChange={handleInputChange}
            required
            error={validationErrors.nama}
          />

          <FormInput
            label="NIK"
            name="nik"
            value={formData.nik}
            onChange={handleInputChange}
            required
            error={validationErrors.nik}
            disabled={isEdit}
            maxLength={16}
          />

          <FormInput
            label="Tanggal Lahir"
            name="tanggal_lahir"
            type="date"
            value={formData.tanggal_lahir}
            onChange={handleInputChange}
            required
            error={validationErrors.tanggal_lahir}
          />

          <FormInput
            label="Jenis Kelamin"
            name="jenis_kelamin"
            type="select"
            value={formData.jenis_kelamin}
            onChange={handleInputChange}
            required
            error={validationErrors.jenis_kelamin}
            options={[
              { value: "Laki-laki", label: "Laki-laki" },
              { value: "Perempuan", label: "Perempuan" }
            ]}
          />
        </FormSection>

        {/* Section 2: Kontak dan Alamat */}
        <FormSection title="Kontak dan Alamat">
          <FormInput
            label="Telepon"
            name="telepon"
            type="tel"
            value={formData.telepon}
            onChange={handleInputChange}
            required
            error={validationErrors.telepon}
          />

          <FormInput
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            error={validationErrors.email}
            disabled={isEdit}
          />
        </FormSection>

        <FormInput
          label="Alamat Lengkap"
          name="alamat"
          type="textarea"
          value={formData.alamat}
          onChange={handleInputChange}
          required
          error={validationErrors.alamat}
          rows={3}
          className="col-span-1 md:col-span-2"
        />

        {/* Section 3: Informasi Medis */}
        <FormSection title="Informasi Medis">
          <FormInput
            label="Golongan Darah"
            name="golongan_darah"
            type="select"
            value={formData.golongan_darah}
            onChange={handleInputChange}
            options={[
              { value: "", label: "Pilih Golongan Darah" },
              { value: "A", label: "A" },
              { value: "B", label: "B" },
              { value: "AB", label: "AB" },
              { value: "O", label: "O" }
            ]}
          />

          <FormInput
            label="Status Pernikahan"
            name="status_pernikahan"
            type="select"
            value={formData.status_pernikahan}
            onChange={handleInputChange}
            options={[
              { value: "", label: "Pilih Status" },
              { value: "Belum Menikah", label: "Belum Menikah" },
              { value: "Menikah", label: "Menikah" },
              { value: "Janda/Duda", label: "Janda/Duda" }
            ]}
          />
        </FormSection>

        {/* Section 4: Informasi Lainnya */}
        <FormSection title="Informasi Lainnya">
          <FormInput
            label="Pekerjaan"
            name="pekerjaan"
            value={formData.pekerjaan}
            onChange={handleInputChange}
          />

          <FormInput
            label="Status"
            name="status"
            type="select"
            value={formData.status}
            onChange={handleInputChange}
            options={[
              { value: "Aktif", label: "Aktif" },
              { value: "Tidak Aktif", label: "Tidak Aktif" }
            ]}
          />
        </FormSection>

        {/* Section 5: Akun Login (hanya untuk tambah data) */}
        {!isEdit && (
          <FormSection title="Akun Login">
            <FormInput
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
              error={validationErrors.username}
            />

            <FormInput
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              error={validationErrors.password}
            />
          </FormSection>
        )}
      </FormModal>
    </div>
  );
}