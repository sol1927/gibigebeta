"use client";
import React, { useState, useEffect, useRef } from "react";

export default function ActionConfirmationModal({
  show,
  actionType, // "delete", "edit", "add", etc.
  adminPassword,
  onConfirm,
  onCancel,
  itemName,
  actionText, // optional: custom text for confirm button
}) {
  const [inputPassword, setInputPassword] = useState("");
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const modalRef = useRef();

  // Handle outside click shake
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setShake(true);
        setTimeout(() => setShake(false), 300); // faster shake
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!show) return null;

  const handleConfirm = () => {
    if (inputPassword === adminPassword) {
      onConfirm();
      setInputPassword("");
      setError("");
    } else {
      setError("Incorrect password");
      setTimeout(() => setError(""), 2000); // just show error, no shake
    }
  };

  // Determine button text
  const confirmButtonText =
    actionText ||
    (actionType === "delete"
      ? "Delete"
      : actionType === "edit"
      ? "Confirm Edit"
      : actionType === "add"
      ? "Add Campus"
      : "Confirm");

  const confirmButtonColor =
    actionType === "delete"
      ? "bg-red-600 hover:bg-red-700"
      : actionType === "edit"
      ? "bg-blue-600 hover:bg-blue-700"
      : actionType === "add"
      ? "bg-green-600 hover:bg-green-700"
      : "bg-gray-600 hover:bg-gray-700";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      <div
        ref={modalRef}
        className={`relative bg-white w-96 p-8 rounded-xl shadow-lg z-50 text-center text-black
          ${shake ? "animate-shake" : ""}
        `}
      >
        <h3 className="text-2xl font-semibold mb-2">
          {actionType === "delete"
            ? `Delete ${itemName}?`
            : actionType === "edit"
            ? `Edit ${itemName}?`
            : actionType === "add"
            ? `Add ${itemName}?`
            : `Confirm ${itemName}?`}
        </h3>

        <p className="text-gray-600 mb-4">
          Enter your admin password to confirm.
        </p>

        <div className="relative mb-2">
          <input
            type={showPassword ? "text" : "password"}
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
            placeholder="Admin Password"
            className="w-full border border-gray-300 rounded-lg p-3 pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

        <div className="flex justify-center gap-5 mt-4">
          <button
            onClick={() => {
              setInputPassword("");
              setError("");
              onCancel();
            }}
            className="px-5 py-2 rounded-lg border hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleConfirm}
            className={`px-5 py-2 rounded-lg text-white ${confirmButtonColor}`}
          >
            {confirmButtonText}
          </button>
        </div>
      </div>

      {/* Tailwind CSS shake animation */}
      <style jsx>{`
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          20%,
          60% {
            transform: translateX(-6px);
          }
          40%,
          80% {
            transform: translateX(6px);
          }
        }
        .animate-shake {
          animation: shake 0.3s;
        }
      `}</style>
    </div>
  );
}
