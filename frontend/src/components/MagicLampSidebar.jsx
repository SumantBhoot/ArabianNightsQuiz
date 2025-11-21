import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import lampImage from "../assets/magic_lamp.webp";
import { Leaderboard } from "./Leaderboard";

export function MagicLampSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const toggle = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <div
        className={`fixed top-0 right-0 h-full z-50 flex transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Lamp Button - Always visible (sticking out) */}
        <button
          onClick={toggle}
          className={`absolute cursor-pointer left-0 -translate-x-full top-6 p-2 transition-all duration-500 group focus:outline-none ${isOpen ? "top-[85%]" : ""}`}
          aria-label="Toggle Menu"
        >
          <img
            src={lampImage}
            alt="Magic Lamp"
            className={`w-24 h-auto drop-shadow-[0_0_15px_rgba(217,164,65,0.6)] transition-transform duration-500 ${
              isOpen ? "scale-110 rotate-12" : "group-hover:scale-110 group-hover:-rotate-12"
            }`}
          />
          {/* Glow effect behind lamp */}
          <div className="absolute inset-0 bg-gold/30 blur-2xl rounded-full -z-10 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
        </button>

        {/* Sidebar Content */}
        <div className="w-80 md:max-w-[80vw] h-full bg-amber-100/30 backdrop-sepia backdrop-blur-xl shadow-blur-spread flex flex-col p-8 text-center relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-full h-full bg-linear-to-b from-gold/10 to-transparent pointer-events-none" />
          
          <div className="relative z-10 flex flex-col h-full items-center">
            <div className="mb-12 w-full">
              <h2 className="text-midnight font-display text-2xl mb-4 opacity-90 tracking-wider">Welcome, Traveler</h2>
              <div className="text-5xl font-display text-desert-sand text-glow font-bold wrap-break-word leading-relaxed">
                {user?.username || "Guest"}
              </div>
              <div className="h-px w-2/3 bg-linear-to-r from-transparent via-gold/60 to-transparent mx-auto mt-8" />
            </div>

            <div className="flex flex-col gap-4 w-full mt-4">
              <button
                onClick={() => { setShowLeaderboard(true); setIsOpen(false); }}
                className="w-full py-2 px-6 bg-gold text-2xl text-midnight font-display  rounded-xl font-bold text-shadow-lg border-2 border-gold shadow-[0_0_12px_rgba(217,164,65,0.6)] hover:shadow-[0_0_18px_rgba(217,164,65,0.9)] hover:scale-105 active:scale-95 transition-all"
              >
                Hall of Fame
              </button>
            </div>

            <div className="mt-auto mb-10 w-full">
              <button
                onClick={handleLogout}
                className="w-full py-4 px-6 bg-red-700/70 border border-red-500/40 rounded-xl text-red-100 font-display text-xl hover:bg-red-700/80 hover:scale-105 hover:border-red-400 transition-all shadow-lg group backdrop-blur-sm"
              >
                <span className="group-hover:text-glow transition-all">Logout</span>
              </button>
            </div>
            
            <div className="text-gold/80 font-display italic">
              "May your path be guided by the stars."
            </div>
          </div>
        </div>
      </div>

      {showLeaderboard && <Leaderboard onClose={() => setShowLeaderboard(false)} />}
    </>
  );
}
