"use client";
import React, { useState, useEffect, useRef } from "react";

export default function TwoFAVerifyBox({ email, onSuccess, onClose }) {
  const [code, setCode] = useState(""); 
  const [error, setError] = useState(""); 
  const [isShaking, setIsShaking] = useState(false);
  const [triggerSuccessBoxAnim, setTriggerSuccessBoxAnim] = useState(false);
  const boxRef = useRef(null);

  const maskEmail = (email) => {
    const [user, domain] = email.split("@");
    if (user.length <= 2) return email;
    const masked = user[0] + "*".repeat(user.length - 2) + user.slice(-1);
    return `${masked}@${domain}`;
  };

  const handleVerify = () => {
    if (code === "123456") {
      setTriggerSuccessBoxAnim(true);
      setTimeout(() => {
        setTriggerSuccessBoxAnim(false);
        onSuccess();
      }, 1200);
    } else {
      setError("❌ Invalid code. Try again.");
      setIsShaking(true);
      setTimeout(() => {
        setIsShaking(false);
      }, 500);
    }
  };

  // Shake on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        setError("⚠️ Clicked outside!");
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Hide error automatically after 2.5s
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 2500);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div
      ref={boxRef}
      className={`bg-white shadow-2xl p-6 rounded-lg w-80 relative transform transition-all
        ${isShaking ? "shake" : ""}
        ${triggerSuccessBoxAnim ? "successBoxAnim" : ""}`}
    >
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

      {/* Error message above buttons */}
      {error && (
        <div className="text-center text-red-600 font-semibold mb-2 animate-fadeOut">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-2">
        <button
          onClick={handleVerify}
          className="bg-blue-600 hover:cursor-pointer hover:bg-blue-700 text-white w-full py-2 rounded font-semibold transition transform hover:scale-105"
        >
          Verify
        </button>
        <button
          onClick={onClose}
          className="text-gray-600 hover:cursor-pointer text-sm w-full text-center py-2 rounded hover:bg-gray-200 transition"
        >
          Cancel
        </button>
      </div>

      <style jsx>{`
        /* Shake animation */
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
        .shake { animation: shake 0.5s ease-in-out; }

        /* Success box animation: pop + glow */
        @keyframes successBoxAnim {
          0% { transform: scale(1); box-shadow: 0 0 0 rgba(0,0,0,0); }
          25% { transform: scale(1.05); box-shadow: 0 0 15px rgba(0, 255, 0, 0.6); }
          50% { transform: scale(1.1); box-shadow: 0 0 20px rgba(0, 255, 0, 0.8); }
          75% { transform: scale(1.05); box-shadow: 0 0 15px rgba(0, 255, 0, 0.6); }
          100% { transform: scale(1); box-shadow: 0 0 0 rgba(0,0,0,0); }
        }
        .successBoxAnim {
          animation: successBoxAnim 1.2s ease-in-out forwards;
        }

        /* Error fade out */
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
