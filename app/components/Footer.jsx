"use client";

import React from "react";
import { useRouter } from "next/navigation";

const Footer = () => {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/universities"); // redirect to logout page
  };

  return (
    <footer className="w-full bg-gray-800 text-white py-4 px-6 flex justify-between items-center rounded-t-lg">
      {/* Left side: Rights text */}
      <p className="text-sm text-gray-300">
        © 2025 Scan System. All rights reserved.
      </p>

      {/* Right side: Logout button */}
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-semibold transition"
      >
        Logout
      </button>
    </footer>
  );
};

export default Footer;
