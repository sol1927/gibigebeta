"use client";

import { useState, useEffect } from "react";
import Footer from "../components/Footer";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showFooter, setShowFooter] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) setMessage(data.message);
      else setMessage(data.error);
    } catch (err) {
      setMessage("Something went wrong. Try again later.");
    }

    setLoading(false);
  };

  // Footer animation visibility on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setShowFooter(true);
      else setShowFooter(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-transparent relative">
<div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-md bg-gray-900 p-8 rounded-2xl shadow">
          <h2 className="text-2xl font-bold text-center mb-6 text-white">
            Forgot Password
          </h2>

          {message && (
            <p className="mb-4 text-center text-sm text-gray-700">{message}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-white">
            <div>
              <label className="block text-sm font-medium text-gray-200">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full mt-1 px-3 py-2 border rounded-md focus:ring focus:ring-blue-500 focus:outline-none bg-gray-700 text-white placeholder-gray-400"
                placeholder="Enter your email"
              />
            </div>

            <div className="flex justify-center">
  <button
    type="submit"
    className="flex items-center justify-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 hover:cursor-pointer transition"
    disabled={loading}
  >
    {loading ? "Sending..." : "Send Reset Link"}
  </button>
</div>

          </form>

          <p className="text-center text-sm text-gray-200 mt-4">
            Remember your password?{" "}
            <button
              type="button"
              onClick={() => (window.location.href = "/login")}
              className="text-blue-500 hover:underline hover:cursor-pointer"
            >
              Login
            </button>
          </p>
        </div>
      </div>

      {/* Smooth appearing footer */}
      <div
        className={`fixed bottom-4 left-0 w-full transition-transform duration-300 ${
          showFooter ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <Footer />
      </div>
    </div>
  );
}
