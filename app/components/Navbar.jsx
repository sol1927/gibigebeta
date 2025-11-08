"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Navbar({ userType }) {
  const router = useRouter();

  // Handle profile navigation based on userType
  const handleProfileClick = () => {
    if (userType === "admin") {
      router.push("/profile"); // normal admin profile
    } else if (userType === "campus") {
      router.push("/campusesDashboard/profile"); // campus dashboard profile page
    }
  };

  return (
    <nav className="w-full bg-gray-800 text-white px-6 py-4 flex justify-between items-center fixed top-0 left-0 z-50">
      {/* Logo */}
      <div className="flex items-center">
        <Image src="/gibigebeta-logo.png" alt="Logo" width={40} height={40} />
        <span className="ml-2 text-xl font-bold hidden md:inline">MyApp</span>
      </div>

      {/* Profile Button */}
      <button
        onClick={handleProfileClick}
        className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg font-semibold transition"
      >
        Profile
      </button>
    </nav>
  );
}
