"use client";
import React, { useState, useEffect } from "react";

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

  const handleUpdate = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setStatus("❌ All fields are required.");
      setIsSuccess(false);
      return;
    }

    // Check current password matches real password
    if (currentPassword !== currentRealPassword) {
      setStatus("❌ Current password is incorrect.");
      setIsSuccess(false);
      return;
    }

    // New password should not match current password
    if (newPassword === currentRealPassword) {
      setStatus("❌ New password cannot be the same as the current password.");
      setIsSuccess(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setStatus("❌ New passwords do not match.");
      setIsSuccess(false);
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

  // Hide error/success message automatically after 3 seconds
  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => setStatus(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const allGreen =
    /[A-Z]/.test(newPassword) &&
    /[a-z]/.test(newPassword) &&
    /\d/.test(newPassword) &&
    /[!@#$%^&*]/.test(newPassword) &&
    newPassword.length >= 8;

  return (
    <div className="fixed top-20 right-6 z-50 animate-fadeIn">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 relative z-50">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✖
        </button>
        <h2 className="text-xl font-bold mb-4">Change Password</h2>

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
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Update Password
        </button>

        {status && (
          <p
            className={`mt-4 ${isSuccess ? "text-green-600" : "text-red-600"}`}
          >
            {status}
          </p>
        )}
      </div>
    </div>
  );
}
