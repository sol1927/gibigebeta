"use client";

import React, { useEffect, useState, useRef } from "react";

export default function PasswordPromptModalV3({
  visible,
  passwordValue,
  onPasswordChange,
  onCancel,
  onConfirm,
  errorMessage,
}) {
  const [show, setShow] = useState(visible);
  const [shakeKey, setShakeKey] = useState(0); // for retriggering shake
  const [showPassword, setShowPassword] = useState(false); // toggle password visibility
  const modalRef = useRef(null);

  // Sync visible
  useEffect(() => {
    if (visible) setShow(true);
    else {
      const timer = setTimeout(() => setShow(false), 250);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  // Clear password on error
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => onPasswordChange(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage, onPasswordChange]);

  // Trigger shake on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setShakeKey((prev) => prev + 1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!show) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/25 z-50 transition-opacity ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      ></div>

      {/* Modal */}
      <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
        <div
          key={shakeKey} // retrigger shake
          ref={modalRef}
          className="bg-white rounded-2xl shadow-xl p-6 w-80 flex flex-col gap-4 transition-transform duration-200 animate-fadeInScale shake"
        >
          <h3 className="text-lg font-semibold text-gray-800 text-center">
            Enter Admin Password
          </h3>

          {/* Input with show/hide toggle */}
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              value={passwordValue}
              onChange={(e) => onPasswordChange(e.target.value)}
              placeholder="Admin password"
              className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-3 flex items-center justify-center text-gray-500 hover:text-gray-700"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {errorMessage && (
            <p className="text-red-600 text-sm font-medium text-center">
              {errorMessage}
            </p>
          )}

          <div className="flex justify-end gap-2">
            <button
              onClick={onCancel}
              className="px-4 py-2 rounded-lg border hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeInScale {
          animation: fadeInScale 0.35s ease-out forwards;
        }

        /* Shake animation */
        .shake {
          animation: shake 0.5s ease-in-out forwards;
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
