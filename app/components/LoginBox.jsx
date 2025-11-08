"use client";

import { useState, useRef, useEffect } from "react";

export default function LoginBox({ university, campus, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const modalRef = useRef();
  const [isShaking, setIsShaking] = useState(false);

  // Shake on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Logging in to ${university} - ${campus}\nEmail: ${email}\nPassword: ${password}`
    );
  };

  return (
    <div className="relative">
      {/* Overlay */}
      <div
        ref={modalRef}
        className={`bg-gray-900 p-6 rounded-2xl shadow-xl w-96 text-white transform transition-all relative z-50 ${
          isShaking ? "shake" : ""
        }`}
      >
        <h2 className="text-xl font-bold mb-4 text-center">
          Login - {university} ({campus})
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-200">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-1 px-3 py-2 border rounded-md focus:ring focus:ring-blue-500 focus:outline-none bg-gray-700 text-white"
              placeholder="Enter your email"
            />
          </div>
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-1 px-3 py-2 border rounded-md focus:ring focus:ring-blue-500 focus:outline-none pr-14 bg-gray-700 text-white"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 hover:text-gray-200 hover:cursor-pointer z-20"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-200 hover:cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded hover:cursor-pointer"
              />
              <span className="ml-2">Remember me</span>
            </label>
            <button
              type="button"
              className="text-sm text-blue-400 hover:underline hover:cursor-pointer"
            >
              Forgot password?
            </button>
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded-md bg-blue-600 hover:bg-blue-700 hover:cursor-pointer text-white transition"
          >
            Sign in
          </button>
        </form>
        <button
          className="absolute top-3 right-4 text-gray-400 hover:text-gray-200"
          onClick={onClose}
        >
          ✕
        </button>

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
        `}</style>
      </div>
    </div>
  );
}
