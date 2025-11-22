"use client";

import React, { useEffect, useRef, useState } from "react";

export default function LogoutConfirmModal({ show, onConfirm, onCancel }) {
  const boxRef = useRef(null);
  const [shakeEffect, setShakeEffect] = useState(false);

  // Close attempt triggers shake
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
          Confirm Logout
        </h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to log out of your admin account?
        </p>

        <div className="flex justify-center gap-5">
          <button
            onClick={onCancel}
            className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
          >
            Logout
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