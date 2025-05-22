import { Outlet } from "react-router-dom";
import GuestHeader from "../components/GuestHeader";
import GuestFooter from "../components/GuestFooter";


export default function GuestLayout() {
    return (
        <div className="flex flex-col min-h-screen">
            <GuestHeader />
            <main className="flex-grow">
                <Outlet />
            </main>
            <GuestFooter/>
        </div>
    );
}