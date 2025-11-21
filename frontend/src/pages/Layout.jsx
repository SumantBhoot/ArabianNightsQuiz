import { Outlet } from "react-router-dom";
import { MagicLampSidebar } from "../components/MagicLampSidebar";

export default function Layout() {
    return (
        <div className="min-h-screen flex flex-col">
            <MagicLampSidebar />
            <header className="p-4 md:pt-12 md:text-center">
                <h1 className="text-7xl md:text-8xl font-bold font-arabic drop-shadow-[0_0_30px_rgba(251,191,36,0.8)]">Arabian <br className="md:hidden" /> Nights<br className="md:hidden" /> Quiz</h1>
            </header>
            <main className="flex justify-center items-center grow p-4">
                <Outlet />
            </main>
            <footer className="text-lg p-4 text-right">
                <p>&copy; 2025 Arabian Nights Quiz</p>
            </footer>
        </div>
    );
}
