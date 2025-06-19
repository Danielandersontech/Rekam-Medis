import "./assets/tailwind.css";
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loading from "./components/Loading";

// Lazy-loaded components
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));

const MedisLayout = React.lazy(() => import("./layouts/MedisLayout"));
const MedisHome = React.lazy(() => import("./pages/medis/MedisHome"));
const Tentang = React.lazy(() => import("./pages/medis/Tentang"));
const Services = React.lazy(() => import("./pages/medis/Services"));
const Doctors = React.lazy(() => import("./pages/medis/Doctors"));
const Appointment = React.lazy(() => import("./pages/medis/Appointment"));
const News = React.lazy(() => import("./pages/medis/News"));
const Contact = React.lazy(() => import("./pages/medis/Contact"));

const AdminLayout = React.lazy(() => import("./layouts/AdminLayout"));
const DashboardAdmin = React.lazy(() => import("./pages/admin/Dashboard"));
const PasienPage = React.lazy(() => import("./pages/admin/Pasien"));
const DokterPage = React.lazy(() => import("./pages/admin/Dokter"));
const Poli = React.lazy(() => import("./pages/admin/Poli"));
const JadwalDokter = React.lazy(() => import("./pages/admin/JadwalDokter"));
const AppointmentAdmin = React.lazy(() => import("./pages/admin/Appointment"));
const RekamMedis = React.lazy(() => import("./pages/admin/RekamMedis"));
const ResepObat = React.lazy(() => import("./pages/admin/ResepObat"));
const Admin404 = React.lazy(() => import("./pages/admin/Error404"));

const Error400 = React.lazy(() => import("./pages/Error400"));
const Error401 = React.lazy(() => import("./pages/Error401"));
const Error403 = React.lazy(() => import("./pages/Error403"));
const Error404 = React.lazy(() => import("./pages/Error404"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="*" element={<Error404 />} />
        </Route>

        <Route element={<MedisLayout />}>
          <Route path="/" element={<MedisHome />} />
          <Route path="/medis/tentang" element={<Tentang />} />
          <Route path="/medis/services" element={<Services />} />
          <Route path="/medis/doctors" element={<Doctors />} />
          <Route path="/medis/appoinment" element={<Appointment />} />
          <Route path="/medis/news" element={<News />} />
          <Route path="/medis/contact" element={<Contact />} />
        </Route>

        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<DashboardAdmin />} />
          <Route path="/admin/pasien" element={<PasienPage />} />
          <Route path="/admin/dokter" element={<DokterPage />} />
          <Route path="/admin/poli" element={<Poli />} />
          <Route path="/admin/jadwal-dokter" element={<JadwalDokter />} />
          <Route path="/admin/temu-janji" element={<AppointmentAdmin />} />
          <Route path="/admin/rekam-medis" element={<RekamMedis />} />
          <Route path="/admin/resep-obat" element={<ResepObat />} />
          <Route path="*" element={<Admin404 />} />
        </Route>

        {/* Error Routes */}
        <Route path="/error400" element={<Error400 />} />
        <Route path="/error401" element={<Error401 />} />
        <Route path="/error403" element={<Error403 />} />
        <Route path="/error404" element={<Error404 />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Suspense>
  );
}

export default App;