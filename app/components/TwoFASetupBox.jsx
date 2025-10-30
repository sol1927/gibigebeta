"use client";
import React, { useState, useEffect } from "react";

export default function ChangeEmailBox({
  currentEmail = "admin@gmail.com",
  onClose,
  onUpdate,
}) {
  const [current, setCurrent] = useState(""); // <-- empty string now
  const [newEmail, setNewEmail] = useState("");
  const [code, setCode] = useState("");
  const [status, setStatus] = useState("");
  const [resendTimer, setResendTimer] = useState(0);
  const [canResend, setCanResend] = useState(true);
  const [codeSent, setCodeSent] = useState(false);

  // Send verification code
  const handleSendCode = () => {
    if (current !== currentEmail) {
      setStatus("❌ Current email does not match!");
      return;
    }
    if (!newEmail.includes("@")) {
      setStatus("❌ Please enter a valid new email.");
      return;
    }
    if (newEmail === currentEmail) {
      setStatus("❌ New email cannot be the same as current email.");
      return;
    }
    setStatus(`📨 Verification code sent to ${newEmail}`);
    setCode("");
    setCodeSent(true);
    setCanResend(false);
    setResendTimer(30);
  };

  // Verify code
  const handleVerify = () => {
    if (!onUpdate || typeof onUpdate !== "function") {
      console.error("Error: onUpdate prop is not provided or not a function");
      return;
    }

    if (code === "123456") {
      setStatus("✅ Email updated successfully!");
      onUpdate(newEmail); // Update email
      setTimeout(() => onClose(), 3000);
    } else {
      setStatus("❌ Invalid code. Try again.");
    }
  };

  // Countdown timer for resend
  useEffect(() => {
    let countdown;
    if (!canResend && resendTimer > 0) {
      countdown = setInterval(() => setResendTimer((prev) => prev - 1), 1000);
    } else if (resendTimer === 0) {
      setCanResend(true);
      clearInterval(countdown);
    }
    return () => clearInterval(countdown);
  }, [resendTimer, canResend]);

  // Hide status message after 3 seconds
  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => setStatus(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed top-20 right-6 z-50 animate-fadeIn">
        <div className="bg-white rounded-lg shadow-xl w-80 p-6 relative">
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            ✖
          </button>
          <h2 className="text-xl font-bold mb-4">Change Email</h2>

          <input
            type="email"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            placeholder="Current email"
            className="border border-gray-300 rounded px-3 py-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="New email"
            className="border border-gray-300 rounded px-3 py-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {canResend ? (
            <button
              onClick={handleSendCode}
              className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600 transition"
            >
              Send Verification Code
            </button>
          ) : (
            <p className="mb-4 text-sm text-gray-500">
              Resend available in {resendTimer}s
            </p>
          )}

          {codeSent && (
            <>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter verification code"
                className="border border-gray-300 rounded px-3 py-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                onClick={handleVerify}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
              >
                Confirm Email Change
              </button>
            </>
          )}

          {status && <p className="mt-4 text-gray-700 text-sm">{status}</p>}
        </div>
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
      `}</style>
    </div>
  );
}
