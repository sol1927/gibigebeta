"use client";
import React, { useState, useEffect, useRef } from "react";
import LoginBox from "../components/LoginBox";
import SignupBox from "../components/SignupBox";
import AdminLoginBox from "../components/AdminLoginBox";
import TwoFASetupBox from "../components/TwoFASetupBox";
import ChangePasswordBox from "../components/ChangePasswordBox";

export default function UniversitySelectionPage() {
  const [universities, setUniversities] = useState([
    {
      id: 1,
      name: "Arba Minch University",
      logo: "/amu-logo.png",
      campuses: ["Main Campus", "Engineering Campus", "Medical Campus"],
    },
    {
      id: 2,
      name: "Addis Ababa University",
      logo: "/aau-logo.png",
      campuses: ["Main Campus", "Science Campus", "Business Campus"],
    },
    {
      id: 3,
      name: "Haramaya University",
      logo: "/haramaya-logo.png",
      campuses: ["Main Campus", "Agriculture Campus", "Engineering Campus"],
    },
    {
      id: 4,
      name: "Mekelle University",
      logo: "/mekelle-logo.png",
      campuses: ["Main Campus", "Health Sciences Campus", "Technology Campus"],
    },
    {
      id: 5,
      name: "Bahir Dar University",
      logo: "/bahirdar-logo.jpg",
      campuses: ["Main Campus", "Engineering Campus", "Business Campus"],
    },
    {
      id: 6,
      name: "Jimma University",
      logo: "/jimma-logo.png",
      campuses: ["Main Campus", "Medical Campus", "Technology Campus"],
    },
    {
      id: 7,
      name: "Adama Science & Technology University",
      logo: "/adama-logo.png",
      campuses: ["Main Campus", "Engineering Campus"],
    },
    {
      id: 8,
      name: "Dire Dawa University",
      logo: "/dd-logo.jpg",
      campuses: ["Main Campus", "Business Campus"],
    },
    {
      id: 9,
      name: "Gondar University",
      logo: "/gondar-logo.jpg",
      campuses: ["Main Campus", "Medical Campus", "Engineering Campus"],
    },
    {
      id: 10,
      name: "Hawassa University",
      logo: "/hawassa-logo.jpg",
      campuses: ["Main Campus", "Science Campus", "Agriculture Campus"],
    },
  ]);

  const [searchQuery, setSearchQuery] = useState(""); // added search

  const [openDropdown, setOpenDropdown] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [selectedCampus, setSelectedCampus] = useState(null);
  const [showSignup, setShowSignup] = useState(false);
  const [mainAdminMode, setMainAdminMode] = useState(false);
  const [showMainAdminLogin, setShowMainAdminLogin] = useState(false);
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const dropdownRef = useRef(null);
  const settingsDropdownRef = useRef(null);
  const universityDropdownRef = useRef(null);
  const [dropdownDirection, setDropdownDirection] = useState({});

  const [mainAdminLoggedIn, setMainAdminLoggedIn] = useState(false);
  const [mainAdminPassword, setMainAdminPassword] = useState("g");
  const [mainAdminEmail, setMainAdminEmail] = useState("");
  const [mainAdminUsername, setMainAdminUsername] = useState("admin@gmail.com");

  const handleUniversityClick = (id) => {
    const universityElement = document.getElementById(`uni-${id}`);
    if (universityElement) {
      const rect = universityElement.getBoundingClientRect();
      // Check if there is enough space below (300px threshold)
      const openUpwards = window.innerHeight - rect.bottom < 300;
      setDropdownDirection((prev) => ({
        ...prev,
        [id]: openUpwards ? "up" : "down",
      }));
    }
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const handleCampusClick = (universityName, campusName, isAdmin = false) => {
    setSelectedCampus({ universityName, campusName, isAdmin });
    setShowLogin(true);
    setOpenDropdown(null);
  };

  const handleDeleteUniversity = (id) => {
    setUniversities(universities.filter((u) => u.id !== id));
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close dropdown if click is outside the currently open dropdown
      const currentDropdown = document.getElementById(`uni-${openDropdown}`);
      if (currentDropdown && !currentDropdown.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdown]);

  // ✅ Sort alphabetically before displaying
  const sortedUniversities = [...universities].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  // ✅ Filter universities based on search query
  const filteredUniversities = sortedUniversities.filter((uni) =>
    uni.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300 p-6 pt-24 sm:pt-40 relative">
      {/* Top-right Main Admin Buttons + Search */}
      <div
        className="fixed top-4 right-6 flex flex-col items-end gap-2 z-50"
        ref={settingsDropdownRef}
      >
        {/* 🔍 Search Bar - Sticky and Attractive */}
        <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md shadow-md p-4 rounded-b-xl mb-4">
          <div className="flex items-center space-x-3">
            <input
              type="text"
              placeholder="Search universities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 rounded-lg px-4 py-2 text-gray-700 shadow-sm transition-all duration-200"
            />
            <button
              onClick={() => setSearchQuery("")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition-transform hover:scale-105"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Admin Buttons */}
        <div className="flex gap-2">
          {mainAdminLoggedIn && (
            <div className="relative">
              <button
                onClick={() => setShowSettingsDropdown((prev) => !prev)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-full font-semibold shadow-md hover:scale-105 transition-transform"
              >
                Settings ⚙️
              </button>

              {/* Settings Dropdown */}
              {showSettingsDropdown && (
                <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-300 rounded-xl shadow-2xl z-50 flex flex-col overflow-hidden animate-fadeIn">
                  <button
                    className="flex items-center gap-2 px-4 py-3 text-left font-semibold text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition transform hover:scale-105"
                    onClick={() => {
                      setShowSettingsDropdown(false);
                      setShowPasswordModal(true);
                    }}
                  >
                    🔒 Change Password
                  </button>
                  <button
                    className="flex items-center gap-2 px-4 py-3 text-left font-semibold text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition transform hover:scale-105"
                    onClick={() => {
                      setShowSettingsDropdown(false);
                      setShow2FAModal(true);
                    }}
                  >
                    🛡️ Setup 2FA
                  </button>
                </div>
              )}
            </div>
          )}

          {mainAdminLoggedIn ? (
            <button
              onClick={() => {
                setMainAdminLoggedIn(false);
                setMainAdminMode(false);
              }}
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-full font-semibold shadow-md hover:scale-105 transition-transform"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => setShowMainAdminLogin(true)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-5 py-2 rounded-full font-semibold shadow-md hover:scale-105 transition-transform"
            >
              Main Admin Login
            </button>
          )}
        </div>
      </div>

      {/* Title */}
      <h1 className="text-4xl font-extrabold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-900 animate-fadeIn">
        Welcome to Gibigebeta
      </h1>

      <p className="text-center text-gray-700 mb-12 max-w-xl text-lg animate-fadeIn delay-200">
        Gibigebeta is a modern student cafeteria system that helps universities
        manage meal tracking efficiently across campuses.
      </p>

      {/* Universities */}
      <div
        className="flex flex-wrap justify-center gap-8 mb-12"
        ref={universityDropdownRef}
      >
        {filteredUniversities.map((uni) => (
          <div
            id={`uni-${uni.id}`} // <-- add this line
            key={uni.id}
            className="flex flex-col items-center relative group"
          >
            <div
              onClick={() => handleUniversityClick(uni.id)}
              className="flex flex-col items-center cursor-pointer transform transition duration-300 hover:scale-105"
            >
              <img
                src={uni.logo}
                alt={uni.name}
                className="w-24 h-24 rounded-full object-cover mb-2 shadow-2xl transition-shadow duration-300"
              />
              <span className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors">
                {uni.name}
              </span>
            </div>

            {/* Smart Dropdown (opens up if near bottom) */}
            {openDropdown === uni.id && (
              <div
                className={`absolute w-60 bg-white border border-gray-300 rounded-xl shadow-xl flex flex-col z-50 overflow-hidden animate-fadeIn dropdown-shadow
      ${
        dropdownDirection[uni.id] === "up"
          ? "bottom-full mb-3"
          : "top-full mt-3"
      }
    `}
              >
                <button
                  onClick={() => handleCampusClick(uni.name, "Admin", true)}
                  className="flex items-center gap-2 px-5 py-3 text-left font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 transition transform hover:scale-105"
                >
                  🔑 Admin Login
                </button>
                {/* Scrollable campuses list */}
                <div className="max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                  {uni.campuses.map((campus) => (
                    <button
                      key={campus}
                      onClick={() => handleCampusClick(uni.name, campus, false)}
                      className="w-full text-left px-5 py-3 hover:bg-blue-50 transition flex items-center gap-2"
                    >
                      🏫 {campus}
                    </button>
                  ))}
                </div>

                {mainAdminMode && (
                  <button
                    onClick={() => handleDeleteUniversity(uni.id)}
                    className="px-5 py-3 text-left hover:bg-red-50 text-red-600 border-t border-gray-200 flex items-center gap-2 transition"
                  >
                    🗑 Delete University
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ➕ Add University */}
      {mainAdminMode && (
        <>
          <div
            onClick={() => setShowSignup(true)}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-gray-900 to-purple-500 flex items-center justify-center cursor-pointer shadow-2xl hover:scale-125 transition-transform duration-300 hover:shadow-xl"
          >
            <span className="text-white text-5xl font-bold relative -top-1">
              +
            </span>
          </div>
          <p className="mt-4 text-gray-700 font-medium animate-fadeIn delay-300">
            Add a new university
          </p>
        </>
      )}

      {/* Overlay for clicking outside */}
      {(showLogin ||
        showSignup ||
        showMainAdminLogin ||
        show2FAModal ||
        showPasswordModal) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowLogin(false);
            setShowSignup(false);
            setShowMainAdminLogin(false);
            setShow2FAModal(false);
            setShowPasswordModal(false);
          }}
        ></div>
      )}

      {/* Login Modal */}
      {showLogin && selectedCampus && (
        <div className="fixed top-20 right-6 z-50 animate-fadeIn">
          <LoginBox
            university={selectedCampus.universityName}
            campus={selectedCampus.campusName}
            isAdmin={selectedCampus.isAdmin}
            onClose={() => setShowLogin(false)}
          />
        </div>
      )}

      {/* Signup Modal */}
      {showSignup && (
        <>
          <div className="fixed inset-0 bg-black/20 z-50"></div>
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 animate-fadeIn">
            <SignupBox onClose={() => setShowSignup(false)} />
          </div>
        </>
      )}

      {/* Main Admin Login */}
      {showMainAdminLogin && (
        <div className="fixed top-20 right-6 z-50 animate-fadeIn">
          <AdminLoginBox
            onClose={() => setShowMainAdminLogin(false)}
            credentials={{
              username: mainAdminUsername,
              password: mainAdminPassword,
            }}
            onLoginSuccess={(email) => {
              setMainAdminMode(true);
              setMainAdminLoggedIn(true);
              setMainAdminEmail(email);
              setShowMainAdminLogin(false);
            }}
          />
        </div>
      )}

      {/* 2FA Setup Modal */}
      {show2FAModal && (
        <>
          <div className="fixed inset-0 bg-black/20 z-50"></div>
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 animate-fadeIn">
            <TwoFASetupBox
              onClose={() => setShow2FAModal(false)}
              email={mainAdminEmail}
              onUpdate={(newEmail) => setMainAdminEmail(newEmail)}
            />
          </div>
        </>
      )}

      {showPasswordModal && (
        <>
          <div className="fixed inset-0 bg-black/20 z-50"></div>
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 animate-fadeIn">
            <ChangePasswordBox
              currentRealPassword={mainAdminPassword}
              onClose={() => setShowPasswordModal(false)}
              onUpdate={(newPassword) => setMainAdminPassword(newPassword)}
            />
          </div>
        </>
      )}

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
          animation: fadeIn 0.5s ease-out forwards;
        }
        .animate-fadeIn.delay-200 {
          animation-delay: 0.2s;
        }
        .animate-fadeIn.delay-300 {
          animation-delay: 0.3s;
        }
        .dropdown-shadow {
          box-shadow: 0 12px 25px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
}
