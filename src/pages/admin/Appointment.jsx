import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Plus, Search, Edit, Trash2, Calendar, Clock, User, Phone, AlertCircle, Bug } from 'lucide-react';
import { appointmentAPI } from '../../services/appointmentAPI';
import { quotaUtils } from '../../services/quotaUtils';

export default function AppointmentAdmin() {
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [filterStatus, setFilterStatus] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [appointmentData, setAppointmentData] = useState([]);
    const [pasienOptions, setPasienOptions] = useState([]);
    const [dokterOptions, setDokterOptions] = useState([]);
    const [poliOptions, setPoliOptions] = useState([]);
    const [jadwalOptions, setJadwalOptions] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [editId, setEditId] = useState(null);
    const [selectedPoli, setSelectedPoli] = useState('');
    const [selectedDokter, setSelectedDokter] = useState('');
    const [selectedTanggal, setSelectedTanggal] = useState('');
    const [error, setError] = useState('');
    const [debugInfo, setDebugInfo] = useState('');

    const [formData, setFormData] = useState({
        id_pasien: '',
        id_dokter: '',
        id_poli: '',
        id_jadwal_dokter: '',
        tgl_kunjungan: '',
        keluhan: '',
        status: 'antri',
    });

    // Cache for API responses
    const cache = useRef({
        dokterByPoli: {},
        jadwalByDokter: {},
    });

    // Debounce search input
    const debouncedSearch = useRef(null);
    useEffect(() => {
        if (debouncedSearch.current) {
            clearTimeout(debouncedSearch.current);
        }
        debouncedSearch.current = setTimeout(() => {
            // Trigger search filtering (already handled by filteredAppointments)
        }, 300);
        return () => clearTimeout(debouncedSearch.current);
    }, [searchTerm]);

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        if (selectedPoli) {
            loadDokterByPoli();
        } else {
            setDokterOptions([]);
            setSelectedDokter('');
            setFormData(prev => ({ ...prev, id_dokter: '', id_jadwal_dokter: '' }));
        }
    }, [selectedPoli]);

    useEffect(() => {
        if (selectedDokter && selectedTanggal) {
            loadJadwalOptions();
        } else {
            setJadwalOptions([]);
            setFormData(prev => ({ ...prev, id_jadwal_dokter: '' }));
        }
    }, [selectedDokter, selectedTanggal]);

    const loadData = async () => {
        try {
            setIsLoading(true);
            setError('');
            console.log('Loading appointment data...');

            const [appointments, pasien, poli] = await Promise.all([
                appointmentAPI.fetchAppointments().catch(err => {
                    console.error('Error loading appointments:', err);
                    return [];
                }),
                appointmentAPI.fetchPasienOptions().catch(err => {
                    console.error('Error loading pasien:', err);
                    return [];
                }),
                appointmentAPI.fetchPoliOptions().catch(err => {
                    console.error('Error loading poli:', err);
                    return [];
                })
            ]);

            console.log('Loaded data:', { appointments, pasien, poli });

            setAppointmentData(Array.isArray(appointments) ? appointments : []);
            setPasienOptions(Array.isArray(pasien) ? pasien : []);
            setPoliOptions(Array.isArray(poli) ? poli : []);

            if (pasien.length === 0 || poli.length === 0) {
                setError('Beberapa data master belum tersedia. Pastikan data Pasien dan Poli sudah diinput.');
            }
        } catch (error) {
            console.error('Error loading data:', error);
            setError('Gagal memuat data. Silakan periksa koneksi internet dan coba lagi.');
            setAppointmentData([]);
        } finally {
            setIsLoading(false);
        }
    };

    const loadDokterByPoli = async () => {
        try {
            if (!selectedPoli) return;

            // Check cache first
            if (cache.current.dokterByPoli[selectedPoli]) {
                setDokterOptions(cache.current.dokterByPoli[selectedPoli]);
                return;
            }

            console.log('Loading dokter for poli:', selectedPoli);
            setIsLoading(true);

            const dokter = await appointmentAPI.fetchDokterByPoli(selectedPoli);
            console.log('Loaded dokter by poli:', dokter);

            const dokterArray = Array.isArray(dokter) ? dokter : [];
            cache.current.dokterByPoli[selectedPoli] = dokterArray;
            setDokterOptions(dokterArray);
        } catch (error) {
            console.error('Error loading dokter by poli:', error);
            setDokterOptions([]);
        } finally {
            setIsLoading(false);
        }
    };

    const loadJadwalOptions = async () => {
        try {
            if (!selectedDokter || !selectedTanggal) return;

            const cacheKey = `${selectedDokter}_${selectedTanggal}`;
            if (cache.current.jadwalByDokter[cacheKey]) {
                setJadwalOptions(cache.current.jadwalByDokter[cacheKey]);
                return;
            }

            console.log('Loading jadwal for dokter:', selectedDokter, 'tanggal:', selectedTanggal);

            const tanggal = new Date(selectedTanggal);
            const hari = tanggal.toLocaleDateString('en-US', { weekday: 'long' });
            const hariIndonesia = convertToIndonesianDay(hari);

            console.log('Converted day:', hariIndonesia);

            const allJadwal = await appointmentAPI.fetchJadwalDokterOptions(selectedDokter);
            console.log('All jadwal for dokter:', allJadwal);

            const jadwal = await appointmentAPI.fetchJadwalDokterOptions(selectedDokter, hariIndonesia);
            console.log('Filtered jadwal for day:', jadwal);

            setDebugInfo(`
                Tanggal dipilih: ${selectedTanggal}
                Hari dalam bahasa Inggris: ${hari}
                Hari dalam bahasa Indonesia: ${hariIndonesia}
                Total jadwal dokter: ${allJadwal.length}
                Jadwal untuk hari ini: ${jadwal.length}
                Jadwal tersedia: ${JSON.stringify(allJadwal.map(j => ({ hari: j.hari, jam: j.jam_mulai + '-' + j.jam_selesai })))}
            `);

            const jadwalArray = Array.isArray(jadwal) ? jadwal : [];
            cache.current.jadwalByDokter[cacheKey] = jadwalArray;
            setJadwalOptions(jadwalArray);
        } catch (error) {
            console.error('Error loading jadwal:', error);
            setJadwalOptions([]);
            setDebugInfo(`Error loading jadwal: ${error.message}`);
        }
    };

    const convertToIndonesianDay = (day) => {
        const dayMap = {
            'Sunday': 'Minggu',
            'Monday': 'Senin',
            'Tuesday': 'Selasa',
            'Wednesday': 'Rabu',
            'Thursday': 'Kamis',
            'Friday': 'Jumat',
            'Saturday': 'Sabtu'
        };
        return dayMap[day] || day;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (name === 'id_poli') {
            setSelectedPoli(value);
            setSelectedDokter('');
            setDokterOptions([]);
            setJadwalOptions([]);
            setFormData(prev => ({ 
                ...prev, 
                id_dokter: '', 
                id_jadwal_dokter: '' 
            }));
        }

        if (name === 'id_dokter') {
            setSelectedDokter(value);
            setJadwalOptions([]);
            setFormData(prev => ({ ...prev, id_jadwal_dokter: '' }));
        }

        if (name === 'tgl_kunjungan') {
            setSelectedTanggal(value);
            setJadwalOptions([]);
            setFormData(prev => ({ ...prev, id_jadwal_dokter: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            setIsLoading(true);
            console.log('Submitting form:', formData);

            if (!formData.id_pasien || !formData.id_dokter || !formData.id_poli || 
                !formData.id_jadwal_dokter || !formData.tgl_kunjungan || !formData.keluhan) {
                throw new Error('Semua field wajib diisi');
            }

            if (formData.id_jadwal_dokter && formData.tgl_kunjungan) {
                const validation = await quotaUtils.validateAppointment(
                    formData.id_jadwal_dokter,
                    formData.tgl_kunjungan.split('T')[0],
                    isEdit ? editId : null
                );

                if (!validation.isValid) {
                    throw new Error(validation.message);
                }
            }

            const appointmentData = {
                ...formData,
                tgl_kunjungan: new Date(formData.tgl_kunjungan).toISOString()
            };

            let result;
            if (isEdit && editId) {
                result = await appointmentAPI.updateAppointment(editId, appointmentData);
                console.log('Update result:', result);
                setAppointmentData(prev =>
                    prev.map(item => item.id === result.id ? result : item)
                );
                alert('Appointment berhasil diupdate!');
            } else {
                result = await appointmentAPI.createAppointment(appointmentData);
                console.log('Create result:', result);
                setAppointmentData(prev => [result, ...prev]);
                alert('Appointment berhasil dibuat!');
            }

            setShowModal(false);
            resetForm();
        } catch (error) {
            console.error('Error saving appointment:', error);
            setError(error.message || 'Gagal menyimpan appointment');
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (appointment) => {
        console.log('Editing appointment:', appointment);

        if (!appointment) {
            alert('Data appointment tidak valid');
            return;
        }

        const pasienId = appointment.id_pasien || (appointment.pasien?.id);
        const dokterId = appointment.id_dokter || (appointment.dokter?.id);
        const poliId = appointment.id_poli || (appointment.poli?.id);
        const jadwalId = appointment.id_jadwal_dokter || (appointment.jadwal_dokter?.id);

        if (!pasienId || !dokterId || !poliId || !jadwalId) {
            alert('Data appointment tidak lengkap');
            return;
        }

        setFormData({
            id_pasien: pasienId.toString(),
            id_dokter: dokterId.toString(),
            id_poli: poliId.toString(),
            id_jadwal_dokter: jadwalId.toString(),
            tgl_kunjungan: appointment.tgl_kunjungan.slice(0, 16),
            keluhan: appointment.keluhan || '',
            status: appointment.status || 'antri'
        });

        setSelectedPoli(poliId.toString());
        setSelectedDokter(dokterId.toString());
        setSelectedTanggal(appointment.tgl_kunjungan.slice(0, 10));
        setIsEdit(true);
        setEditId(appointment.id);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (confirm('Yakin ingin menghapus appointment ini?')) {
            try {
                setIsLoading(true);
                await appointmentAPI.deleteAppointment(id);
                setAppointmentData(prev => prev.filter(item => item.id !== id));
                alert('Appointment berhasil dihapus!');
            } catch (error) {
                console.error('Error deleting appointment:', error);
                alert('Gagal menghapus appointment: ' + error.message);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleUpdateStatus = async (id, newStatus) => {
        try {
            setIsLoading(true);
            const result = await appointmentAPI.updateStatus(id, newStatus);
            setAppointmentData(prev =>
                prev.map(item => item.id === result.id ? result : item)
            );
            alert('Status berhasil diupdate!');
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Gagal mengupdate status: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDebugJadwal = async () => {
        try {
            const debugData = await appointmentAPI.debugJadwalDokter();
            console.log('DEBUG JADWAL:', debugData);
            alert('Debug info tersedia di console. Tekan F12 untuk melihat.');
        } catch (error) {
            console.error('Debug error:', error);
        }
    };

    const resetForm = () => {
        setFormData({
            id_pasien: '',
            id_dokter: '',
            id_poli: '',
            id_jadwal_dokter: '',
            tgl_kunjungan: '',
            keluhan: '',
            status: 'antri',
        });
        setSelectedPoli('');
        setSelectedDokter('');
        setSelectedTanggal('');
        setDokterOptions([]);
        setJadwalOptions([]);
        setIsEdit(false);
        setEditId(null);
        setError('');
        setDebugInfo('');
    };

    const filteredAppointments = useMemo(() => {
        return appointmentData.filter(appointment => {
            if (!appointment) return false;

            const pasienNama = appointment.pasien?.nama || 'Unknown';
            const dokterNama = appointment.dokter?.nama || 'Unknown';
            const pasienTelepon = appointment.pasien?.telepon || '';

            const matchSearch = pasienNama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                dokterNama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                pasienTelepon.includes(searchTerm);

            const matchStatus = filterStatus === '' || appointment.status === filterStatus;
            return matchSearch && matchStatus;
        });
    }, [appointmentData, searchTerm, filterStatus]);

    const getStatusBadge = (status) => {
        switch (status) {
            case 'selesai': return 'badge-success';
            case 'berlangsung': return 'badge-warning';
            case 'antri': return 'badge-info';
            case 'dibatalkan': return 'badge-error';
            default: return 'badge-ghost';
        }
    };

    const formatDateTime = (dateTime) => {
        const date = new Date(dateTime);
        return {
            date: date.toLocaleDateString('id-ID'),
            time: date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
        };
    };

    const getQueueNumber = (appointment) => {
        const sameScheduleAppointments = appointmentData.filter(a =>
            a.id_jadwal_dokter === appointment.id_jadwal_dokter &&
            a.tgl_kunjungan.split('T')[0] === appointment.tgl_kunjungan.split('T')[0] &&
            a.status !== 'dibatalkan' &&
            a.id <= appointment.id
        );
        return sameScheduleAppointments.length;
    };

    return (
        <div className="space-y-6 p-4 md:p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Appointment</h1>
                    <p className="text-gray-600">Kelola janji temu pasien dengan dokter</p>
                </div>
                <div className="flex gap-2">
                    <button
                        className="btn btn-ghost btn-sm hover:bg-gray-100"
                        onClick={handleDebugJadwal}
                        title="Debug Jadwal"
                    >
                        <Bug className="h-4 w-4" />
                    </button>
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
                        Buat Appointment
                    </button>
                </div>
            </div>

            {error && (
                <div className="alert alert-error flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    <span>{error}</span>
                    <button className="btn btn-sm btn-ghost" onClick={() => setError('')}>×</button>
                </div>
            )}

            {debugInfo && (
                <div className="alert alert-info flex items-start gap-2">
                    <Bug className="h-4 w-4" />
                    <div>
                        <div className="font-bold">Debug Info:</div>
                        <pre className="text-xs mt-1 whitespace-pre-wrap">{debugInfo}</pre>
                    </div>
                    <button className="btn btn-sm btn-ghost" onClick={() => setDebugInfo('')}>×</button>
                </div>
            )}

            <div className="card bg-white shadow-sm">
                <div className="card-body">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="form-control flex-1">
                            <div className="input-group">
                                <input
                                    type="text"
                                    placeholder="Cari pasien, dokter, atau telepon..."
                                    className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <button className="btn btn-square btn-primary">
                                    <Search className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                        <select
                            className="select select-bordered focus:outline-none focus:ring-2 focus:ring-primary"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >
                            <option value="">Semua Status</option>
                            <option value="antri">Antri</option>
                            <option value="berlangsung">Berlangsung</option>
                            <option value="selesai">Selesai</option>
                            <option value="dibatalkan">Dibatalkan</option>
                        </select>
                    </div>
                </div>
            </div>

            {isLoading && (
                <div className="flex justify-center py-8">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>
            )}

            {!isLoading && appointmentData.length === 0 && (
                <div className="card bg-white shadow-sm">
                    <div className="card-body text-center py-12">
                        <div className="text-gray-400 mb-4">
                            <Calendar className="h-12 w-12 mx-auto mb-2" />
                            <p>Belum ada data appointment</p>
                            {error && <p className="text-error mt-2">{error}</p>}
                        </div>
                        <button
                            className="btn btn-primary btn-sm"
                            onClick={() => {
                                resetForm();
                                setShowModal(true);
                            }}
                            disabled={pasienOptions.length === 0 || poliOptions.length === 0}
                        >
                            Buat Appointment Pertama
                        </button>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAppointments.map((appointment) => {
                    if (!appointment) return null;

                    const pasienNama = appointment.pasien?.nama || 'Unknown Patient';
                    const pasienTelepon = appointment.pasien?.telepon || 'No Phone';
                    const dokterNama = appointment.dokter?.nama || 'Unknown Doctor';
                    const poliNama = appointment.poli?.nama_poli || 'Unknown Poli';
                    const jadwalHari = appointment.jadwal_dokter?.hari || 'Unknown Day';
                    const jadwalMulai = appointment.jadwal_dokter?.jam_mulai || '00:00';
                    const jadwalSelesai = appointment.jadwal_dokter?.jam_selesai || '00:00';

                    const dateTime = formatDateTime(appointment.tgl_kunjungan);
                    const queueNumber = getQueueNumber(appointment);

                    return (
                        <div key={appointment.id} className="card bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
                            <div className="card-body">
                                <div className="flex items-start justify-between">
                                    <div className={`badge ${getStatusBadge(appointment.status)} capitalize`}>
                                        {appointment.status}
                                    </div>
                                    <div className="dropdown dropdown-end">
                                        <div tabIndex={0} role="button" className="btn btn-ghost btn-sm">
                                            ⋮
                                        </div>
                                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-white rounded-box w-52">
                                            <li><a onClick={() => handleEdit(appointment)}><Edit className="h-4 w-4" />Edit</a></li>
                                            {appointment.status === 'antri' && (
                                                <li><a className="text-warning" onClick={() => handleUpdateStatus(appointment.id, 'berlangsung')}>Mulai Konsultasi</a></li>
                                            )}
                                            {appointment.status === 'berlangsung' && (
                                                <li><a className="text-success" onClick={() => handleUpdateStatus(appointment.id, 'selesai')}>Selesai</a></li>
                                            )}
                                            <li><a className="text-error" onClick={() => handleUpdateStatus(appointment.id, 'dibatalkan')}>Batalkan</a></li>
                                            <li><a className="text-error" onClick={() => handleDelete(appointment.id)}><Trash2 className="h-4 w-4" />Hapus</a></li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="space-y-3 mt-4">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <User className="h-4 w-4 text-primary" />
                                            <span className="font-bold text-gray-800">{pasienNama}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Phone className="h-3 w-3" />
                                            <span>{pasienTelepon}</span>
                                        </div>
                                    </div>

                                    <div className="divider my-2"></div>

                                    <div className="space-y-2 text-sm text-gray-700">
                                        <div><strong>Dokter:</strong> {dokterNama}</div>
                                        <div><strong>Poliklinik:</strong> {poliNama}</div>
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-4 w-4" />
                                                <span>{dateTime.date}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock className="h-4 w-4" />
                                                <span>{dateTime.time}</span>
                                            </div>
                                        </div>
                                        <div><strong>Jadwal:</strong> {jadwalHari}, {jadwalMulai} - {jadwalSelesai}</div>
                                    </div>

                                    <div className="divider my-2"></div>

                                    <div>
                                        <div className="text-sm font-medium mb-1">Keluhan:</div>
                                        <div className="text-sm text-gray-600 bg-gray-100 p-2 rounded">
                                            {appointment.keluhan || 'Tidak ada keluhan tercatat'}
                                        </div>
                                    </div>

                                    {appointment.status === 'antri' && (
                                        <div className="alert alert-info py-2 text-sm">
                                            <span>Antrian: {queueNumber}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {showModal && (
                <div className="modal modal-open fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="modal-box w-full max-w-2xl bg-white rounded-lg shadow-xl p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-bold text-gray-800">
                                {isEdit ? 'Edit Appointment' : 'Buat Appointment Baru'}
                            </h3>
                            <button
                                className="btn btn-ghost btn-sm"
                                onClick={() => {
                                    setShowModal(false);
                                    resetForm();
                                }}
                            >
                                ×
                            </button>
                        </div>

                        {error && (
                            <div className="alert alert-error flex items-center gap-2 mb-6">
                                <AlertCircle className="h-4 w-4" />
                                <span>{error}</span>
                            </div>
                        )}

                        {debugInfo && (
                            <div className="alert alert-info flex items-start gap-2 mb-6">
                                <Bug className="h-4 w-4" />
                                <div>
                                    <div className="font-bold">Debug Info:</div>
                                    <pre className="text-xs mt-1 whitespace-pre-wrap">{debugInfo}</pre>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="form-control">
                                    <label className="label font-medium text-gray-700">
                                        <span>Pasien <span className="text-red-500">*</span></span>
                                    </label>
                                    <select
                                        name="id_pasien"
                                        value={formData.id_pasien}
                                        onChange={handleInputChange}
                                        className="select select-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary transition duration-200"
                                        required
                                        disabled={pasienOptions.length === 0}
                                    >
                                        <option value="">
                                            {pasienOptions.length === 0 ? 'Tidak ada data pasien' : 'Pilih Pasien'}
                                        </option>
                                        {pasienOptions.map(pasien => (
                                            <option key={pasien.id} value={pasien.id}>
                                                {pasien.nama} - {pasien.telepon}
                                            </option>
                                        ))}
                                    </select>
                                    {pasienOptions.length === 0 && (
                                        <div className="label">
                                            <span className="label-text-alt text-error">Data pasien belum tersedia</span>
                                        </div>
                                    )}
                                </div>

                                <div className="form-control">
                                    <label className="label font-medium text-gray-700">
                                        <span>Poliklinik <span className="text-red-500">*</span></span>
                                    </label>
                                    <select
                                        name="id_poli"
                                        value={formData.id_poli}
                                        onChange={handleInputChange}
                                        className="select select-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary transition duration-200"
                                        required
                                        disabled={poliOptions.length === 0}
                                    >
                                        <option value="">
                                            {poliOptions.length === 0 ? 'Tidak ada data poli' : 'Pilih Poliklinik'}
                                        </option>
                                        {poliOptions.map(poli => (
                                            <option key={poli.id} value={poli.id}>{poli.nama_poli}</option>
                                        ))}
                                    </select>
                                    {poliOptions.length === 0 && (
                                        <div className="label">
                                            <span className="label-text-alt text-error">Data poli belum tersedia</span>
                                        </div>
                                    )}
                                </div>

                                <div className="form-control">
                                    <label className="label font-medium text-gray-700">
                                        <span>Dokter <span className="text-red-500">*</span></span>
                                    </label>
                                    <select
                                        name="id_dokter"
                                        value={formData.id_dokter}
                                        onChange={handleInputChange}
                                        className="select select-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary transition duration-200"
                                        required
                                        disabled={!selectedPoli || dokterOptions.length === 0}
                                    >
                                        <option value="">
                                            {!selectedPoli 
                                                ? 'Pilih poli terlebih dahulu' 
                                                : dokterOptions.length === 0 
                                                    ? 'Tidak ada dokter untuk poli ini'
                                                    : 'Pilih Dokter'
                                            }
                                        </option>
                                        {dokterOptions.map(dokter => (
                                            <option key={dokter.id} value={dokter.id}>{dokter.nama}</option>
                                        ))}
                                    </select>
                                    {selectedPoli && dokterOptions.length === 0 && (
                                        <div className="label">
                                            <span className="label-text-alt text-warning">Tidak ada dokter untuk poli ini</span>
                                        </div>
                                    )}
                                </div>

                                <div className="form-control">
                                    <label className="label font-medium text-gray-700">
                                        <span>Tanggal & Waktu <span className="text-red-500">*</span></span>
                                    </label>
                                    <input
                                        type="datetime-local"
                                        name="tgl_kunjungan"
                                        value={formData.tgl_kunjungan}
                                        onChange={handleInputChange}
                                        className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary transition duration-200"
                                        min={new Date().toISOString().slice(0, 16)}
                                        required
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label font-medium text-gray-700">
                                        <span>Jadwal Dokter <span className="text-red-500">*</span></span>
                                    </label>
                                    <select
                                        name="id_jadwal_dokter"
                                        value={formData.id_jadwal_dokter}
                                        onChange={handleInputChange}
                                        className="select select-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary transition duration-200"
                                        required
                                        disabled={!selectedDokter || !selectedTanggal}
                                    >
                                        <option value="">
                                            {!selectedDokter || !selectedTanggal 
                                                ? 'Pilih dokter dan tanggal terlebih dahulu' 
                                                : jadwalOptions.length === 0 
                                                    ? 'Tidak ada jadwal tersedia untuk hari ini'
                                                    : 'Pilih Jadwal'
                                            }
                                        </option>
                                        {jadwalOptions.map(jadwal => (
                                            <option key={jadwal.id} value={jadwal.id}>
                                                {jadwal.hari}, {jadwal.jam_mulai} - {jadwal.jam_selesai} (Kuota: {jadwal.kuota})
                                            </option>
                                        ))}
                                    </select>
                                    {selectedDokter && selectedTanggal && jadwalOptions.length === 0 && (
                                        <div className="label">
                                            <span className="label-text-alt text-warning">
                                                Tidak ada jadwal tersedia untuk hari ini. 
                                                <button 
                                                    type="button" 
                                                    className="btn btn-ghost btn-xs ml-2"
                                                    onClick={handleDebugJadwal}
                                                >
                                                    Debug
                                                </button>
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="form-control">
                                    <label className="label font-medium text-gray-700">
                                        <span>Status</span>
                                    </label>
                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleInputChange}
                                        className="select select-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary transition duration-200"
                                    >
                                        <option value="antri">Antri</option>
                                        <option value="berlangsung">Berlangsung</option>
                                        <option value="selesai">Selesai</option>
                                        <option value="dibatalkan">Dibatalkan</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-control">
                                <label className="label font-medium text-gray-700">
                                    <span>Keluhan Utama <span className="text-red-500">*</span></span>
                                </label>
                                <textarea
                                    name="keluhan"
                                    value={formData.keluhan}
                                    onChange={handleInputChange}
                                    className="textarea textarea-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary transition duration-200"
                                    rows={4}
                                    placeholder="Jelaskan keluhan atau gejala yang dialami pasien..."
                                    required
                                ></textarea>
                            </div>

                            <div className="modal-action flex justify-end gap-4">
                                <button
                                    type="button"
                                    className="btn btn-outline hover:bg-gray-100"
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
                                    disabled={isLoading || pasienOptions.length === 0 || poliOptions.length === 0}
                                >
                                    {isLoading ? (
                                        <span className="loading loading-spinner"></span>
                                    ) : isEdit ? (
                                        'Update Appointment'
                                    ) : (
                                        'Buat Appointment'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}