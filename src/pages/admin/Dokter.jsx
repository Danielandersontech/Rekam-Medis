import React, { useState, useEffect } from "react";
import { Award, Clock } from "lucide-react";
import { useForm } from "../../components/admin/useForm";
import { useModal } from "../../components/admin/useModal";
import PageHeader from "../../components/admin/PageHeader";
import SearchBar from "../../components/admin/SearchBar";
import FormModal from "../../components/admin/FormModal";
import FormInput from "../../components/admin/FormInput";
import FormSection from "../../components/admin/FormSection";
import ActionDropdown from "../../components/admin/ActionDropdown";
import StatusBadge from "../../components/admin/StatusBadge";
import { dokterAPI } from "../../services/dokterAPI";
import AlertBox from "../../components/AlertBox";
import LoadingSpinner from "../../components/LoadingSpinner";
import EmptyState from "../../components/EmptyState";

export default function DokterPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [dokterData, setDokterData] = useState([]);
  const [poliOptions, setPoliOptions] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});

  const initialFormData = {
    nama: "",
    nip: "",
    id_poli: "",
    no_lisensi: "",
    telepon: "",
    email: "",
    alamat: "",
    tanggal_lahir: "",
    jenis_kelamin: "",
    pendidikan: "",
    pengalaman: "",
    jam_praktek: "",
    tarif_konsultasi: "",
    // status: 'Aktif', // Uncomment if status column is added
  };

  const { formData, handleInputChange, resetForm, setFormData } =
    useForm(initialFormData);
  const { showModal, openModal, closeModal } = useModal();

  useEffect(() => {
    loadDokter();
    loadPoli();
  }, []);

  const loadDokter = async () => {
    try {
      setIsLoading(true);
      setError("");
      const data = await dokterAPI.fetchDokter();
      setDokterData(data);
    } catch (err) {
      setError("Gagal memuat data dokter: " + err.message);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const loadPoli = async () => {
    try {
      const data = await dokterAPI.fetchPoli();
      setPoliOptions(data);
    } catch (err) {
      setError("Gagal memuat data poli: " + err.message);
      console.error(err);
    }
  };

  const validateForm = async () => {
    const errors = {};

    // Required fields
    if (!formData.nama) errors.nama = "Nama lengkap wajib diisi";
    if (!formData.nip) errors.nip = "NIP wajib diisi";
    if (!formData.id_poli) errors.id_poli = "Poli wajib dipilih";
    if (!formData.no_lisensi) errors.no_lisensi = "No. Lisensi wajib diisi";
    if (!formData.telepon) errors.telepon = "Telepon wajib diisi";
    if (!formData.email) errors.email = "Email wajib diisi";
    if (!formData.tanggal_lahir)
      errors.tanggal_lahir = "Tanggal lahir wajib diisi";
    if (!formData.jenis_kelamin)
      errors.jenis_kelamin = "Jenis kelamin wajib diisi";
    if (!formData.jam_praktek) errors.jam_praktek = "Jam praktek wajib diisi";
    if (!formData.tarif_konsultasi)
      errors.tarif_konsultasi = "Tarif konsultasi wajib diisi";

    // Format validations
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Format email tidak valid";
    }
    if (
      formData.telepon &&
      !/^\+?\d{10,13}$/.test(formData.telepon.replace(/\s/g, ""))
    ) {
      errors.telepon = "Format telepon tidak valid (10-13 digit)";
    }
    if (
      formData.tarif_konsultasi &&
      isNaN(formData.tarif_konsultasi) ||
      Number(formData.tarif_konsultasi) <= 0
    ) {
      errors.tarif_konsultasi = "Tarif konsultasi harus angka positif";
    }
    if (
      formData.tanggal_lahir &&
      !/^\d{4}-\d{2}-\d{2}$/.test(formData.tanggal_lahir)
    ) {
      errors.tanggal_lahir = "Format tanggal lahir tidak valid (YYYY-MM-DD)";
    }

    // Validate id_poli exists
    if (formData.id_poli) {
      const poliExists = poliOptions.some(
        (poli) => poli.id === parseInt(formData.id_poli)
      );
      if (!poliExists) errors.id_poli = "Poli tidak valid";
    }

    // Unique constraint checks
    try {
      const [nipExists, emailExists, lisensiExists] = await Promise.all([
        dokterAPI.checkUniqueNip(formData.nip, isEdit ? editId : null),
        dokterAPI.checkUniqueEmail(formData.email, isEdit ? editId : null),
        dokterAPI.checkUniqueLisensi(formData.no_lisensi, isEdit ? editId : null),
      ]);

      if (nipExists) errors.nip = "NIP sudah terdaftar";
      if (emailExists) errors.email = "Email sudah terdaftar";
      if (lisensiExists) errors.no_lisensi = "No. Lisensi sudah terdaftar";
    } catch (err) {
      errors.api = "Gagal memeriksa data unik: " + err.message;
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = await validateForm();
    if (!isValid) return;

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      if (isEdit && editId) {
        await dokterAPI.updateDokter(editId, formData);
        setSuccess("Data dokter berhasil diperbarui!");
      } else {
        await dokterAPI.createDokter(formData);
        setSuccess("Data dokter berhasil ditambahkan!");
      }

      resetForm();
      setIsEdit(false);
      setEditId(null);
      setValidationErrors({});
      closeModal();
      loadDokter();

      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      setError("Error menyimpan data dokter: " + error.message);
      console.error("Error saving doctor:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (dokter) => {
    setFormData({
      ...dokter,
      tanggal_lahir: dokter.tanggal_lahir.split("T")[0],
      id_poli: dokter.id_poli,
    });
    setIsEdit(true);
    setEditId(dokter.id);
    setValidationErrors({});
    openModal();
  };

  const handleDelete = async (id) => {
    if (confirm("Yakin ingin menghapus data dokter ini?")) {
      try {
        setIsLoading(true);
        setError("");
        setSuccess("");

        await dokterAPI.deleteDokter(id);
        setSuccess("Data dokter berhasil dihapus!");
        loadDokter();

        setTimeout(() => setSuccess(""), 3000);
      } catch (error) {
        setError("Gagal menghapus data dokter: " + error.message);
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

  const filteredDokter = dokterData.filter(
    (dokter) =>
      dokter.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (dokter.poli &&
        dokter.poli.nama_poli.toLowerCase().includes(searchTerm.toLowerCase())) ||
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

      {error && <AlertBox type="error">{error}</AlertBox>}
      {success && <AlertBox type="success">{success}</AlertBox>}

      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder="Cari nama, NIP, atau poli..."
        filters={
          <select className="select select-bordered">
            <option>Semua Poli</option>
            {poliOptions.map((poli) => (
              <option key={poli.id}>{poli.nama_poli}</option>
            ))}
          </select>
        }
      />

      {isLoading && <LoadingSpinner text="Memuat data dokter..." />}

      {!isLoading && dokterData.length === 0 && !error && (
        <EmptyState text="Belum ada data dokter. Tambah dokter pertama!" />
      )}

      {!isLoading && dokterData.length === 0 && error && (
        <EmptyState text="Terjadi kesalahan. Coba lagi nanti." />
      )}

      {!isLoading && dokterData.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDokter.map((dokter) => (
            <div
              key={dokter.id}
              className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="card-body">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="card-title text-lg">{dokter.nama}</h3>
                    <div className="flex items-center gap-2 text-primary mt-1">
                      <Award className="h-4 w-4" />
                      <span className="text-sm font-medium">
                        {dokter.poli ? dokter.poli.nama_poli : "Belum ada poli"}
                      </span>
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
                  {/* <StatusBadge status={dokter.status} /> */}{" "}
                  {/* Uncomment if status column is added */}
                  <div className="text-right">
                    <div className="text-sm text-base-content/70">
                      Tarif Konsultasi
                    </div>
                    <div className="font-bold text-primary">
                      Rp {Number(dokter.tarif_konsultasi).toLocaleString("id-ID")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <FormModal
        isOpen={showModal}
        onClose={() => {
          closeModal();
          setValidationErrors({});
        }}
        title={isEdit ? "Edit Data Dokter" : "Tambah Dokter Baru"}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        submitText={isLoading ? "Mohon Tunggu..." : isEdit ? "Update Data" : "Simpan Data"}
      >
        <FormSection title="Informasi Pribadi">
          <FormInput
            label="Nama Lengkap"
            name="nama"
            value={formData.nama}
            onChange={handleInputChange}
            required
            error={validationErrors.nama}
          />

          <FormInput
            label="NIP"
            name="nip"
            value={formData.nip}
            onChange={handleInputChange}
            required
            error={validationErrors.nip}
          />
        </FormSection>

        <FormSection title="Informasi Profesional">
          <FormInput
            label="Poli"
            name="id_poli"
            type="select"
            value={formData.id_poli}
            onChange={handleInputChange}
            required
            error={validationErrors.id_poli}
            options={[
              { value: "", label: "Pilih Poli" },
              ...poliOptions.map((poli) => ({
                value: poli.id,
                label: poli.nama_poli,
              })),
            ]}
          />

          <FormInput
            label="No. Lisensi (STR)"
            name="no_lisensi"
            value={formData.no_lisensi}
            onChange={handleInputChange}
            required
            error={validationErrors.no_lisensi}
          />
        </FormSection>

        <FormSection title="Kontak dan Biodata">
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
            required
            error={validationErrors.email}
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
              { value: "", label: "Pilih Jenis Kelamin" },
              { value: "Laki-laki", label: "Laki-laki" },
              { value: "Perempuan", label: "Perempuan" },
            ]}
          />
        </FormSection>

        <FormSection title="Informasi Karir">
          <FormInput
            label="Pendidikan Terakhir"
            name="pendidikan"
            value={formData.pendidikan}
            onChange={handleInputChange}
            placeholder="S1 Kedokteran, Sp. dll"
          />

          <FormInput
            label="Pengalaman (tahun)"
            name="pengalaman"
            value={formData.pengalaman}
            onChange={handleInputChange}
            min="0"
          />

          <FormInput
            label="Jam Praktek"
            name="jam_praktek"
            value={formData.jam_praktek}
            onChange={handleInputChange}
            required
            error={validationErrors.jam_praktek}
            placeholder="08:00-16:00"
          />

          <FormInput
            label="Tarif Konsultasi"
            name="tarif_konsultasi"
            type="number"
            value={formData.tarif_konsultasi}
            onChange={handleInputChange}
            required
            error={validationErrors.tarif_konsultasi}
            placeholder="200000"
            min="0"
          />
        </FormSection>

        <FormSection title="Alamat" columns={1}>
          <FormInput
            label="Alamat Lengkap"
            name="alamat"
            type="textarea"
            value={formData.alamat}
            onChange={handleInputChange}
            rows={3}
          />
        </FormSection>
      </FormModal>
    </div>
  );
}