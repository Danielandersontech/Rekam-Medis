import { BiEditAlt } from "react-icons/bi";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useEffect, useState } from "react";
import { notesAPI } from "../services/notesAPI";
import AlertBox from "../components/AlertBox";
import GenericTable from "../components/GenericTable";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";

export default function Notes() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [dataForm, setDataForm] = useState({
    title: "",
    content: "",
    status: "",
  });

  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [notes, setNotes] = useState([]);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (isEdit) {
        await notesAPI.updateNote(editId, dataForm);
        setSuccess("Catatan berhasil diperbarui!");
      } else {
        await notesAPI.createNote(dataForm);
        setSuccess("Catatan berhasil ditambahkan!");
      }

      setDataForm({ title: "", content: "", status: "" });
      setIsEdit(false);
      setEditId(null);
      loadNotes();
    } catch (err) {
      setError(`Terjadi kesalahan: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const konfirmasi = confirm("Yakin ingin menghapus catatan ini?");
    if (!konfirmasi) return;

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await notesAPI.deleteNote(id);
      loadNotes();
    } catch (err) {
      setError(`Terjadi kesalahan: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (note) => {
    setDataForm({
      title: note.title,
      content: note.content,
      status: note.status || "",
    });
    setIsEdit(true);
    setEditId(note.id);
  };

  const loadNotes = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await notesAPI.fetchNotes();
      setNotes(data);
    } catch (err) {
      setError("Gagal memuat catatan");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Notes App</h2>
      </div>

      {error && <AlertBox type="error">{error}</AlertBox>}
      {success && <AlertBox type="success">{success}</AlertBox>}

      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {isEdit ? "Edit Catatan" : "Tambah Catatan Baru"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={dataForm.title}
            placeholder="Judul catatan"
            onChange={handleChange}
            required
            disabled={loading}
            className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200"
          />

          <textarea
            name="content"
            value={dataForm.content}
            placeholder="Isi catatan"
            onChange={handleChange}
            required
            rows="2"
            disabled={loading}
            className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200 resize-none"
          />

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold
                rounded-2xl disabled:opacity-50 transition-all shadow-lg"
            >
              {loading
                ? "Mohon Tunggu..."
                : isEdit
                ? "Simpan Perubahan"
                : "Tambah Data"}
            </button>

            {isEdit && (
              <button
                type="button"
                onClick={() => {
                  setIsEdit(false);
                  setDataForm({ title: "", content: "", status: "" });
                  setEditId(null);
                }}
                className="px-6 py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold
                  rounded-2xl transition-all shadow"
              >
                Batal Edit
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Notes Table Section */}
      <div className="mt-10">
        {loading && <LoadingSpinner text="Memuat catatan..." />}

        {!loading && notes.length === 0 && !error && (
          <EmptyState text="Belum ada catatan. Tambah catatan pertama!" />
        )}

        {!loading && notes.length === 0 && error && (
          <EmptyState text="Terjadi Kesalahan. Coba lagi nanti." />
        )}

        {!loading && notes.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mt-6">
            <div className="px-6 py-4">
              <h3 className="text-lg font-semibold">
                Daftar Catatan ({notes.length})
              </h3>
            </div>

            <GenericTable
              columns={["#", "Judul", "Isi Catatan", "Aksi"]}
              data={notes}
              renderRow={(note, index) => (
                <>
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4 text-emerald-600 font-semibold">
                    {note.title}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{note.content}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <button onClick={() => handleEdit(note)} disabled={loading}>
                      <BiEditAlt className="text-blue-500 text-2xl hover:text-blue-700" />
                    </button>
                    <button
                      onClick={() => handleDelete(note.id)}
                      disabled={loading}
                    >
                      <AiFillDelete className="text-red-400 text-2xl hover:text-red-600" />
                    </button>
                  </td>
                </>
              )}
            />
          </div>
        )}
      </div>
    </div>
  );
}
