"use client";

import React, { useState, useEffect, useRef } from "react"; // ✅ added hooks

export default function LogoutConfirmModal({ visible, onConfirm, onCancel }) {
  if (!visible) return null;

  const [isShaking, setIsShaking] = useState(false);
  const modalRef = useRef(null);

  // ✅ Shake when clicking outside the modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Background overlay */}
      <div className="fixed inset-0 bg-black/30 z-50"></div>

      {/* Modal box */}
      <div className="fixed inset-0 flex items-center justify-center z-60 animate-fadeIn">
        <div
          ref={modalRef}
          className={`bg-white rounded-2xl shadow-2xl p-6 w-80 text-center transform transition-all ${
            isShaking ? "shake" : ""
          }`}
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Are you sure?
          </h2>
          <p className="text-gray-600 mb-6">
            Do you really want to log out of your admin account?
          </p>

          <div className="flex justify-center gap-4">
            <button
              onClick={onCancel}
              className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
            >
              Yes
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out forwards;
        }

        /* ✅ Shake animation */
        .shake {
          animation: shake 0.5s ease-in-out;
        }

        @keyframes shake {
          0% {
            transform: translateX(0) rotate(0deg) scale(1);
          }
          15% {
            transform: translateX(-5px) rotate(-2deg) scale(1.02);
          }
          30% {
            transform: translateX(5px) rotate(2deg) scale(1.02);
          }
          45% {
            transform: translateX(-5px) rotate(-2deg) scale(1.02);
          }
          60% {
            transform: translateX(5px) rotate(2deg) scale(1.02);
          }
          75% {
            transform: translateX(-3px) rotate(-1deg) scale(1.01);
          }
          90% {
            transform: translateX(3px) rotate(1deg) scale(1.01);
          }
          100% {
            transform: translateX(0) rotate(0deg) scale(1);
          }
        }
      `}</style>
    </>
  );
}
