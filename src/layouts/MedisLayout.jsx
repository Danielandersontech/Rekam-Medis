import { Outlet } from "react-router-dom";
import MedicalHeader from "../components/MedicalHeader";
import MedicalFooter from "../components/MedicalFooter";

export default function MedisLayout() {
    return (
        <div className="flex flex-col min-h-screen">
            <MedicalHeader/>
            <main className="flex-grow">
                <Outlet />
            </main>
            <MedicalFooter />
        </div>
    );
}