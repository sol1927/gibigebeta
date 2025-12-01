"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Footer = () => {
  const router = useRouter();
  // State to control the visibility of the footer
  const [isVisible, setIsVisible] = useState(false);

  // Define the threshold (e.g., 100px from the bottom)
  const SHOW_THRESHOLD = 100;

  useEffect(() => {
    // Function to handle mouse movement
    const handleMouseMove = (event) => {
      // Check if the mouse is near the bottom of the viewport
      const nearBottom =
        window.innerHeight - event.clientY < SHOW_THRESHOLD;

      // Update visibility state
      setIsVisible(nearBottom);
    };

    // Attach the event listener to the entire window/document
    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup function: runs when the component unmounts
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []); // Empty dependency array ensures this runs only once

  const handleLogout = () => {
    // In a real application, you would perform logout logic here
    router.push("/"); // redirect to logout page
  };

  return (
    <footer
      // Fixed position at the bottom
      className={`fixed bottom-0 left-0 w-full bg-gray-800 text-white py-4 px-6 flex justify-between items-center z-40 transition-transform duration-300 ease-in-out
        ${
          // Use a transform class to move it off-screen (down) or into view
          isVisible ? "translate-y-0" : "translate-y-full"
        }
      `}
    >
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