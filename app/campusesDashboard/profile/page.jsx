"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function CampusProfilePage() {
  const router = useRouter();

  const [campus] = useState({
    name: "Main Campus",
    university: "Arba Minch University",
    location: "Arba Minch, Ethiopia",
    email: "maincampus@amu.edu.et",
    logo: "/logo.png",
  });

  const [showFooter, setShowFooter] = useState(false);

  // Handle footer visibility on scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowFooter(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black/50 text-white flex flex-col relative">
      {/* Navbar for campus */}
      <Navbar userType="campus" />

      {/* Back button to Campus Dashboard */}
      <button
        type="button"
        onClick={() => router.push("/campusesDashboard")}
        title="Back to Dashboard"
        className="fixed top-[90px] left-6 p-2 rounded-full hover:bg-green-700 transition z-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Profile Content */}
      <div className="flex flex-col items-center pt-44 px-6 flex-grow w-full max-w-3xl mx-auto space-y-10 text-2xl">
        {/* Campus Logo */}
        <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-gray-400 relative">
          <Image src={campus.logo} alt={campus.name} fill className="object-cover" />
        </div>

        {/* Campus Information */}
        <p><span className="font-semibold text-gray-300">University:</span> {campus.university}</p>
        <p><span className="font-semibold text-gray-300">Campus Name:</span> {campus.name}</p>
        <p><span className="font-semibold text-gray-300">Location:</span> {campus.location}</p>
        <p><span className="font-semibold text-gray-300">Email:</span> {campus.email}</p>

        {/* Edit Profile Button */}
        <button
          onClick={() => router.push("/campusesDashboard/profile/edit")}
          className="bg-green-500 hover:bg-green-600 hover:cursor-pointer text-white mt-10 font-semibold py-4 px-8 rounded-lg text-xl transition"
        >
          Edit Profile
        </button>

        <div className="h-[200px]" />
      </div>

      {/* Smooth sliding footer */}
      <div
        className={`fixed bottom-4 left-0 w-full transition-transform duration-300 ${
          showFooter ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <Footer />
      </div>
    </div>
  );
}
