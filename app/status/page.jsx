"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Status = () => {
  const router = useRouter();
  const [showFooter, setShowFooter] = useState(false);
  const [student, setStudent] = useState(null);

  // Load student data from localStorage
  useEffect(() => {
    const data = localStorage.getItem("scannedStudent");
    if (data) setStudent(JSON.parse(data));
    else router.push("/scan"); // redirect if no data
  }, [router]);

  // Show footer when scrolling
  useEffect(() => {
    const handleScroll = () => {
      setShowFooter(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!student) return null; // don't render before data loads

  return (
    <div className="bg-black/50 min-h-screen flex flex-col justify-between items-center text-white overflow-y-auto">
      {/* Navbar */}
      <Navbar />

      {/* Main Section */}
      <div className="flex flex-col items-center pt-32 px-8 w-full max-w-3xl flex-grow">
        {/* Title */}
        <h1 className="text-4xl font-bold mb-6 text-gray-200 text-center">
          Student Status
        </h1>

        {/* Student Photo */}
        <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-gray-400 mb-4 relative">
          <Image
            src={student.photo}
            alt={student.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Student Info */}
        <h2 className="text-2xl font-semibold mb-2">{student.name}</h2>
        <p className="text-lg text-gray-300 mb-1">
          Department: {student.department}
        </p>
        <p className="text-lg text-gray-300 mb-4">ID Number: {student.idNumber}</p>

        {/* Status Text */}
        <div className="mt-10 mb-12">
          <p
            className={`text-4xl font-bold ${
              student.status === "Allowed to Eat"
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {student.status}
          </p>
        </div>

        {/* Continue Button */}
        <button
          onClick={() => router.push("/scan")}
          className="bg-blue-500 hover:bg-blue-600 hover:cursor-pointer text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition"
        >
          Continue
        </button>

        <div className="h-[20vh]"></div>
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

export default Status;
