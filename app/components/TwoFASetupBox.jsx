"use client";
import React, { useState, useEffect, useRef } from "react";

export default function ChangeEmailBox({
  currentEmail = "admin@gmail.com",
  onClose,
  onUpdate,
}) {
  const [current, setCurrent] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [code, setCode] = useState("");
  const [status, setStatus] = useState("");
  const [resendTimer, setResendTimer] = useState(0);
  const [canResend, setCanResend] = useState(true);
  const [codeSent, setCodeSent] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const boxRef = useRef(null);

  // Send verification code
  const handleSendCode = () => {
    if (current !== currentEmail) {
      setStatus("❌ Current email does not match!");
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }
    if (!newEmail.includes("@")) {
      setStatus("❌ Please enter a valid new email.");
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }
    if (newEmail === currentEmail) {
      setStatus("❌ New email cannot be the same as current email.");
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
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
      onUpdate(newEmail);
      setTimeout(() => onClose(), 3000);
    } else {
      setStatus("❌ Invalid code. Try again.");
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
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

  // Hide status message automatically
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed top-20 right-6 z-50 animate-fadeIn">
        <div
          ref={boxRef}
          className={`bg-white rounded-lg shadow-xl w-80 p-6 relative transform transition-all
            ${isShaking ? "shake" : ""}`}
        >
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            ✖
          </button>
          <h2 className="text-xl font-bold mb-4">Change Email</h2>

          {status && (
            <p className="text-center font-semibold mb-2 text-gray-700 animate-fadeOut">
              {status}
            </p>
          )}

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
              className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600 transition transform hover:scale-105"
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
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition transform hover:scale-105"
              >
                Confirm Email Change
              </button>
            </>
          )}
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(-10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }

        .shake {
          animation: shake 0.5s ease-in-out;
        }
        @keyframes shake {
          0% { transform: translateX(0); }
          15% { transform: translateX(-5px); }
          30% { transform: translateX(5px); }
          45% { transform: translateX(-5px); }
          60% { transform: translateX(5px); }
          75% { transform: translateX(-3px); }
          90% { transform: translateX(3px); }
          100% { transform: translateX(0); }
        }

        @keyframes fadeOut {
          0% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-10px); }
        }
        .animate-fadeOut {
          animation: fadeOut 2.5s forwards;
        }
      `}</style>
    </div>
  );
}
