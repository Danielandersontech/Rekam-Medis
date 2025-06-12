import "./assets/tailwind.css";
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loading from "./components/Loading";
import GuestHome from "./pages/guest/Home";
import GuestLayout from "./layouts/GuestLayout";
import About from "./pages/guest/About";
import Testimonials from "./pages/guest/Testimonials";
import StockCheck from "./pages/guest/StockCheck";
import Products from "./pages/Products";
const Notes = React.lazy(() => import("./pages/Notes"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Orders = React.lazy(() => import("./pages/Orders"));
const Customers = React.lazy(() => import("./pages/Customers"));
const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));

const Error400 = React.lazy(() => import("./pages/Error400"));
const Error401 = React.lazy(() => import("./pages/Error401"));
const Error403 = React.lazy(() => import("./pages/Error403"));
const Error404 = React.lazy(() => import("./pages/Error404"));
const Users = React.lazy(() => import("./pages/User"));
const ProductDetail = React.lazy(() => import("./pages/ProductDetail"));

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

        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/user" element={<Users />} />
          <Route path="products" element={<Products />} />
          <Route path="*" element={<Error404 />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/notes" element={<Notes />} />
        </Route>
        <Route element={<GuestLayout />}>
          <Route path="/guest" element={<GuestHome />} />
          <Route path="/guest/about" element={<About />} />
          <Route path="/guest/products" element={<Products />} />
          <Route path="/guest/testimonials" element={<Testimonials />} />
          <Route path="/guest/stock-check" element={<StockCheck />} />
        </Route>
        {/* <Route path="/guest" element={<GuestHome />} /> */}
        <Route path="/error400" element={<Error400 />} />
        <Route path="/error401" element={<Error401 />} />
        <Route path="/error403" element={<Error403 />} />
        <Route path="/error404" element={<Error404 />} />
      </Routes>
    </Suspense>
  );
}

export default App;
