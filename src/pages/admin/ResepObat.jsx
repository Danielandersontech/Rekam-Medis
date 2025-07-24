import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Pill, User, Calendar, FileText, AlertCircle, Bug } from 'lucide-react';
import { resepObatAPI } from '../../services/resepObatAPI';

export default function ResepObat() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedResep, setSelectedResep] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [resepObatData, setResepObatData] = useState([]);
  const [rekamMedisOptions, setRekamMedisOptions] = useState([]);
  const [formData, setFormData] = useState({
    rekam_medis_id: '',
    catatan: '',
  });
  const [obatList, setObatList] = useState([
    { nama_obat: '', dosis: '', frekuensi: '', durasi: '', jumlah: '', instruksi: '' }
  ]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      setError('');
      const [resepData, rekamMedisData] = await Promise.all([
        resepObatAPI.fetchResepObat().catch(err => []),
        resepObatAPI.fetchRekamMedisOptions().catch(err => [])
      ]);
      setResepObatData(Array.isArray(resepData) ? resepData : []);
      setRekamMedisOptions(Array.isArray(rekamMedisData) ? rekamMedisData : []);
      if (rekamMedisData.length === 0) {
        setError('Tidak ada data rekam medis aktif.');
      }
    } catch (error) {
      setError('Gagal memuat data. Silakan coba lagi.');
      setResepObatData([]);
    } finally {
      setIsLoading(false);
    }
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      setIsLoading(true);
      if (!formData.rekam_medis_id) throw new Error('Rekam medis harus dipilih');
      for (let i = 0; i < obatList.length; i++) {
        const obat = obatList[i];
        if (!obat.nama_obat || !obat.dosis || !obat.frekuensi || !obat.jumlah) {
          throw new Error(`Data obat #${i + 1} belum lengkap`);
        }
      }
      const submitData = {
        rekam_medis_id: formData.rekam_medis_id,
        obat_list: obatList,
        catatan: formData.catatan
      };
      if (isEdit && editId) {
        await resepObatAPI.updateResepObat(editId, submitData);
        await loadData();
        alert('Resep obat berhasil diupdate!');
      } else {
        await resepObatAPI.createResepObat(submitData);
        await loadData();
        alert('Resep obat berhasil dibuat!');
      }
      setShowModal(false);
      resetForm();
    } catch (error) {
      setError(error.message || 'Gagal menyimpan resep obat');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (resep) => {
    if (!resep || !resep.obat_list) {
      alert('Data resep tidak valid');
      return;
    }
    setFormData({
      rekam_medis_id: resep.rekam_medis_id?.toString() || resep.id?.toString(),
      catatan: ''
    });
    const obatListData = resep.obat_list.map(obat => ({
      nama_obat: obat.nama_obat || '',
      dosis: obat.dosis || '',
      frekuensi: obat.frekuensi || obat.instruksi || '',
      durasi: obat.durasi || '30 hari',
      jumlah: obat.jumlah || '',
      instruksi: obat.instruksi || obat.frekuensi || ''
    }));
    setObatList(obatListData.length > 0 ? obatListData : [{ nama_obat: '', dosis: '', frekuensi: '', durasi: '', jumlah: '', instruksi: '' }]);
    setIsEdit(true);
    setEditId(resep.rekam_medis_id || resep.id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Yakin ingin menghapus resep obat ini?')) {
      try {
        setIsLoading(true);
        await resepObatAPI.deleteResepObat(id);
        await loadData();
        alert('Resep obat berhasil dihapus!');
      } catch (error) {
        alert('Gagal menghapus resep obat: ' + error.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleShowDetail = (resep) => {
    setSelectedResep(resep);
    setShowDetailModal(true);
  };

  const handleCetakResep = async (resep) => {
    try {
      setIsLoading(true);
      await resepObatAPI.cetakResep(resep.rekam_medis_id || resep.id);
      alert('Fitur cetak resep akan segera tersedia');
    } catch (error) {
      alert('Gagal mencetak resep: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDebugResep = async () => {
    try {
      const debugData = await resepObatAPI.debugResepObat();
      console.log('DEBUG RESEP OBAT:', debugData);
      alert('Debug info tersedia di console. Tekan F12 untuk melihat.');
    } catch (error) {
      console.error('Debug error:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      rekam_medis_id: '',
      catatan: '',
    });
    setObatList([
      { nama_obat: '', dosis: '', frekuensi: '', durasi: '', jumlah: '', instruksi: '' }
    ]);
    setIsEdit(false);
    setEditId(null);
    setError('');
  };

  const filteredResep = resepObatData.filter(resep =>
    resep.pasien.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resep.no_resep.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resep.dokter.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Aktif': return 'bg-green-100 text-green-800';
      case 'Selesai': return 'bg-blue-100 text-blue-800';
      case 'Dibatalkan': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Resep Obat</h1>
          <p className="text-gray-600 mt-1">Kelola resep obat dan pengobatan pasien dengan mudah</p>
        </div>
        <div className="flex gap-3">
          <button
            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
            onClick={handleDebugResep}
            title="Debug Resep Obat"
          >
            <Bug className="h-5 w-5 text-gray-600" />
          </button>
          <button 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            disabled={isLoading || rekamMedisOptions.length === 0}
          >
            {isLoading ? (
              <span className="animate-spin">⟳</span>
            ) : (
              <Plus className="h-5 w-5" />
            )}
            Buat Resep
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          <span>{error}</span>
          <button className="ml-auto text-red-700 hover:text-red-900" onClick={() => setError('')}>×</button>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Cari pasien, nomor resep, atau dokter..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-2/3 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      )}

      {!isLoading && resepObatData.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <Pill className="h-12 w-12 mx-auto text-gray-400 mb-3" />
          <p className="text-gray-600 mb-4">Belum ada data resep obat</p>
          {error && <p className="text-red-600 mb-4">{error}</p>}
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            disabled={rekamMedisOptions.length === 0}
          >
            Buat Resep Obat Pertama
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResep.map((resep) => (
          <div key={resep.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Pill className="h-5 w-5 text-blue-600" />
                  <span className="font-mono text-sm font-medium">{resep.no_resep}</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusBadge(resep.status)}`}>
                  {resep.status}
                </span>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <User className="h-4 w-4 text-blue-600" />
                    <span className="font-semibold text-gray-800">{resep.pasien}</span>
                  </div>
                  <div className="text-sm text-gray-600">Dokter: {resep.dokter}</div>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(resep.tanggal).toLocaleDateString('id-ID')}</span>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-sm font-medium text-gray-700 mb-2">Daftar Obat ({resep.total_obat} item)</div>
                  <div className="space-y-1">
                    {resep.obat_list.slice(0, 2).map((obat, index) => (
                      <div key={index} className="text-xs text-gray-600">
                        • {obat.nama_obat} - {obat.frekuensi}
                      </div>
                    ))}
                    {resep.obat_list.length > 2 && (
                      <div className="text-xs text-blue-600">
                        +{resep.obat_list.length - 2} obat lainnya
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between mt-4">
                <button 
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
                  onClick={() => handleShowDetail(resep)}
                >
                  <FileText className="h-4 w-4" />
                  Detail
                </button>
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="text-gray-600 hover:text-gray-800 p-2">
                    ⋮
                  </div>
                  <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-white rounded-lg w-52">
                    <li><a onClick={() => handleEdit(resep)} className="flex items-center gap-2"><Edit className="h-4 w-4" />Edit</a></li>
                    <li><a onClick={() => handleCetakResep(resep)} className="flex items-center gap-2">Cetak Resep</a></li>
                    <li><a onClick={() => handleDelete(resep.rekam_medis_id || resep.id)} className="flex items-center gap-2 text-red-600"><Trash2 className="h-4 w-4" />Hapus</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                {isEdit ? 'Edit Resep Obat' : 'Buat Resep Obat Baru'}
              </h3>
              
              {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-6 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  <span>{error}</span>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="form-control">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rekam Medis Pasien <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="rekam_medis_id"
                    value={formData.rekam_medis_id}
                    onChange={handleInputChange}
                    className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                    disabled={rekamMedisOptions.length === 0}
                  >
                    <option value="">
                      {rekamMedisOptions.length === 0 ? 'Tidak ada rekam medis aktif' : 'Pilih Rekam Medis'}
                    </option>
                    {rekamMedisOptions.map(rekam => (
                      <option key={rekam.id} value={rekam.id}>
                        {rekam.no_rekam} - {rekam.pasien} ({rekam.diagnosis}) - {rekam.tanggal}
                      </option>
                    ))}
                  </select>
                  {rekamMedisOptions.length === 0 && (
                    <p className="mt-1 text-sm text-red-600">Belum ada rekam medis aktif</p>
                  )}
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-gray-800">Daftar Obat</h4>
                    <button type="button" className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 flex items-center gap-2" onClick={addObat}>
                      <Plus className="h-4 w-4" />
                      Tambah Obat
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {obatList.map((obat, index) => (
                      <div key={index} className="bg-white rounded-lg shadow-sm p-4 relative">
                        <div className="flex items-center justify-between mb-4">
                          <h5 className="font-semibold text-gray-800">Obat #{index + 1}</h5>
                          {obatList.length > 1 && (
                            <button 
                              type="button" 
                              className="text-red-600 hover:text-red-800"
                              onClick={() => removeObat(index)}
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          <div className="form-control">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Nama Obat <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              value={obat.nama_obat}
                              onChange={(e) => handleObatChange(index, 'nama_obat', e.target.value)}
                              className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Nama obat dan kekuatan"
                              required
                            />
                          </div>
                          
                          <div className="form-control">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Dosis <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              value={obat.dosis}
                              onChange={(e) => handleObatChange(index, 'dosis', e.target.value)}
                              className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="5mg, 10ml, dll"
                              required
                            />
                          </div>
                          
                          <div className="form-control">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Aturan Pakai <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              value={obat.frekuensi}
                              onChange={(e) => handleObatChange(index, 'frekuensi', e.target.value)}
                              className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="3x sehari, 2x sehari, dll"
                              required
                            />
                          </div>
                          
                          <div className="form-control">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Durasi</label>
                            <input
                              type="text"
                              value={obat.durasi}
                              onChange={(e) => handleObatChange(index, 'durasi', e.target.value)}
                              className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="7 hari, 14 hari, dll"
                            />
                          </div>
                          
                          <div className="form-control">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Jumlah <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              value={obat.jumlah}
                              onChange={(e) => handleObatChange(index, 'jumlah', e.target.value)}
                              className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="30 tablet, 1 botol, dll"
                              required
                            />
                          </div>
                          
                          <div className="form-control">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Instruksi Tambahan</label>
                            <input
                              type="text"
                              value={obat.instruksi}
                              onChange={(e) => handleObatChange(index, 'instruksi', e.target.value)}
                              className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Setelah makan, sebelum tidur, dll"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="form-control">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Catatan Tambahan</label>
                  <textarea
                    name="catatan"
                    value={formData.catatan}
                    onChange={handleInputChange}
                    className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={4}
                    placeholder="Catatan khusus untuk pasien atau apoteker..."
                  ></textarea>
                </div>
                
                <div className="flex justify-end gap-3">
                  <button 
                    type="button" 
                    className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
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
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                    disabled={isLoading || rekamMedisOptions.length === 0}
                  >
                    {isLoading ? (
                      <span className="animate-spin">⟳</span>
                    ) : isEdit ? (
                      'Update Resep'
                    ) : (
                      'Simpan Resep'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {showDetailModal && selectedResep && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Detail Resep Obat</h3>
              
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <div className="text-sm text-gray-600">No. Resep</div>
                      <div className="font-semibold">{selectedResep.no_resep}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Pasien</div>
                      <div className="font-semibold">{selectedResep.pasien}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Dokter</div>
                      <div className="font-semibold">{selectedResep.dokter}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Tanggal</div>
                      <div className="font-semibold">{new Date(selectedResep.tanggal).toLocaleDateString('id-ID')}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Status</div>
                      <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusBadge(selectedResep.status)}`}>
                        {selectedResep.status}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Total Obat</div>
                      <div className="font-semibold">{selectedResep.total_obat} item</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-4">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Daftar Obat</h4>
                  <div className="space-y-4">
                    {selectedResep.obat_list.map((obat, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h5 className="font-semibold text-blue-600">{obat.nama_obat}</h5>
                          <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">{obat.dosis}</span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Aturan Pakai:</span> {obat.frekuensi}
                          </div>
                          <div>
                            <span className="font-medium">Durasi:</span> {obat.durasi}
                          </div>
                          <div>
                            <span className="font-medium">Jumlah:</span> {obat.jumlah}
                          </div>
                        </div>
                        
                        {obat.instruksi && (
                          <div className="mt-2 p-2 bg-gray-50 rounded text-sm">
                            <span className="font-medium">Instruksi:</span> {obat.instruksi}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {selectedResep.rekam_medis && (
                  <div className="bg-white rounded-lg shadow-sm p-4">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Informasi Rekam Medis</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">No. Rekam Medis:</span> {selectedResep.rekam_medis.no_rekam_medis}
                      </div>
                      <div>
                        <span className="font-medium">Diagnosis:</span> {selectedResep.rekam_medis.diagnosis}
                      </div>
                      <div>
                        <span className="font-medium">Keluhan Utama:</span> {selectedResep.rekam_medis.keluhan_utama}
                      </div>
                      <div>
                        <span className="font-medium">Tindakan:</span> {selectedResep.rekam_medis.tindakan}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end gap-3 mt-6">
                <button 
                  className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
                  onClick={() => setShowDetailModal(false)}
                >
                  Tutup
                </button>
                <button 
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                  onClick={() => handleCetakResep(selectedResep)}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="animate-spin">⟳</span>
                  ) : (
                    'Cetak Resep'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}