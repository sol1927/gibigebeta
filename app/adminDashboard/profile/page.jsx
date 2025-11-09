"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Navbar from "/app/components/Navbar";
import Footer from "/app/components/Footer";

export default function ProfilePage() {
  const router = useRouter();

  const [user] = useState({
    university: "Arba Minch University",
    email: "solomon@example.com",
    logo: "/logo.png",
  });

  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowFooter(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black/50 text-white flex flex-col relative">
      <Navbar />

      {/* Back button to Dashboard */}
      <button
        type="button"
        onClick={() => router.push("/adminDashboard")}
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
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div className="flex flex-col items-center pt-44 px-6 flex-grow w-full max-w-3xl mx-auto space-y-10 text-2xl">
        <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-gray-400 relative">
          <Image src={user.logo} alt="Logo" fill className="object-cover" />
        </div>

        <p>University: {user.university}</p>
        <p>Email: {user.email}</p>

        <button
          onClick={() => router.push("/adminDashboard/profile/edit")}
          className="bg-blue-500 hover:bg-blue-600 hover:cursor-pointer text-white mt-10 font-semibold py-4 px-8 rounded-lg text-xl"
        >
          Edit Profile
        </button>

        <div className="h-[200px]" />
      </div>

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
