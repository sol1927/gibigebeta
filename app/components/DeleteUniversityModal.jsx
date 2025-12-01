"use client";
import React, { useEffect, useRef, useState } from "react";

export default function DeleteUniversityModal({
  show,
  adminPassword,
  onDelete,
  onCancel,
  itemName,
}) {
  const boxRef = useRef(null);
  const [shakeEffect, setShakeEffect] = useState(false);
  const [inputPassword, setInputPassword] = useState("");
  const [error, setError] = useState("");
  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Click outside triggers shake
  useEffect(() => {
    const clickOutside = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        setShakeEffect(true);
        setTimeout(() => setShakeEffect(false), 400);
      }
    };
    document.addEventListener("mousedown", clickOutside);
    return () => document.removeEventListener("mousedown", clickOutside);
  }, []);

  if (!show) return null;

  const handleDelete = () => {
    if (inputPassword === adminPassword) {
      onDelete();
      setInputPassword("");
      setError("");
    } else {
      setError("Incorrect password");
      // error disappears after 2 seconds
      setTimeout(() => setError(""), 2000);
    }
  };

  // Function to toggle password visibility state
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      {/* modal */}
      <div
        ref={boxRef}
        className={`relative bg-white w-96 p-8 rounded-xl shadow-lg z-50 text-center transition-transform duration-200 ${
          shakeEffect ? "animate-wiggle" : "scale-100"
        }`}
      >
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">
          Delete {itemName}?
        </h3>
        <p className="text-gray-600 mb-4">
          Enter your admin password to confirm deletion.
        </p>

        {/* Input container for password field and toggle button */}
        <div className="relative">
          <input
            // Change type based on showPassword state
            type={showPassword ? "text" : "password"}
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
            placeholder="Admin Password"
            // Adjusted padding to make room for the toggle button
            className="w-full border border-gray-300 rounded-lg p-3 pr-10 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* Toggle button */}
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-0 top-0 mt-3 mr-3 text-gray-500 hover:text-gray-700"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {/* Simple eye icon using text, replace with SVG/Icon library for better visuals */}
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {error && <p className="text-red-600 mb-2 text-sm">{error}</p>}

        <div className="flex justify-center gap-5 mt-4">
          <button
            onClick={() => {
              setInputPassword("");
              setError("");
              onCancel();
            }}
            className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>

      {/* wiggle animation */}
      <style jsx>{`
        @keyframes wiggle {
          0% {
            transform: translateX(0);
          }
          15% {
            transform: translateX(-6px);
          }
          30% {
            transform: translateX(6px);
          }
          45% {
            transform: translateX(-4px);
          }
          60% {
            transform: translateX(4px);
          }
          75% {
            transform: translateX(-2px);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-wiggle {
          animation: wiggle 0.4s ease-in-out;
        }
      `}</style>
    </div>
  );
}
