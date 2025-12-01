"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

export default function EditProfilePage() {
  const router = useRouter();
  const newPwdRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);

  const ADMIN_CURRENT_PASSWORD = "1234";

  const [formData, setFormData] = useState({
    university: "Arba Minch University",
    email: "solomon@example.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    logo: "/logo.png",
  });

  const [errors, setErrors] = useState({});
  const [previewLogo, setPreviewLogo] = useState(formData.logo);
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [isFocused, setIsFocused] = useState(false);
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowFooter(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files[0] && name === "logo") {
      const file = files[0];
      setPreviewLogo(URL.createObjectURL(file));
      setFormData((prev) => ({ ...prev, logo: file }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleDragDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setPreviewLogo(URL.createObjectURL(file));
      setFormData((prev) => ({ ...prev, logo: file }));
    }
  };

  const showDropdown = isFocused && formData.newPassword.length > 0;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (newPwdRef.current && !newPwdRef.current.contains(e.target)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSave = () => {
    const newErrors = {};

    // University and email validation
    if (!formData.university.trim())
      newErrors.university = "University is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Invalid email address";
      }
    }

    // Current password validation (mandatory and must match)
    if (!formData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    } else if (formData.currentPassword !== ADMIN_CURRENT_PASSWORD) {
      newErrors.currentPassword = "Incorrect current password";
    }

    // New password validation (mandatory)
    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm new password";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setTimeout(() => setErrors({}), 2000);
      return;
    }

    router.push("/adminDashboard/profile");
  };

  return (
    <div className="min-h-screen bg-black/50 text-white flex flex-col relative">
      <Navbar />

      <button
        type="button"
        onClick={() => router.push("/adminDashboard/profile")}
        title="Back to Profile"
        className="fixed top-[90px] left-6 p-2 rounded-full hover:bg-blue-700 hover:cursor-pointer transition z-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <div className="flex flex-col items-center py-20 px-6 w-full max-w-3xl mx-auto space-y-10 pb-40">
        <h1 className="text-3xl font-bold mb-10">Edit Profile</h1>
        <div className="w-full bg-white/10 p-8 rounded-xl shadow-lg flex flex-col gap-6">
          {/* Logo Drag & Drop */}
          <div className="flex flex-col items-start gap-2">
            <label className="font-semibold">Logo</label>
            <div
              className={`flex items-center justify-center w-28 h-28 rounded-full overflow-hidden border-2 border-dashed relative cursor-pointer ${
                dragActive ? "border-blue-500 bg-gray-800" : "border-gray-400"
              }`}
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                setDragActive(false);
              }}
              onDrop={handleDragDrop}
              onClick={() => document.getElementById("logoInput").click()}
            >
              {previewLogo && (
                <Image
                  src={previewLogo}
                  alt="Logo Preview"
                  fill
                  className="object-cover"
                />
              )}
              {!previewLogo && (
                <span className="text-gray-400 text-xs text-center px-2">
                  Click or drag & drop
                </span>
              )}
              <input
                id="logoInput"
                type="file"
                name="logo"
                accept="image/*"
                className="hidden"
                onChange={handleChange}
              />
            </div>
            {formData.logo && typeof formData.logo !== "string" && (
              <p className="text-gray-300 text-xs truncate w-28 text-center">
                {formData.logo.name}
              </p>
            )}
          </div>

          {/* University */}
          <div className="flex flex-col">
            <label className="mb-1 font-semibold">University</label>
            <input
              type="text"
              name="university"
              value={formData.university}
              onChange={handleChange}
              className={`bg-gray-700 text-white px-3 py-2 rounded w-full ${
                errors.university ? "border-2 border-red-500" : ""
              }`}
            />
            {errors.university && (
              <p className="text-red-500 text-sm mt-1">{errors.university}</p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`bg-gray-700 text-white px-3 py-2 rounded w-full ${
                errors.email ? "border-2 border-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Current Password */}
          <div className="flex flex-col relative">
            <label className="mb-1 font-semibold">Current Password</label>
            <input
              type={showPassword.current ? "text" : "password"}
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              className={`bg-gray-700 text-white px-3 py-2 rounded w-full ${
                errors.currentPassword ? "border-2 border-red-500" : ""
              }`}
            />
            <button
              type="button"
              onClick={() =>
                setShowPassword((prev) => ({ ...prev, current: !prev.current }))
              }
              className="absolute right-3 top-8 text-sm text-gray-400 hover:text-gray-200"
            >
              {showPassword.current ? "Hide" : "Show"}
            </button>
            {errors.currentPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.currentPassword}
              </p>
            )}
          </div>

          {/* New Password */}
          <div className="relative w-full" ref={newPwdRef}>
            <label className="mb-1 font-semibold">New Password</label>
            <input
              type={showPassword.new ? "text" : "password"}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              onFocus={() => setIsFocused(true)}
              className="bg-gray-700 text-white px-3 py-2 rounded w-full pr-14"
            />
            <button
              type="button"
              onClick={() =>
                setShowPassword((prev) => ({ ...prev, new: !prev.new }))
              }
              className="absolute right-3 top-8 text-sm text-gray-400 hover:text-gray-200"
            >
              {showPassword.new ? "Hide" : "Show"}
            </button>

            {/* Suggestion dropdown */}
            {showDropdown && (
              <div className="absolute left-0 mt-1 w-max max-w-xs bg-gray-200 border rounded-md shadow-lg p-2 text-xs space-y-1 z-30">
                <p
                  className={
                    /[A-Z]/.test(formData.newPassword)
                      ? "text-green-600"
                      : "text-red-500"
                  }
                >
                  {/[A-Z]/.test(formData.newPassword) ? "✅" : "❌"} At least
                  one uppercase
                </p>
                <p
                  className={
                    /[a-z]/.test(formData.newPassword)
                      ? "text-green-600"
                      : "text-red-500"
                  }
                >
                  {/[a-z]/.test(formData.newPassword) ? "✅" : "❌"} At least
                  one lowercase
                </p>
                <p
                  className={
                    /\d/.test(formData.newPassword)
                      ? "text-green-600"
                      : "text-red-500"
                  }
                >
                  {/\d/.test(formData.newPassword) ? "✅" : "❌"} At least one
                  number
                </p>
                <p
                  className={
                    /[!@#$%^&*]/.test(formData.newPassword)
                      ? "text-green-600"
                      : "text-red-500"
                  }
                >
                  {/[!@#$%^&*]/.test(formData.newPassword) ? "✅" : "❌"} At
                  least one special char
                </p>
                <p
                  className={
                    formData.newPassword.length >= 8
                      ? "text-green-600"
                      : "text-red-500"
                  }
                >
                  {formData.newPassword.length >= 8 ? "✅" : "❌"} Minimum 8
                  characters
                </p>
              </div>
            )}
          </div>

          {/* Confirm New Password */}
          <div className="flex flex-col relative">
            <label className="mb-1 font-semibold">Confirm New Password</label>
            <input
              type={showPassword.confirm ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`bg-gray-700 text-white px-3 py-2 rounded w-full ${
                errors.confirmPassword ? "border-2 border-red-500" : ""
              }`}
            />
            <button
              type="button"
              onClick={() =>
                setShowPassword((prev) => ({ ...prev, confirm: !prev.confirm }))
              }
              className="absolute right-3 top-8 text-sm text-gray-400 hover:text-gray-200"
            >
              {showPassword.confirm ? "Hide" : "Show"}
            </button>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-4">
            <button
              type="button"
              onClick={handleSave}
              className="bg-green-500 hover:bg-green-600 hover:cursor-pointer text-white font-semibold py-2 px-4 rounded-lg"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => router.push("/adminDashboard/profile")}
              className="bg-red-500 hover:bg-red-600 hover:cursor-pointer text-white font-semibold py-2 px-4 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
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
