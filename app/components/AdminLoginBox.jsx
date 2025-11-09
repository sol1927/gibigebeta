"use client";
import React, { useState, useEffect, useRef } from "react";
import TwoFAVerifyBox from "./TwoFAVerifyBox";

export default function AdminLoginBox({
  onClose,
  onLoginSuccess,
  credentials,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [show2FA, setShow2FA] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const modalRef = useRef(null);

  const handleLogin = () => {
    let currentError = "";

    if (email !== credentials.username && password !== credentials.password) {
      currentError = "❌ Invalid email and password";
    } else if (email !== credentials.username) {
      currentError = "❌ Incorrect email";
    } else if (password !== credentials.password) {
      currentError = "❌ Incorrect password";
    }

    if (currentError) {
      setError(currentError);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }

    setError("");
    setShow2FA(true);
  };

  const handle2FASuccess = () => {
    onLoginSuccess(email);
    setShow2FA(false);
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 2500);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setError("⚠️ Clicked outside!");
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inset-0 bg-black/20 flex items-center justify-center z-50">
      {!show2FA ? (
        <div
          ref={modalRef}
          className={`bg-white shadow-2xl p-6 rounded-lg w-80 transform transition-all
            ${isShaking ? "shake" : ""}`}
        >
          <h2 className="text-2xl font-bold text-center mb-4 text-purple-700">
            Main Admin Login
          </h2>

          {/* Single error message */}
          {error && (
            <div className="text-center text-red-600 font-semibold mb-2 animate-fadeOut">
              {error}
            </div>
          )}

          <input
            className="border w-full p-2 mb-3 rounded"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password field with perfectly centered show/hide */}
          <div className="relative mb-3">
            <div className="flex items-center">
              <input
                className="border w-full p-2 rounded pr-16"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-gray-600 hover:text-gray-900 font-semibold h-full flex items-center"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4 text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="accent-purple-600"
              />
              Remember me
            </label>
            <button
              onClick={() => setError("🔐 Password recovery not implemented.")}
              className="text-purple-600 hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <button
            onClick={handleLogin}
            className="bg-purple-600 hover:cursor-pointer hover:bg-purple-700 text-white w-full py-2 rounded font-semibold transition hover:scale-105"
          >
            Login
          </button>
          <button
            onClick={onClose}
            className="mt-3 hover:cursor-pointer text-gray-600 hover:bg-gray-200 transition py-2 rounded text-sm w-full text-center"
          >
            Cancel
          </button>
        </div>
      ) : (
        <TwoFAVerifyBox
          email={email}
          onSuccess={handle2FASuccess}
          onClose={onClose}
        />
      )}

      <style jsx>{`
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
