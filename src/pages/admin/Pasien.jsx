import React, { useState } from 'react';
import { useForm } from '../../components/admin/useForm';
import { useModal } from '../../components/admin/useModal';
import PageHeader from '../../components/admin/PageHeader';
import SearchBar from '../../components/admin/SearchBar';
import FormModal from '../../components/admin/FormModal';
import ActionDropdown from '../../components/admin/ActionDropdown';
import StatusBadge from '../../components/admin/StatusBadge';

export default function PasienPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

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
    kontak_darurat: '',
    telepon_darurat: '',
  };

  const { formData, handleInputChange, resetForm, setFormData } = useForm(initialFormData);
  const { showModal, openModal, closeModal } = useModal();

  const [pasienData, setPasienData] = useState([
    {
      id: 1,
      nama: 'Sari Dewi Lestari',
      nik: '3201234567890123',
      tanggal_lahir: '1990-05-15',
      jenis_kelamin: 'Perempuan',
      telepon: '08123456789',
      email: 'sari.dewi@email.com',
      alamat: 'Jl. Merdeka No. 123, Jakarta',
      status: 'Aktif',
    },
    {
      id: 2,
      nama: 'Budi Santoso',
      nik: '3201234567890124',
      tanggal_lahir: '1985-08-22',
      jenis_kelamin: 'Laki-laki',
      telepon: '08123456790',
      email: 'budi.santoso@email.com',
      alamat: 'Jl. Sudirman No. 456, Jakarta',
      status: 'Aktif',
    },
    {
      id: 3,
      nama: 'Lisa Andriani',
      nik: '3201234567890125',
      tanggal_lahir: '1992-12-10',
      jenis_kelamin: 'Perempuan',
      telepon: '08123456791',
      email: 'lisa.andriani@email.com',
      alamat: 'Jl. Thamrin No. 789, Jakarta',
      status: 'Aktif',
    },
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isEdit && editId) {
        setPasienData(prev => prev.map(pasien => 
          pasien.id === editId 
            ? { ...pasien, ...formData, id: editId }
            : pasien
        ));
      } else {
        const newPasien = {
          ...formData,
          id: Date.now(),
          status: 'Aktif'
        };
        setPasienData(prev => [...prev, newPasien]);
      }
      
      resetForm();
      setIsEdit(false);
      setEditId(null);
      closeModal();
    } catch (error) {
      console.error('Error saving patient:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (pasien) => {
    setFormData(pasien);
    setIsEdit(true);
    setEditId(pasien.id);
    openModal();
  };

  const handleDelete = async (id) => {
    if (confirm('Yakin ingin menghapus data pasien ini?')) {
      setPasienData(prev => prev.filter(pasien => pasien.id !== id));
    }
  };

  const handleAddNew = () => {
    resetForm();
    setIsEdit(false);
    setEditId(null);
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
        </div>
      </div>

      <FormModal
        isOpen={showModal}
        onClose={closeModal}
        title={isEdit ? "Edit Data Pasien" : "Tambah Pasien Baru"}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        submitText={isEdit ? "Update Data" : "Simpan Data"}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Nama Lengkap *</span>
            </label>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleInputChange}
              className="input input-bordered"
              required
            />
          </div>
          
          <div className="form-control">
            <label className="label">
              <span className="label-text">NIK *</span>
            </label>
            <input
              type="text"
              name="nik"
              value={formData.nik}
              onChange={handleInputChange}
              className="input input-bordered"
              maxLength={16}
              required
            />
          </div>
          
          <div className="form-control">
            <label className="label">
              <span className="label-text">Tanggal Lahir *</span>
            </label>
            <input
              type="date"
              name="tanggal_lahir"
              value={formData.tanggal_lahir}
              onChange={handleInputChange}
              className="input input-bordered"
              required
            />
          </div>
          
          <div className="form-control">
            <label className="label">
              <span className="label-text">Jenis Kelamin *</span>
            </label>
            <select
              name="jenis_kelamin"
              value={formData.jenis_kelamin}
              onChange={handleInputChange}
              className="select select-bordered"
              required
            >
              <option value="">Pilih Jenis Kelamin</option>
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>
          
          <div className="form-control">
            <label className="label">
              <span className="label-text">Telepon *</span>
            </label>
            <input
              type="tel"
              name="telepon"
              value={formData.telepon}
              onChange={handleInputChange}
              className="input input-bordered"
              required
            />
          </div>
          
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="input input-bordered"
            />
          </div>
          
          <div className="form-control">
            <label className="label">
              <span className="label-text">Golongan Darah</span>
            </label>
            <select
              name="golongan_darah"
              value={formData.golongan_darah}
              onChange={handleInputChange}
              className="select select-bordered"
            >
              <option value="">Pilih Golongan Darah</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="AB">AB</option>
              <option value="O">O</option>
            </select>
          </div>
          
          <div className="form-control">
            <label className="label">
              <span className="label-text">Status Pernikahan</span>
            </label>
            <select
              name="status_pernikahan"
              value={formData.status_pernikahan}
              onChange={handleInputChange}
              className="select select-bordered"
            >
              <option value="">Pilih Status</option>
              <option value="Belum Menikah">Belum Menikah</option>
              <option value="Menikah">Menikah</option>
              <option value="Janda/Duda">Janda/Duda</option>
            </select>
          </div>
        </div>
        
        <div className="form-control">
          <label className="label">
            <span className="label-text">Alamat Lengkap *</span>
          </label>
          <textarea
            name="alamat"
            value={formData.alamat}
            onChange={handleInputChange}
            className="textarea textarea-bordered"
            rows={3}
            required
          ></textarea>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Pekerjaan</span>
            </label>
            <input
              type="text"
              name="pekerjaan"
              value={formData.pekerjaan}
              onChange={handleInputChange}
              className="input input-bordered"
            />
          </div>
          
          <div className="form-control">
            <label className="label">
              <span className="label-text">Kontak Darurat</span>
            </label>
            <input
              type="text"
              name="kontak_darurat"
              value={formData.kontak_darurat}
              onChange={handleInputChange}
              className="input input-bordered"
              placeholder="Nama kontak darurat"
            />
          </div>
          
          <div className="form-control md:col-span-1">
            <label className="label">
              <span className="label-text">Telepon Darurat</span>
            </label>
            <input
              type="tel"
              name="telepon_darurat"
              value={formData.telepon_darurat}
              onChange={handleInputChange}
              className="input input-bordered"
            />
          </div>
        </div>
      </FormModal>
    </div>
  );
}