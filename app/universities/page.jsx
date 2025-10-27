"use client";

import React, { useState, useEffect, useRef } from "react";
import LoginBox from "../components/LoginBox";
import SignupBox from "../components/SignupBox";

const universities = [
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
];

export default function UniversitySelectionPage() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [selectedCampus, setSelectedCampus] = useState(null);
  const [showSignup, setShowSignup] = useState(false);
  const dropdownRef = useRef(null);

  const handleUniversityClick = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const handleCampusClick = (universityName, campusName, isAdmin = false) => {
    setSelectedCampus({ universityName, campusName, isAdmin });
    setShowLogin(true);
    setOpenDropdown(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300 p-6 relative">
      {/* Welcome Text */}
      <h1 className="text-4xl font-extrabold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-900 animate-fadeIn">
        Welcome to Gibigebeta
      </h1>
      <p className="text-center text-gray-700 mb-12 max-w-xl text-lg animate-fadeIn delay-200">
        Gibigebeta is a modern student cafeteria system that helps universities
        manage meal tracking efficiently, keeping records of students' meals
        across campuses.
      </p>

      {/* Universities List */}
      <div
        className="flex flex-wrap justify-center gap-8 mb-12"
        ref={dropdownRef}
      >
        {universities.map((uni) => (
          <div key={uni.id} className="flex flex-col items-center relative">
            <div
              onClick={() => handleUniversityClick(uni.id)}
              className="flex flex-col items-center cursor-pointer transform transition hover:scale-105"
            >
              <img
                src={uni.logo}
                alt={uni.name}
                className="w-24 h-24 hover:scale-110 rounded-full object-cover mb-2 shadow-2xl transition-transform duration-300"
              />
              <span className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors">
                {uni.name}
              </span>
            </div>

            {/* Dropdown for Admin + Campuses */}
            {openDropdown === uni.id && (
              <div className="absolute top-full mt-2 bg-white shadow-lg rounded-lg w-52 flex flex-col z-50 border border-gray-300 animate-fadeIn dropdown-shadow">
                <button
                  onClick={() => handleCampusClick(uni.name, "Admin", true)}
                  className="px-4 py-2 text-left hover:bg-blue-50 font-semibold text-blue-600 border-b border-gray-200 transition"
                >
                  🔑 Admin Login
                </button>

                {uni.campuses.map((campus) => (
                  <button
                    key={campus}
                    onClick={() => handleCampusClick(uni.name, campus, false)}
                    className="px-4 py-2 text-left hover:bg-blue-50 transition"
                  >
                    {campus}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add University Circle */}
      <div
        onClick={() => setShowSignup(true)}
        className={`w-16 h-16 rounded-full bg-gradient-to-r from-gray-900 to-purple-500
             flex items-center justify-center cursor-pointer shadow-2xl hover:scale-125
             transition-transform duration-300 hover:shadow-xl`}
      >
        <span className="text-white text-5xl font-bold relative -top-1">+</span>
      </div>

      <p className="mt-4 text-gray-700 font-medium animate-fadeIn delay-300">
        Add a new university
      </p>

      {/* Login Popup */}
      {showLogin && selectedCampus && (
        <>
          <div className="fixed inset-0 bg-black/20 z-40"></div>
          <div className="absolute top-6 right-6 z-50 animate-fadeIn">
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
          <div className="fixed inset-0 bg-black/20 z-40"></div>
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
            <SignupBox onClose={() => setShowSignup(false)} />
          </div>
        </>
      )}

      {/* Animations */}
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
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </div>
  );
}
