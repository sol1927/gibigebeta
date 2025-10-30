"use client";
import React, { useState, useEffect } from "react";
import TwoFAVerifyBox from "./TwoFAVerifyBox"; // Import the 2FA box

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

  const handleLogin = () => {
    if (email === credentials.username && password === credentials.password) {
      setShow2FA(true); // Show 2FA box
    } else {
      setError("Invalid email or password");
    }
  };

  const handle2FASuccess = () => {
    onLoginSuccess(email); // Pass the correct email back to parent
    setShow2FA(false);
  };

  // Hide error message after 3 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <>
      {!show2FA ? (
        <div className="bg-white shadow-2xl p-6 rounded-lg w-80">
          <h2 className="text-2xl font-bold text-center mb-4 text-purple-700">
            Main Admin Login
          </h2>
          {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
          <input
            className="border w-full p-2 mb-3 rounded"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="border w-full p-2 mb-3 rounded"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
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
            className="bg-purple-600 hover:bg-purple-700 text-white w-full py-2 rounded font-semibold"
          >
            Login
          </button>
          <button
            onClick={onClose}
            className="mt-3 text-gray-600 text-sm w-full text-center"
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
    </>
  );
}
