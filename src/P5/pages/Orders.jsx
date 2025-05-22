import PageHeader from "../components/PageHeader";

export default function Orders() {
  return (
    <div>
      <PageHeader 
        title="Daftar Pesanan"
        breadcrumb={['Dashboard', 'Pesanan', 'Semua Pesanan']}
      >
        <button className="bg-hijau text-white px-4 py-2 rounded-lg">
          + Tambah Pesanan
        </button>
      </PageHeader>
      
      {/* Konten halaman lainnya */}
    </div>
  );
}