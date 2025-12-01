"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ConfirmClearModal from "../../components/ConfirmClearModal";

// Define the data payloads for clarity and control
const allowedStudentData = {
  name: "Solomon Aragaw",
  department: "Software Engineering",
  batch: "2022",
  photo: "/student-photo.jpg",
  status: "Allowed to Eat",
  idNumber: "SE-2022-001",
};

const unregisteredStudentData = {
  name: "Unregistered User",
  department: "N/A",
  batch: "N/A",
  photo: "/unregistered-photo.jpg",
  status: "Not Allowed to Eat",
  idNumber: "UNKNOWN",
};

// --- ScanStatusPage Component ---
const ScanStatusPage = () => {
  const router = useRouter();
  const [iconIndex, setIconIndex] = useState(0);
  const [showFooter, setShowFooter] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  // 🆕 STATE FOR SHAKE ANIMATION
  const [shakeClass, setShakeClass] = useState("");
  const [scannedCount, setScannedCount] = useState(0);
  const [student, setStudent] = useState(null);

  const icons = ["/eye.jpg", "/id.jpg", "/fingerprint.jpg"];

  // 1. Initial Load Effects
  useEffect(() => {
    const count = localStorage.getItem("scannedCount");
    if (count) {
      setScannedCount(parseInt(count, 10));
    }
    const studentData = localStorage.getItem("scannedStudent");
    if (studentData) {
      setStudent(JSON.parse(studentData));
    }
  }, []);

  // 2. Icon Cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setIconIndex((prev) => (prev + 1) % icons.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // 3. Scroll Detection for Footer
  useEffect(() => {
    const handleScroll = () => setShowFooter(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- Handlers ---

  // Unified simulation handler now accepts data and success flag
  const handleScanSimulation = (scanData, isSuccess) => {
    // 1. Update Student Status in state and localStorage
    setStudent(scanData);
    localStorage.setItem("scannedStudent", JSON.stringify(scanData));

    // 2. Only increment the counter if it was a successful, registered scan
    if (isSuccess) {
      const newCount = scannedCount + 1;
      setScannedCount(newCount);
      localStorage.setItem("scannedCount", newCount.toString());
    }
  };

  // 1. Show the confirmation modal
  const confirmClear = () => {
    setShowConfirmModal(true);
    setShakeClass(""); // Clear shake class when opening
  };

  // 2. Execute the clear action
  const clearConfirmed = () => {
    // Clear data from state and localStorage
    localStorage.removeItem("scannedStudent");
    localStorage.removeItem("scannedCount");
    setStudent(null);
    setScannedCount(0);
    setShowConfirmModal(false);

    // Show confirmation message
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };

  // 🆕 HANDLER FOR OUTSIDE CLICK
  const handleOutsideClick = () => {
    // 1. Trigger the shake animation
    setShakeClass("animate-shake");

    // 2. Remove the shake class after the animation duration (0.5s)
    const timeout = setTimeout(() => {
      setShakeClass("");
    }, 500);

    // 3. Cleanup
    return () => clearTimeout(timeout);
  };

  // --- Sub-Component: Status Display ---
  const StatusDisplay = ({ student }) => {
    if (!student) {
      return (
        <div className="flex flex-col items-center justify-center h-full p-6 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-16 h-16 text-gray-500 mb-4 animate-bounce"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.125 3.75A1.5 1.5 0 0 1 11.5 2.25h1.75a.75.75 0 0 0 .75-.75V1a.75.75 0 0 1 1.5 0v.5a.75.75 0 0 0 .75.75h1.75a1.5 1.5 0 0 1 1.5 1.5v16.5a1.5 1.5 0 0 1-1.5 1.5h-1.75a.75.75 0 0 0-.75.75v.5a.75.75 0 0 1-1.5 0v-.5a.75.75 0 0 0-.75-.75h-1.75a1.5 1.5 0 0 1-1.5-1.5V3.75z"
            />
          </svg>
          <h2 className="text-2xl font-bold text-gray-400">
            Waiting for Scan...
          </h2>
          <p className="text-gray-500 mt-2">
            Status will appear instantly after simulation.
          </p>
        </div>
      );
    }

    // Logic for styling based on status
    const isAllowed = student.status === "Allowed to Eat";
    const statusColor = isAllowed ? "text-green-400" : "text-red-500";
    const borderColor = isAllowed ? "border-green-500" : "border-red-500";

    // Check if the photo is a generic placeholder/unavailable
    const isPlaceholderPhoto = student.photo.includes("unregistered-photo");

    return (
      <div className="flex flex-col items-center pt-2 px-6 w-full h-full">
        <h1 className="text-3xl font-bold mb-8 text-gray-200 text-center border-b border-gray-700 pb-2 w-full">
          Scan Result
        </h1>
        {/* Student Photo Container */}
        <div
          className={`w-40 h-40 rounded-full overflow-hidden border-4 ${borderColor} mb-4 relative shadow-2xl`}
        >
          {isPlaceholderPhoto ? (
            // Fallback content: Centered Text for unknown users
            <div className="w-full h-full flex items-center justify-center bg-gray-700 p-2">
              <span className="text-center text-sm font-semibold text-red-300">
                {student.name} Photo Unavailable
              </span>
            </div>
          ) : (
            // Actual Image
            <Image
              src={student.photo}
              alt={student.name}
              fill
              className="object-cover"
            />
          )}
        </div>

        {/* Student Info */}
        <h2 className="text-3xl font-extrabold mb-1">{student.name}</h2>
        <p className="text-lg text-gray-300 mb-1">
          Department: **{student.department}**
        </p>

        {/* ID Number */}
        <p className="text-lg text-gray-300 mb-1">
          ID Number: **{student.idNumber}**
        </p>

        <p className="text-lg text-gray-300 mb-4">Batch: **{student.batch}**</p>

        {/* Status Text with bloom animation */}
        <div className="mt-6">
          <p className={`text-5xl font-black animate-bloom ${statusColor}`}>
            {student.status}
          </p>
        </div>
      </div>
    );
  };

  // --- Main Render ---
  return (
    <div className="bg-black/50 min-h-screen flex flex-col justify-between items-center text-white overflow-y-auto">
      <Navbar />

      {/* Confirmation Modal - 🆕 PASSING PROPS */}
      <ConfirmClearModal
        show={showConfirmModal}
        onConfirm={clearConfirmed}
        onCancel={() => setShowConfirmModal(false)}
        shakeClass={shakeClass} // 🆕 PASSING SHAKE CLASS
        onOutsideClick={handleOutsideClick} // 🆕 PASSING OUTSIDE CLICK HANDLER
      />

      {/* FIXED HEADER ELEMENTS */}
      {/* Back Button */}
      <button
        onClick={() => router.push("/campusesDashboard")}
        title="Back to Dashboard"
        className="fixed top-[90px] left-6 p-2 rounded-full bg-black/50 hover:bg-blue-700 transition z-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Scanned Students Counter & Clear Data Button */}
      <div className="fixed top-[90px] right-6 p-2 md:p-3 bg-blue-900/80 rounded-lg shadow-xl z-50 flex items-center space-x-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-green-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clipRule="evenodd"
          />
        </svg>
        <span className="text-sm md:text-base font-semibold text-white">
          Scanned Today:
        </span>
        <span className="text-lg md:text-xl font-bold text-green-400">
          {scannedCount}
        </span>
        <button
          onClick={confirmClear}
          className="bg-red-600 hover:bg-red-500 shadow-lg shadow-red-700/50 hover:shadow-red-400/70 text-white font-semibold py-3 px-8 rounded-xl transition-all transform hover:scale-105 mt-4 sm:mt-0"
        >
          Clear Data
        </button>
      </div>

      {/* MAIN CONTENT: SPLIT SCREEN LAYOUT (STATUS LEFT, SCAN RIGHT) */}
      <div className="w-full max-w-7xl flex-grow pt-28 pb-10 px-4 flex flex-col md:flex-row gap-8">
        {/* LEFT SIDE: STATUS AREA */}
        <div className="md:w-1/2 flex flex-col items-center justify-start p-6 bg-black/50 rounded-xl shadow-2xl">
          <StatusDisplay student={student} />
        </div>

        {/* RIGHT SIDE: SCAN AREA / CONTROLS */}
        <div className="md:w-1/2 flex flex-col items-center justify-center p-6 bg-black/30 rounded-xl shadow-2xl min-h-[70vh]">
          <h1 className="text-5xl font-bold mb-8 text-gray-200 text-center animate-breath">
            Scan to Continue
          </h1>

          <div className="w-52 h-52 relative mb-8 animate-float">
            <Image
              src={icons[iconIndex]}
              alt="Scan Icon"
              fill
              className="object-contain drop-shadow-lg transition-transform duration-700 ease-in-out"
            />
          </div>

          <p className="text-center text-gray-400 mb-10 max-w-md animate-pulseText delay-200">
            Please scan your{" "}
            <span className="text-white font-semibold">eye</span>,{" "}
            <span className="text-white font-semibold">fingerprint</span>, or{" "}
            <span className="text-white font-semibold">ID</span> to proceed.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 flex-wrap justify-center">
            {/* BUTTON 1: GUARANTEED REGISTERED */}
            <button
              onClick={() => handleScanSimulation(allowedStudentData, true)}
              className="bg-green-600 hover:bg-green-500 shadow-lg shadow-green-700/50 hover:shadow-green-400/70 text-white font-semibold py-3 px-6 rounded-xl transition-all transform hover:scale-105"
            >
              Simulate Registered Scan
            </button>

            {/* BUTTON 2: GUARANTEED UNREGISTERED */}
            <button
              onClick={() =>
                handleScanSimulation(unregisteredStudentData, false)
              }
              className="bg-orange-600 hover:bg-orange-500 shadow-lg shadow-orange-700/50 hover:shadow-orange-400/70 text-white font-semibold py-3 px-6 rounded-xl transition-all transform hover:scale-105"
            >
              Simulate Unregistered Scan
            </button>
          </div>
        </div>
      </div>

      {/* Full-screen clear data message */}
      {showMessage && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-50 pointer-events-none bg-black/40">
          <p className="text-green-400 text-6xl sm:text-8xl md:text-9xl font-bold animate-bloom">
            Data cleared!
          </p>
        </div>
      )}

      {/* Footer */}
      <div
        className={`fixed bottom-4 left-0 w-full transition-transform duration-300 ${
          showFooter ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <Footer />
      </div>

      {/* Global Animations (Excluding modal-specific ones) */}
      <style jsx>{`
        @keyframes bloom {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.3);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        @keyframes pulseText {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.7;
          }
          50% {
            transform: scale(1.05);
            opacity: 1;
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes breath {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.03);
          }
        }

        .animate-bloom {
          animation: bloom 1s ease-out forwards;
        }
        .animate-pulseText {
          animation: pulseText 1.5s ease-in-out infinite;
        }
        .animate-pulseText.delay-200 {
          animation-delay: 0.2s;
        }
        .animate-float {
          animation: float 2s ease-in-out infinite;
        }
        .animate-breath {
          animation: breath 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

// Export the new combined component
export default ScanStatusPage;
