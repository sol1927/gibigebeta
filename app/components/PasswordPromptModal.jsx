"use client";

import React, { useEffect, useState } from "react";

export default function PasswordPromptModal({
  visible,
  passwordValue,
  onPasswordChange,
  onCancel,
  onConfirm,
  errorMessage,
}) {
  const [show, setShow] = useState(visible);

  // Sync visible prop
  useEffect(() => {
    if (visible) setShow(true);
    else {
      const timer = setTimeout(() => setShow(false), 250);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  // Clear password after 3s if error exists
  useEffect(() => {
    let timer;
    if (errorMessage) {
      timer = setTimeout(() => {
        onPasswordChange(""); // clear input
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [errorMessage, onPasswordChange]);

  if (!show) return null;

  return (
    <>
      <div className={`fixed inset-0 bg-black/20 z-50 transition-opacity ${visible ? "opacity-100" : "opacity-0"}`}></div>
      <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
        <div
          className={`bg-white rounded-xl shadow-xl p-6 w-80 flex flex-col gap-4 transition-transform duration-250 ${
            visible ? "animate-fadeInScale" : "animate-fadeOutScale"
          }`}
        >
          <h3 className="text-lg font-semibold text-gray-800">
            Enter Admin Password
          </h3>
          <input
            type="password"
            value={passwordValue}
            onChange={(e) => onPasswordChange(e.target.value)}
            placeholder="Admin password"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-sm"
          />
          {errorMessage && (
            <p className="text-red-600 text-sm font-medium">{errorMessage}</p>
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
        @keyframes fadeOutScale {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(0.95);
          }
        }
        .animate-fadeInScale {
          animation: fadeInScale 0.35s ease-out forwards;
        }
        .animate-fadeOutScale {
          animation: fadeOutScale 0.25s ease-in forwards;
        }
      `}</style>
    </>
  );
}
