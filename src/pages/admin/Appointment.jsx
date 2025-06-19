import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Calendar, Clock, User, Phone } from 'lucide-react';

export default function AppointmentAdmin() {
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [filterStatus, setFilterStatus] = useState('');
    const [formData, setFormData] = useState({
        pasien_id: '',
        dokter_id: '',
        jadwal_id: '',
        tanggal: '',
        waktu: '',
        keluhan: '',
        status: 'Menunggu',
        catatan: '',
    });

    const appointmentData = [
        {
            id: 1,
            pasien: 'Sari Dewi Lestari',
            telepon: '08123456789',
            dokter: 'Dr. Ahmad Fadli, Sp.PD',
            poli: 'Penyakit Dalam',
            tanggal: '2024-01-15',
            waktu: '09:00',
            keluhan: 'Nyeri dada dan sesak napas',
            status: 'Menunggu',
            antrian: 3,
        },
        {
            id: 2,
            pasien: 'Budi Santoso',
            telepon: '08123456790',
            dokter: 'Dr. Maya Sari, Sp.A',
            poli: 'Anak',
            tanggal: '2024-01-15',
            waktu: '10:30',
            keluhan: 'Demam tinggi pada anak',
            status: 'Berlangsung',
            antrian: 1,
        },
        {
            id: 3,
            pasien: 'Lisa Andriani',
            telepon: '08123456791',
            dokter: 'Dr. Reza Pratama, Sp.OG',
            poli: 'Obstetri & Ginekologi',
            tanggal: '2024-01-15',
            waktu: '14:00',
            keluhan: 'Konsultasi kehamilan rutin',
            status: 'Selesai',
            antrian: 0,
        },
        {
            id: 4,
            pasien: 'Andi Wijaya',
            telepon: '08123456792',
            dokter: 'Dr. Ahmad Fadli, Sp.PD',
            poli: 'Penyakit Dalam',
            tanggal: '2024-01-16',
            waktu: '08:30',
            keluhan: 'Kontrol diabetes mellitus',
            status: 'Dijadwalkan',
            antrian: 5,
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

    const filteredAppointments = appointmentData.filter(appointment => {
        const matchSearch = appointment.pasien.toLowerCase().includes(searchTerm.toLowerCase()) ||
            appointment.dokter.toLowerCase().includes(searchTerm.toLowerCase()) ||
            appointment.telepon.includes(searchTerm);
        const matchStatus = filterStatus === '' || appointment.status === filterStatus;
        return matchSearch && matchStatus;
    });

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Selesai':
                return 'badge-success';
            case 'Berlangsung':
                return 'badge-warning';
            case 'Dijadwalkan':
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
                    <h1 className="text-3xl font-bold">Appointment</h1>
                    <p className="text-base-content/70">Kelola janji temu pasien dengan dokter</p>
                </div>
                <button
                    className="btn btn-primary"
                    onClick={() => setShowModal(true)}
                >
                    <Plus className="h-4 w-4" />
                    Buat Appointment
                </button>
            </div>

            {/* Search and Filter */}
            <div className="card bg-base-100 shadow-sm">
                <div className="card-body">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="form-control flex-1">
                            <div className="input-group">
                                <input
                                    type="text"
                                    placeholder="Cari pasien, dokter, atau telepon..."
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
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >
                            <option value="">Semua Status</option>
                            <option value="Menunggu">Menunggu</option>
                            <option value="Dijadwalkan">Dijadwalkan</option>
                            <option value="Berlangsung">Berlangsung</option>
                            <option value="Selesai">Selesai</option>
                            <option value="Dibatalkan">Dibatalkan</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Appointment Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAppointments.map((appointment) => (
                    <div key={appointment.id} className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="card-body">
                            <div className="flex items-start justify-between">
                                <div className={`badge ${getStatusBadge(appointment.status)}`}>
                                    {appointment.status}
                                </div>
                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-sm">
                                        ⋮
                                    </div>
                                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                        <li><a><Edit className="h-4 w-4" />Edit</a></li>
                                        <li><a className="text-success">Konfirmasi</a></li>
                                        <li><a className="text-error"><Trash2 className="h-4 w-4" />Batalkan</a></li>
                                    </ul>
                                </div>
                            </div>

                            <div className="space-y-3 mt-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <User className="h-4 w-4 text-primary" />
                                        <span className="font-bold">{appointment.pasien}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-base-content/70">
                                        <Phone className="h-3 w-3" />
                                        <span>{appointment.telepon}</span>
                                    </div>
                                </div>

                                <div className="divider my-2"></div>

                                <div className="space-y-2">
                                    <div className="text-sm">
                                        <strong>Dokter:</strong> {appointment.dokter}
                                    </div>
                                    <div className="text-sm">
                                        <strong>Poliklinik:</strong> {appointment.poli}
                                    </div>
                                    <div className="flex items-center gap-4 text-sm">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="h-4 w-4" />
                                            <span>{new Date(appointment.tanggal).toLocaleDateString('id-ID')}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="h-4 w-4" />
                                            <span>{appointment.waktu}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="divider my-2"></div>

                                <div>
                                    <div className="text-sm font-medium mb-1">Keluhan:</div>
                                    <div className="text-sm text-base-content/70 bg-base-200 p-2 rounded">
                                        {appointment.keluhan}
                                    </div>
                                </div>

                                {appointment.antrian > 0 && (
                                    <div className="alert alert-info py-2">
                                        <span className="text-sm">Antrian: {appointment.antrian}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Appointment Modal */}
            {showModal && (
                <div className="modal modal-open">
                    <div className="modal-box w-11/12 max-w-3xl">
                        <h3 className="font-bold text-lg mb-4">Buat Appointment Baru</h3>

                        <form onSubmit={handleSubmit} className="space-y-4">
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

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Tanggal *</span>
                                    </label>
                                    <input
                                        type="date"
                                        name="tanggal"
                                        value={formData.tanggal}
                                        onChange={handleInputChange}
                                        className="input input-bordered"
                                        min={new Date().toISOString().split('T')[0]}
                                        required
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Waktu *</span>
                                    </label>
                                    <input
                                        type="time"
                                        name="waktu"
                                        value={formData.waktu}
                                        onChange={handleInputChange}
                                        className="input input-bordered"
                                        required
                                    />
                                </div>

                                <div className="form-control md:col-span-2">
                                    <label className="label">
                                        <span className="label-text">Status</span>
                                    </label>
                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleInputChange}
                                        className="select select-bordered"
                                    >
                                        <option value="Menunggu">Menunggu</option>
                                        <option value="Dijadwalkan">Dijadwalkan</option>
                                        <option value="Berlangsung">Berlangsung</option>
                                        <option value="Selesai">Selesai</option>
                                        <option value="Dibatalkan">Dibatalkan</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Keluhan Utama *</span>
                                </label>
                                <textarea
                                    name="keluhan"
                                    value={formData.keluhan}
                                    onChange={handleInputChange}
                                    className="textarea textarea-bordered"
                                    rows={3}
                                    placeholder="Jelaskan keluhan atau gejala yang dialami pasien..."
                                    required
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
                                    placeholder="Catatan khusus untuk appointment ini..."
                                ></textarea>
                            </div>

                            <div className="modal-action">
                                <button type="button" className="btn" onClick={() => setShowModal(false)}>
                                    Batal
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Buat Appointment
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}