import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="w-full max-w-md">
        <Outlet />
        
        <p className="text-center text-sm text-gray-500 mt-8">
          © {new Date().getFullYear()} Tex Medical Hospital System. All rights reserved.
        </p>
      </div>
    </div>
  );
}