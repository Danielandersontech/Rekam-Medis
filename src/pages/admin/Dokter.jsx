import React, { useState } from 'react';
import { Award, Clock } from 'lucide-react';
import { useForm } from '../../components/admin/useForm';
import { useModal } from '../../components/admin/useModal';
import PageHeader from '../../components/admin/PageHeader';
import SearchBar from '../../components/admin/SearchBar';
import FormModal from '../../components/admin/FormModal';
import ActionDropdown from '../../components/admin/ActionDropdown';
import StatusBadge from '../../components/admin/StatusBadge';

export default function DokterPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editId, setEditId] = useState(null);

    const initialFormData = {
        nama: '',
        nip: '',
        spesialisasi: '',
        no_lisensi: '',
        telepon: '',
        email: '',
        alamat: '',
        tanggal_lahir: '',
        jenis_kelamin: '',
        pendidikan: '',
        pengalaman: '',
        jam_praktek: '',
        tarif_konsultasi: '',
    };

    const { formData, handleInputChange, resetForm, setFormData } = useForm(initialFormData);
    const { showModal, openModal, closeModal } = useModal();

    const [dokterData, setDokterData] = useState([
        {
            id: 1,
            nama: 'Dr. Ahmad Fadli, Sp.PD',
            nip: 'DOK001',
            spesialisasi: 'Penyakit Dalam',
            no_lisensi: 'STR-12345678',
            telepon: '08123456789',
            email: 'ahmad.fadli@medicare.com',
            pengalaman: '15 tahun',
            status: 'Aktif',
            jam_praktek: '08:00-16:00',
            tarif: 'Rp 200.000',
        },
        {
            id: 2,
            nama: 'Dr. Maya Sari, Sp.A',
            nip: 'DOK002',
            spesialisasi: 'Anak',
            no_lisensi: 'STR-12345679',
            telepon: '08123456790',
            email: 'maya.sari@medicare.com',
            pengalaman: '12 tahun',
            status: 'Aktif',
            jam_praktek: '09:00-17:00',
            tarif: 'Rp 250.000',
        },
        {
            id: 3,
            nama: 'Dr. Reza Pratama, Sp.OG',
            nip: 'DOK003',
            spesialisasi: 'Obstetri & Ginekologi',
            no_lisensi: 'STR-12345680',
            telepon: '08123456791',
            email: 'reza.pratama@medicare.com',
            pengalaman: '10 tahun',
            status: 'Aktif',
            jam_praktek: '10:00-18:00',
            tarif: 'Rp 300.000',
        },
    ]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (isEdit && editId) {
                setDokterData(prev => prev.map(dokter =>
                    dokter.id === editId
                        ? {
                            ...dokter,
                            ...formData,
                            id: editId,
                            tarif: `Rp ${formData.tarif_konsultasi ? Number(formData.tarif_konsultasi).toLocaleString('id-ID') : '0'}`
                        }
                        : dokter
                ));
            } else {
                const newDokter = {
                    ...formData,
                    id: Date.now(),
                    status: 'Aktif',
                    tarif: `Rp ${formData.tarif_konsultasi ? Number(formData.tarif_konsultasi).toLocaleString('id-ID') : '0'}`
                };
                setDokterData(prev => [...prev, newDokter]);
            }

            resetForm();
            setIsEdit(false);
            setEditId(null);
            closeModal();
        } catch (error) {
            console.error('Error saving doctor:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (dokter) => {
        const editData = {
            ...dokter,
            tarif_konsultasi: dokter.tarif.replace(/[^\d]/g, '')
        };
        setFormData(editData);
        setIsEdit(true);
        setEditId(dokter.id);
        openModal();
    };

    const handleDelete = async (id) => {
        if (confirm('Yakin ingin menghapus data dokter ini?')) {
            setDokterData(prev => prev.filter(dokter => dokter.id !== id));
        }
    };

    const handleAddNew = () => {
        resetForm();
        setIsEdit(false);
        setEditId(null);
        openModal();
    };

    const filteredDokter = dokterData.filter(dokter =>
        dokter.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dokter.spesialisasi.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dokter.nip.includes(searchTerm)
    );

    return (
        <div className="space-y-6">
            <PageHeader
                title="Data Dokter"
                description="Kelola data dokter dan tenaga medis"
                buttonText="Tambah Dokter"
                onButtonClick={handleAddNew}
            />

            <SearchBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                placeholder="Cari nama, NIP, atau spesialisasi..."
                filters={
                    <select className="select select-bordered">
                        <option>Semua Spesialisasi</option>
                        <option>Penyakit Dalam</option>
                        <option>Anak</option>
                        <option>Obstetri & Ginekologi</option>
                        <option>Bedah</option>
                        <option>Jantung</option>
                    </select>
                }
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDokter.map((dokter) => (
                    <div key={dokter.id} className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="card-body">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <h3 className="card-title text-lg">{dokter.nama}</h3>
                                    <div className="flex items-center gap-2 text-primary mt-1">
                                        <Award className="h-4 w-4" />
                                        <span className="text-sm font-medium">{dokter.spesialisasi}</span>
                                    </div>
                                </div>
                                <ActionDropdown
                                    onEdit={() => handleEdit(dokter)}
                                    onDelete={() => handleDelete(dokter.id)}
                                />
                            </div>

                            <div className="space-y-2 mt-4">
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="font-medium">NIP:</span>
                                    <span className="font-mono">{dokter.nip}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="font-medium">Lisensi:</span>
                                    <span className="font-mono text-xs">{dokter.no_lisensi}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Clock className="h-4 w-4" />
                                    <span>{dokter.jam_praktek}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="font-medium">Pengalaman:</span>
                                    <span>{dokter.pengalaman}</span>
                                </div>
                            </div>

                            <div className="card-actions justify-between mt-4">
                                <StatusBadge status={dokter.status} />
                                <div className="text-right">
                                    <div className="text-sm text-base-content/70">Tarif Konsultasi</div>
                                    <div className="font-bold text-primary">{dokter.tarif}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <FormModal
                isOpen={showModal}
                onClose={closeModal}
                title={isEdit ? "Edit Data Dokter" : "Tambah Dokter Baru"}
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
                            <span className="label-text">NIP *</span>
                        </label>
                        <input
                            type="text"
                            name="nip"
                            value={formData.nip}
                            onChange={handleInputChange}
                            className="input input-bordered"
                            required
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Spesialisasi *</span>
                        </label>
                        <select
                            name="spesialisasi"
                            value={formData.spesialisasi}
                            onChange={handleInputChange}
                            className="select select-bordered"
                            required
                        >
                            <option value="">Pilih Spesialisasi</option>
                            <option value="Umum">Dokter Umum</option>
                            <option value="Penyakit Dalam">Penyakit Dalam</option>
                            <option value="Anak">Anak</option>
                            <option value="Obstetri & Ginekologi">Obstetri & Ginekologi</option>
                            <option value="Bedah">Bedah</option>
                            <option value="Jantung">Jantung</option>
                            <option value="Mata">Mata</option>
                            <option value="THT">THT</option>
                            <option value="Kulit">Kulit</option>
                            <option value="Saraf">Saraf</option>
                        </select>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">No. Lisensi (STR) *</span>
                        </label>
                        <input
                            type="text"
                            name="no_lisensi"
                            value={formData.no_lisensi}
                            onChange={handleInputChange}
                            className="input input-bordered"
                            required
                        />
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
                            <span className="label-text">Email *</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="input input-bordered"
                            required
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Tanggal Lahir</span>
                        </label>
                        <input
                            type="date"
                            name="tanggal_lahir"
                            value={formData.tanggal_lahir}
                            onChange={handleInputChange}
                            className="input input-bordered"
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Jenis Kelamin</span>
                        </label>
                        <select
                            name="jenis_kelamin"
                            value={formData.jenis_kelamin}
                            onChange={handleInputChange}
                            className="select select-bordered"
                        >
                            <option value="">Pilih Jenis Kelamin</option>
                            <option value="Laki-laki">Laki-laki</option>
                            <option value="Perempuan">Perempuan</option>
                        </select>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Pendidikan Terakhir</span>
                        </label>
                        <input
                            type="text"
                            name="pendidikan"
                            value={formData.pendidikan}
                            onChange={handleInputChange}
                            className="input input-bordered"
                            placeholder="S1 Kedokteran, Sp. dll"
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Pengalaman (tahun)</span>
                        </label>
                        <input
                            type="number"
                            name="pengalaman"
                            value={formData.pengalaman}
                            onChange={handleInputChange}
                            className="input input-bordered"
                            min="0"
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Jam Praktek</span>
                        </label>
                        <input
                            type="text"
                            name="jam_praktek"
                            value={formData.jam_praktek}
                            onChange={handleInputChange}
                            className="input input-bordered"
                            placeholder="08:00-16:00"
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Tarif Konsultasi</span>
                        </label>
                        <input
                            type="number"
                            name="tarif_konsultasi"
                            value={formData.tarif_konsultasi}
                            onChange={handleInputChange}
                            className="input input-bordered"
                            placeholder="200000"
                        />
                    </div>
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Alamat Lengkap</span>
                    </label>
                    <textarea
                        name="alamat"
                        value={formData.alamat}
                        onChange={handleInputChange}
                        className="textarea textarea-bordered"
                        rows={3}
                    ></textarea>
                </div>
            </FormModal>
        </div>
    );
}