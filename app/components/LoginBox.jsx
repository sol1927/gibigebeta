"use client";

import { useState, useRef, useEffect } from "react";

export default function LoginBox({ university, campus, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const modalRef = useRef();
  const [isShaking, setIsShaking] = useState(false);

  // New State for Feedback
  const [message, setMessage] = useState({ type: "", text: "" });
  const [isLoading, setIsLoading] = useState(false);

  // Shake on outside click (Logic remains the same)
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

  // Effect to clear the message after a delay
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ type: "", text: "" });
      }, 4000); // Message disappears after 4 seconds
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous message and show loading
    setMessage({ type: "", text: "" });
    setIsLoading(true);

    // --- Simulated API Call ---
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Wait 1.5 seconds

    // --- Simulated Success/Error Logic ---
    const isLoginSuccessful =
      email === "user@example.com" && password === "password123";

    if (isLoginSuccessful) {
      setMessage({
        type: "success",
        text: `Successfully signed in to ${university} - ${campus}!`,
      });
      // In a real app, you would redirect the user here: router.push('/dashboard')
      // For simulation, we'll just close the modal after a short delay
      setTimeout(onClose, 2000);
    } else {
      setMessage({
        type: "error",
        text: "Login failed. Please check your email and password.",
      });
      // Shake the modal on failure
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }

    setIsLoading(false);
  };

  // Determine message styles
  const messageStyle =
    message.type === "success"
      ? "bg-green-600 text-white"
      : "bg-red-600 text-white";

  return (
    <div className="relative">
      {/* Modal Box */}
      <div
        ref={modalRef}
        className={`bg-gray-900 p-6 rounded-2xl shadow-xl w-96 text-white transform transition-all relative z-50 ${
          isShaking ? "shake" : ""
        }`}
      >
        <h2 className="text-xl font-bold mb-4 text-center">
          Login - {university} ({campus})
        </h2>

        {/* Feedback Message Banner */}
        {message.text && (
          <div
            className={`p-3 rounded-lg mb-4 text-sm font-semibold text-center animate-fadeIn ${messageStyle}`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-200">
              Email (Try: user@example.com)
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
            <label className="block text-sm font-medium text-gray-200 sr-only">
              Password (Try: password123)
            </label>
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
              className="absolute right-3 top-1/2 -translate-y-1/2 mt-[2px] text-sm text-gray-400 hover:text-gray-200 hover:cursor-pointer z-20"
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
            disabled={isLoading}
            className={`w-full py-2 rounded-md transition ${
              isLoading
                ? "bg-blue-800 cursor-not-allowed flex justify-center items-center"
                : "bg-blue-600 hover:bg-blue-700 hover:cursor-pointer"
            } text-white font-semibold`}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Signing In...
              </>
            ) : (
              "Sign in"
            )}
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
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out forwards;
          }
        `}</style>
      </div>
    </div>
  );
}
