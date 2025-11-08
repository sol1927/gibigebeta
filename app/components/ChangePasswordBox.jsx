"use client";
import React, { useState, useEffect, useRef } from "react";

export default function ChangePasswordBox({
  onClose,
  onUpdate,
  currentRealPassword,
}) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const boxRef = useRef(null);

  const handleUpdate = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setStatus("❌ All fields are required.");
      setIsSuccess(false);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }

    if (currentPassword !== currentRealPassword) {
      setStatus("❌ Current password is incorrect.");
      setIsSuccess(false);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }

    if (newPassword === currentRealPassword) {
      setStatus("❌ New password must differ");
      setIsSuccess(false);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }

    if (newPassword !== confirmPassword) {
      setStatus("❌ New passwords do not match.");
      setIsSuccess(false);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }

    onUpdate(newPassword);
    setStatus("✅ Password updated successfully!");
    setIsSuccess(true);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  // Close modal after success
  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, onClose]);

  // Hide error/success message automatically
  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => setStatus(""), 2500);
      return () => clearTimeout(timer);
    }
  }, [status]);

  // Shake on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        setStatus("⚠️ Clicked outside!");
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const allGreen =
    /[A-Z]/.test(newPassword) &&
    /[a-z]/.test(newPassword) &&
    /\d/.test(newPassword) &&
    /[!@#$%^&*]/.test(newPassword) &&
    newPassword.length >= 8;

  return (
    <div className="fixed top-20 right-6 z-50 animate-fadeIn">
      <div
        ref={boxRef}
        className={`bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 relative z-50 transform transition-all ${
          isShaking ? "shake" : ""
        }`}
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✖
        </button>
        <h2 className="text-xl font-bold mb-4">Change Password</h2>

        {/* Status message */}
        {status && (
          <p
            className={`text-center font-semibold mb-2 ${
              isSuccess ? "text-green-600" : "text-red-600"
            } animate-fadeOut`}
          >
            {status}
          </p>
        )}

        {/* Current Password */}
        <div className="relative mb-4">
          <input
            type={showCurrent ? "text" : "password"}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Current password"
            className="border border-gray-300 rounded px-3 py-2 w-full pr-12 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="button"
            onClick={() => setShowCurrent(!showCurrent)}
            className="absolute right-3 top-2 text-sm text-blue-500"
          >
            {showCurrent ? "Hide" : "Show"}
          </button>
        </div>

        {/* New Password */}
        <div className="relative mb-4">
          <input
            type={showNew ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            onFocus={() => setDropdownVisible(true)}
            onBlur={() => setTimeout(() => setDropdownVisible(false), 200)}
            placeholder="New password"
            className="border border-gray-300 rounded px-3 py-2 w-full pr-12 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="button"
            onClick={() => setShowNew(!showNew)}
            className="absolute right-3 top-2 text-sm text-blue-500"
          >
            {showNew ? "Hide" : "Show"}
          </button>

          {dropdownVisible && !allGreen && (
            <div className="absolute left-0 mt-1 w-max max-w-xs bg-gray-200 border rounded-md shadow-lg p-2 text-xs space-y-1 z-30">
              <p
                className={
                  /[A-Z]/.test(newPassword) ? "text-green-600" : "text-red-500"
                }
              >
                {/[A-Z]/.test(newPassword) ? "✅" : "❌"} At least one uppercase
              </p>
              <p
                className={
                  /[a-z]/.test(newPassword) ? "text-green-600" : "text-red-500"
                }
              >
                {/[a-z]/.test(newPassword) ? "✅" : "❌"} At least one lowercase
              </p>
              <p
                className={
                  /\d/.test(newPassword) ? "text-green-600" : "text-red-500"
                }
              >
                {/\d/.test(newPassword) ? "✅" : "❌"} At least one number
              </p>
              <p
                className={
                  /[!@#$%^&*]/.test(newPassword)
                    ? "text-green-600"
                    : "text-red-500"
                }
              >
                {/[!@#$%^&*]/.test(newPassword) ? "✅" : "❌"} One special char
              </p>
              <p
                className={
                  newPassword.length >= 8 ? "text-green-600" : "text-red-500"
                }
              >
                {newPassword.length >= 8 ? "✅" : "❌"} Min 8 characters
              </p>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div className="relative mb-4">
          <input
            type={showConfirm ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            className="border border-gray-300 rounded px-3 py-2 w-full pr-12 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3 top-2 text-sm text-blue-500"
          >
            {showConfirm ? "Hide" : "Show"}
          </button>
        </div>

        <button
          onClick={handleUpdate}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition transform hover:scale-105"
        >
          Update Password
        </button>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }

        .shake {
          animation: shake 0.5s ease-in-out;
        }
        @keyframes shake {
          0% {
            transform: translateX(0);
          }
          15% {
            transform: translateX(-5px);
          }
          30% {
            transform: translateX(5px);
          }
          45% {
            transform: translateX(-5px);
          }
          60% {
            transform: translateX(5px);
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

        @keyframes fadeOut {
          0% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-10px);
          }
        }
        .animate-fadeOut {
          animation: fadeOut 2.5s forwards;
        }
      `}</style>
    </div>
  );
}
