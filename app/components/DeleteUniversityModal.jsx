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
      // No shake effect here
      setTimeout(() => setError(""), 2000); // error disappears after 3s
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      {/* modal box */}
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

        <input
          type="password"
          value={inputPassword}
          onChange={(e) => setInputPassword(e.target.value)}
          placeholder="Admin Password"
          className="w-full border border-gray-300 rounded-lg p-3 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

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

      {/* animations */}
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
            transform: translateX(-6px);
          }
          60% {
            transform: translateX(6px);
          }
          75% {
            transform: translateX(-3px);
          }
          90% {
            transform: translateX(3px);
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
