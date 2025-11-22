"use client";

import { useState, useRef, useEffect } from "react";

export default function SignupBox({ onClose }) {
  const [university, setUniversity] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);
  const [logoFileName, setLogoFileName] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [shake, setShake] = useState(false);

  const boxRef = useRef(null);
  const passwordRef = useRef(null);
  const uploadRef = useRef(null);

  // Handle outside clicks to shake
  useEffect(() => {
    function handleClickOutside(e) {
      // Close password dropdown if clicked outside
      if (passwordRef.current && !passwordRef.current.contains(e.target)) {
        setDropdownVisible(false);
      }

      // Shake animation if clicked outside
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        setShake(true);
        setTimeout(() => setShake(false), 500);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`University: ${university}\nEmail: ${email}\nPassword: ${password}`);
  };

  const allGreen =
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /\d/.test(password) &&
    /[!@#$%^&*]/.test(password) &&
    password.length >= 8;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogoPreview(reader.result);
      reader.readAsDataURL(file);
      setLogoFileName(file.name);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/20 z-40 pointer-events-auto"></div>

      {/* Signup Box */}
      <div
        ref={boxRef}
        className={`fixed top-6 right-6 z-50 w-full max-w-md bg-gray-900 p-8 rounded-2xl shadow-lg transform transition-all animate-fadeIn ${
          shake ? "shake" : ""
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-white text-lg"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-center mb-6 text-white">
          Add a new university
        </h2>
        <button
          onClick={() => console.log("Google signup clicked")}
          className="w-full flex items-center justify-center gap-2 py-2.5 border rounded-md hover:bg-gray-700 hover:cursor-pointer text-white transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span>Sign up with Google</span>
        </button>

        <div className="flex items-center my-5">
          <div className="grow h-px bg-gray-600"></div>
          <span className="px-2 text-sm text-gray-400">or</span>
          <div className="grow h-px bg-gray-600"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-white">
          {/* University Name */}
          <div>
            <label className="block text-sm font-medium text-gray-200">
              University Name
            </label>
            <input
              type="text"
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              required
              className="w-full mt-1 px-3 py-2 border rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
              placeholder="Enter your university name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-200">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-1 px-3 py-2 border rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div className="relative w-full" ref={passwordRef}>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setDropdownVisible(true)}
              required
              className="w-full mt-1 px-3 py-2 border rounded-md focus:ring focus:ring-blue-200 focus:outline-none pr-14"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 hover:text-gray-300"
            >
              {showPassword ? "Hide" : "Show"}
            </button>

            {dropdownVisible && !allGreen && (
              <div className="absolute left-0 mt-1 w-max max-w-xs bg-gray-200 border rounded-md shadow-lg p-2 text-xs space-y-1 z-30">
                <p
                  className={
                    /[A-Z]/.test(password) ? "text-green-600" : "text-red-500"
                  }
                >
                  {/[A-Z]/.test(password) ? "✅" : "❌"} At least one uppercase
                </p>
                <p
                  className={
                    /[a-z]/.test(password) ? "text-green-600" : "text-red-500"
                  }
                >
                  {/[a-z]/.test(password) ? "✅" : "❌"} At least one lowercase
                </p>
                <p
                  className={
                    /\d/.test(password) ? "text-green-600" : "text-red-500"
                  }
                >
                  {/\d/.test(password) ? "✅" : "❌"} At least one number
                </p>
                <p
                  className={
                    /[!@#$%^&*]/.test(password)
                      ? "text-green-600"
                      : "text-red-500"
                  }
                >
                  {/[!@#$%^&*]/.test(password) ? "✅" : "❌"} One special char
                </p>
                <p
                  className={
                    password.length >= 8 ? "text-green-600" : "text-red-500"
                  }
                >
                  {password.length >= 8 ? "✅" : "❌"} Min 8 characters
                </p>
              </div>
            )}
          </div>

          {/* Logo Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Upload Logo
            </label>
            <div
              ref={uploadRef}
              onClick={() => uploadRef.current.querySelector("input").click()}
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragActive(false);
                const file = e.dataTransfer.files[0];
                if (file && file.type.startsWith("image/")) {
                  const reader = new FileReader();
                  reader.onloadend = () => setLogoPreview(reader.result);
                  reader.readAsDataURL(file);
                  setLogoFileName(file.name);
                }
              }}
              className={`flex flex-col items-center justify-center w-36 h-24 border-2 border-dashed rounded-lg cursor-pointer transition ${
                dragActive ? "border-blue-500 bg-gray-800" : "border-gray-400"
              }`}
            >
              {logoPreview ? (
                <img
                  src={logoPreview}
                  alt="Logo Preview"
                  className="object-cover w-full h-full rounded-lg"
                />
              ) : (
                <span className="text-gray-400 text-xs text-center px-2">
                  Click or drag & drop
                </span>
              )}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
            {logoFileName && (
              <p className="text-gray-300 text-xs mt-1 text-center">
                {logoFileName}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-md transition ${
              loading
                ? "bg-blue-400"
                : "bg-blue-600 hover:bg-blue-700 hover:cursor-pointer text-white"
            }`}
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>
      </div>

      {/* Styles */}
      <style jsx>{`
        .shake {
          animation: shake 0.5s ease-in-out;
        }
        @keyframes shake {
          0%,
          100% {
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
        }
      `}</style>
    </>
  );
}
