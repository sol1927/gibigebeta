"use client";

import React, { useState, useRef, useEffect } from "react";
import { Settings } from "lucide-react";
import LogoutConfirmModal from "./LogoutConfirmModal";

export default function Navbar2({
  searchQuery,
  setSearchQuery,
  mainAdminLoggedIn,
  setMainAdminLoggedIn,
  setMainAdminMode,
  setShowMainAdminLogin,
  setShow2FAModal,
  setShowPasswordModal,
}) {
  const [showSettings, setShowSettings] = useState(false);
  const settingsRef = useRef(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => setShowLogoutConfirm(true);

  // Close settings when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (settingsRef.current && !settingsRef.current.contains(e.target)) {
        setShowSettings(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-500 via-green-500 to-gray-500 shadow-md flex flex-wrap justify-between items-center px-4 py-3">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img
          src="/gibigebeta-logo.png"
          alt="Gibigebeta Logo"
          className="w-16 h-16 object-contain rounded-full shadow-lg transition-transform duration-500 hover:scale-110 cursor-pointer"
        />
        <span className="text-2xl font-extrabold text-white drop-shadow-sm">
          Gibigebeta
        </span>
      </div>

      {/* Search + Admin Buttons */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2 sm:mt-0">
        <input
          type="text"
          placeholder="Search universities..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-sm w-full sm:w-auto"
        />
        <button
          onClick={() => setSearchQuery("")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 py-2 rounded-lg shadow-md"
        >
          Clear
        </button>

        {mainAdminLoggedIn ? (
          <>
            {/* Settings dropdown */}
            <div ref={settingsRef} className="relative">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full shadow-lg transition-transform duration-300 hover:scale-110 ml-2 flex items-center justify-center"
                title="Settings"
              >
                <Settings className="w-5 h-5" />
              </button>

              {showSettings && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-xl flex flex-col overflow-hidden animate-fadeIn z-50">
                  <button
                    onClick={() => {
                      setShow2FAModal(true);
                      setShowSettings(false);
                    }}
                    className="px-4 py-3 text-left hover:bg-blue-200 text-gray-800 font-medium transition"
                  >
                    2FA Setup
                  </button>
                  <button
                    onClick={() => {
                      setShowPasswordModal(true);
                      setShowSettings(false);
                    }}
                    className="px-4 py-3 text-left hover:bg-blue-200 text-gray-800 font-medium transition"
                  >
                    Change Password
                  </button>
                </div>
              )}
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-full font-semibold shadow-md ml-2"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => setShowMainAdminLogin(true)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-3 py-2 rounded-full font-semibold shadow-md"
          >
            Main Admin Login
          </button>
        )}

        {/* Logout Modal */}
        <LogoutConfirmModal
          show={showLogoutConfirm}
          onCancel={() => setShowLogoutConfirm(false)}
          onConfirm={() => {
            setMainAdminLoggedIn(false);
            setMainAdminMode(false);
            localStorage.removeItem("mainAdminLoggedIn");
            localStorage.removeItem("mainAdminEmail");
            setShowLogoutConfirm(false);
          }}
        />
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
