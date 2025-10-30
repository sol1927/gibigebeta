"use client";
import React, { useState, useEffect } from "react";

export default function TwoFAVerifyBox({ email, onSuccess, onClose }) {
  const [code, setCode] = useState(""); // start empty
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState(""); // "success" or "error"

  const maskEmail = (email) => {
    const [user, domain] = email.split("@");
    if (user.length <= 2) return email;
    const masked = user[0] + "*".repeat(user.length - 2) + user.slice(-1);
    return `${masked}@${domain}`;
  };

  const handleVerify = () => {
    if (code === "123456") {
      setStatusType("success");
      setStatus("🎉 2FA verified successfully!");
      setTimeout(() => onSuccess(), 2000);
    } else {
      setStatusType("error");
      setStatus("❌ Invalid code. Try again.");
    }
  };

  // Hide status after 3 seconds
  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => setStatus(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <div className="bg-white shadow-2xl p-6 rounded-lg w-80 relative">
      <h2 className="text-xl font-bold text-center mb-4 text-blue-700">
        Two-Factor Verification
      </h2>
      <p className="text-sm text-gray-600 mb-3 text-center">
        Code sent to: <span className="font-semibold">{maskEmail(email)}</span>
      </p>
      <input
        className="border w-full p-2 mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Enter verification code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button
        onClick={handleVerify}
        className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded font-semibold transition transform hover:scale-105"
      >
        Verify
      </button>
      <button
        onClick={onClose}
        className="mt-3 text-gray-600 text-sm w-full text-center"
      >
        Cancel
      </button>

      {/* Status Message */}
      {status && (
        <div
          className={`mt-4 text-center py-2 px-3 rounded font-semibold transition-all animate-fadeIn
            ${statusType === "success" ? "bg-green-100 text-green-800" : ""}
            ${statusType === "error" ? "bg-red-100 text-red-800" : ""}`}
        >
          {status}
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(-5px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
