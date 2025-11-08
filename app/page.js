"use client";

import React, { useState, useEffect, useRef } from "react";
import LoginBox from "./components/LoginBox";
import SignupBox from "./components/SignupBox";
import AdminLoginBox from "./components/AdminLoginBox";
import TwoFASetupBox from "./components/TwoFASetupBox";
import ChangePasswordBox from "./components/ChangePasswordBox";
import DeleteModal from "./components/DeleteModal";
import Navbar2 from "./components/Navbar2";
import PasswordPromptModal from "./components/PasswordPromptModal";

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

  const [searchQuery, setSearchQuery] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [selectedCampus, setSelectedCampus] = useState(null);
  const [showSignup, setShowSignup] = useState(false);
  const [mainAdminMode, setMainAdminMode] = useState(false);
  const [showMainAdminLogin, setShowMainAdminLogin] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const universityDropdownRef = useRef(null);
  const [dropdownDirection, setDropdownDirection] = useState({});
  const [mainAdminLoggedIn, setMainAdminLoggedIn] = useState(false);
  const [mainAdminPassword, setMainAdminPassword] = useState("g");
  const [mainAdminEmail, setMainAdminEmail] = useState("");
  const [mainAdminUsername, setMainAdminUsername] = useState("admin@gmail.com");
  const [deletePasswordInput, setDeletePasswordInput] = useState("");
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [deletePasswordError, setDeletePasswordError] = useState("");

  const handleUniversityClick = (id) => {
    const universityElement = document.getElementById(`uni-${id}`);
    if (universityElement) {
      const rect = universityElement.getBoundingClientRect();
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

  // const handleDeleteUniversity = (id, name) => {
  //   setDeleteTarget({ id, name });
  //   setShowDeleteModal(true);
  // };

  const confirmDelete = () => {
    setUniversities(universities.filter((u) => u.id !== deleteTarget.id));
    setShowDeleteModal(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const currentDropdown = document.getElementById(`uni-${openDropdown}`);
      if (currentDropdown && !currentDropdown.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdown]);

  useEffect(() => {
    const loggedIn = localStorage.getItem("mainAdminLoggedIn");
    const email = localStorage.getItem("mainAdminEmail");
    if (loggedIn === "true" && email) {
      setMainAdminLoggedIn(true);
      setMainAdminMode(true);
      setMainAdminEmail(email);
    }
  }, []);

  useEffect(() => {
    if (deletePasswordError) {
      const timer = setTimeout(() => {
        setDeletePasswordError(""); // clear error after 3 seconds
      }, 3000);

      return () => clearTimeout(timer); // cleanup if component unmounts or error changes
    }
  }, [deletePasswordError]);

  const sortedUniversities = [...universities].sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  const filteredUniversities = sortedUniversities.filter((uni) =>
    uni.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-200 via-blue-100 to-gray-200 p-6 pt-24 sm:pt-24 relative">
      <Navbar2
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        mainAdminLoggedIn={mainAdminLoggedIn}
        setMainAdminLoggedIn={setMainAdminLoggedIn}
        setMainAdminMode={setMainAdminMode}
        setShowMainAdminLogin={setShowMainAdminLogin}
        setShow2FAModal={setShow2FAModal} // ✅ add this
        setShowPasswordModal={setShowPasswordModal} // ✅ add this
      />

      <h1 className="text-4xl font-extrabold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-900 animate-fadeIn">
        Welcome to Gibigebeta
      </h1>

      <p className="text-center text-gray-700 mb-12 max-w-xl text-lg animate-fadeIn delay-200">
        Gibigebeta is a modern student cafeteria system that helps universities
        manage meal tracking efficiently across campuses.
      </p>

      <div
        className="flex flex-wrap justify-center gap-8 mb-12"
        ref={universityDropdownRef}
      >
        {filteredUniversities.length > 0 ? (
          filteredUniversities.map((uni) => (
            <div
              key={uni.id}
              id={`uni-${uni.id}`}
              className="flex flex-col items-center relative group"
            >
              <div
                onClick={() => handleUniversityClick(uni.id)}
                className="flex flex-col items-center cursor-pointer transform transition duration-300 hover:scale-105 relative"
              >
                <img
                  src={uni.logo}
                  alt={uni.name}
                  className="w-24 h-24 rounded-full object-cover mb-2 shadow-2xl transform transition-transform duration-500 ease-in-out hover:scale-150"
                />
                <span className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors truncate max-w-36">
                  {uni.name}
                </span>

                <div className="absolute -top-10 w-max max-w-xs bg-white text-gray-900 text-sm font-medium px-3 py-1 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-normal text-center z-50 pointer-events-none">
                  {uni.name}
                </div>
              </div>

              {openDropdown === uni.id && (
                <div
                  className={`absolute w-60 bg-white border border-gray-300 rounded-xl shadow-xl flex flex-col z-50 overflow-hidden animate-fadeIn dropdown-shadow ${
                    dropdownDirection[uni.id] === "up"
                      ? "bottom-full mb-3"
                      : "top-full mt-3"
                  }`}
                >
                  <button
                    onClick={() => handleCampusClick(uni.name, "Admin", true)}
                    className="flex items-center gap-2 px-5 py-3 text-left font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 transition transform hover:scale-105"
                  >
                    🔑 Admin Login
                  </button>

                  <div className="max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                    {uni.campuses.map((campus) => (
                      <button
                        key={campus}
                        onClick={() =>
                          handleCampusClick(uni.name, campus, false)
                        }
                        className="w-full text-left px-5 py-3 hover:bg-blue-50 transition flex items-center gap-2"
                      >
                        🏫 {campus}
                      </button>
                    ))}
                  </div>

                  {mainAdminMode && (
                    <button
                      onClick={() => {
                        setDeletePasswordInput(""); // clear previous input
                        setShowPasswordPrompt(true); // open password prompt
                        setOpenDropdown(null);
                        setDeleteTarget(uni); // store which university to delete
                      }}
                      className="px-5 py-3 text-left hover:bg-red-50 text-red-600 border-t border-gray-200 flex items-center gap-2 transition"
                    >
                      🗑 Delete University
                    </button>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-lg mt-8">
            ⚠️ No universities found matching {searchQuery}
          </p>
        )}
      </div>

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

      {(showLogin ||
        showSignup ||
        showMainAdminLogin ||
        show2FAModal ||
        showPasswordModal) && <div className="fixed inset-0 z-40"></div>}

      {showLogin && selectedCampus && (
        <>
          <div className="fixed inset-0 bg-black/20 z-50"></div>
          <div className="fixed top-20 right-6 z-50 animate-fadeIn">
            <LoginBox
              university={selectedCampus.universityName}
              campus={selectedCampus.campusName}
              isAdmin={selectedCampus.isAdmin}
              onClose={() => setShowLogin(false)}
            />
          </div>
        </>
      )}

      {showSignup && (
        <>
          <div className="fixed inset-0 bg-black/20 z-50"></div>
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 animate-fadeIn">
            <SignupBox onClose={() => setShowSignup(false)} />
          </div>
        </>
      )}

      {showMainAdminLogin && (
        <>
          <div className="fixed inset-0 bg-black/20 z-50"></div>
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
                localStorage.setItem("mainAdminLoggedIn", "true");
                localStorage.setItem("mainAdminEmail", email);
              }}
            />
          </div>
        </>
      )}

      <PasswordPromptModal
        visible={showPasswordPrompt}
        passwordValue={deletePasswordInput}
        onPasswordChange={setDeletePasswordInput}
        onCancel={() => setShowPasswordPrompt(false)}
        onConfirm={() => {
          if (deletePasswordInput === mainAdminPassword) {
            setShowDeleteModal(true);
            setShowPasswordPrompt(false);
            setDeletePasswordError("");
          } else {
            setDeletePasswordError("Incorrect password!");
          }
        }}
        errorMessage={deletePasswordError}
      />

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

      <DeleteModal
        visible={showDeleteModal}
        itemName={deleteTarget?.name}
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
      />

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
