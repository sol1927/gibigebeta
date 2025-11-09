"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const ScanPage = () => {
  const router = useRouter();
  const [iconIndex, setIconIndex] = useState(0);
  const [showFooter, setShowFooter] = useState(false);

  const icons = ["/eye.jpg", "/id.jpg", "/fingerprint.jpg"];

  // Cycle icons every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIconIndex((prev) => (prev + 1) % icons.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Scroll detection for footer
  useEffect(() => {
    const handleScroll = () => {
      setShowFooter(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Simulate scan success
  const handleScanSuccess = () => {
    const studentData = {
      name: "Solomon Aragaw",
      department: "Software Engineering",
      batch: "2022",
      photo: "/student-photo.jpg",
      status: "Allowed to Eat",
    };
    localStorage.setItem("scannedStudent", JSON.stringify(studentData));
    router.replace("/status");
  };

  const handleClearData = () => {
    localStorage.removeItem("scannedStudent");
    alert("All scan data has been cleared!");
  };

  return (
    <div className="bg-black/50 min-h-screen flex flex-col justify-between items-center text-white relative">
      <Navbar />

      {/* Back to Dashboard Button */}
      <button
        type="button"
        onClick={() => router.push("/campusesDashboard")}
        title="Back to Dashboard"
        className="fixed top-[90px] left-6 p-2 rounded-full hover:bg-blue-700 transition z-50"
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

      <div className="flex flex-col items-center pt-44 px-8 w-full max-w-3xl flex-grow">
        <h1 className="text-4xl font-bold mb-6 text-gray-200 text-center">
          Scan to Continue
        </h1>

        <div className="w-44 h-44 relative mb-6">
          <Image
            src={icons[iconIndex]}
            alt="Scan Icon"
            fill
            className="object-contain transition-opacity duration-700 ease-in-out"
          />
        </div>

        <p className="text-lg text-gray-300 mb-10 animate-pulse">
          Waiting for scan...
        </p>

        <p className="text-lg text-center text-gray-400 mb-8 max-w-md">
          Please scan your <span className="text-white">eye</span>,{" "}
          <span className="text-white">fingerprint</span>, or{" "}
          <span className="text-white">ID</span> to proceed.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <button
            onClick={handleScanSuccess}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition"
          >
            Simulate Scan Success
          </button>

          <button
            onClick={handleClearData}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition"
          >
            Clear Data
          </button>
        </div>
      </div>

      {/* Footer */}
      <div
        className={`fixed bottom-4 left-0 w-full transition-transform duration-300 ${
          showFooter ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <Footer />
      </div>
    </div>
  );
};

export default ScanPage;
