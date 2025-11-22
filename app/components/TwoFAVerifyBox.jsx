"use client";
import React, { useState, useEffect, useRef } from "react";

export default function TwoFAVerifyBox({ email, onSuccess, onClose }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const [triggerSuccessBoxAnim, setTriggerSuccessBoxAnim] = useState(false);

  const boxRef = useRef(null);

  // We use a Ref to track the success state for the event listener.
  // This prevents the useEffect dependency array error.
  const successStateRef = useRef(false);

  const maskEmail = (email) => {
    const [user, domain] = email.split("@");
    if (user.length <= 2) return email;
    const masked = user[0] + "*".repeat(user.length - 2) + user.slice(-1);
    return `${masked}@${domain}`;
  };

  // Sync the Ref with the State whenever it changes
  useEffect(() => {
    successStateRef.current = triggerSuccessBoxAnim;
  }, [triggerSuccessBoxAnim]);

  const handleVerify = () => {
    if (code === "123456") {
      setTriggerSuccessBoxAnim(true);
      setTimeout(() => {
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
        // Check the Ref (always current) instead of the State
        if (!successStateRef.current) {
          setError("⚠️ Clicked outside!");
          setIsShaking(true);
          setTimeout(() => setIsShaking(false), 500);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []); // Dependency array is now empty and stable!

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
        ${isShaking ? "shake" : ""}`}
    >
      {/* --- SUCCESS OVERLAY --- */}
      {triggerSuccessBoxAnim && (
        <div className="absolute inset-0 bg-white rounded-lg z-20 flex flex-col items-center justify-center animate-success-pop">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-3">
            <svg
              className="w-10 h-10 text-green-600 animate-checkmark"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-green-700">Verified!</h3>
          <p className="text-gray-500 text-sm mt-1">Redirecting...</p>
        </div>
      )}

      {/* --- MAIN FORM CONTENT --- */}
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
        disabled={triggerSuccessBoxAnim}
      />

      {/* Error message */}
      {error && (
        <div className="text-center text-red-600 font-semibold mb-2 animate-fadeOut">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-2">
        <button
          onClick={handleVerify}
          disabled={triggerSuccessBoxAnim}
          className="bg-blue-600 hover:cursor-pointer hover:bg-blue-700 text-white w-full py-2 rounded font-semibold transition transform hover:scale-105 disabled:opacity-50 disabled:pointer-events-none"
        >
          Verify
        </button>
        <button
          onClick={onClose}
          disabled={triggerSuccessBoxAnim}
          className="text-gray-600 hover:cursor-pointer text-sm w-full text-center py-2 rounded hover:bg-gray-200 transition disabled:opacity-50 disabled:pointer-events-none"
        >
          Cancel
        </button>
      </div>

      <style jsx>{`
        /* Shake animation */
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
        .shake {
          animation: shake 0.5s ease-in-out;
        }

        /* Success Overlay Pop */
        @keyframes successPop {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-success-pop {
          animation: successPop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)
            forwards;
        }

        /* Checkmark Draw Animation */
        @keyframes checkmark {
          0% {
            stroke-dasharray: 0, 100;
            opacity: 0;
          }
          100% {
            stroke-dasharray: 100, 0;
            opacity: 1;
          }
        }
        .animate-checkmark {
          animation: checkmark 0.6s ease-out 0.2s forwards;
        }

        /* Error fade out */
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
