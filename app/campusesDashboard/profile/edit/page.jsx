"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Image from "next/image";

export default function EditCampusProfile() {
  const router = useRouter();
  const newPwdRef = useRef(null);

  // Logged-in campus data
  const campusData = {
    name: "Main Campus",
    university: "Arba Minch University",
    location: "Arba Minch",
    students: 1200,
    email: "maincampus@amu.edu.et",
    logo: "/logo.png",
  };

  const [formData, setFormData] = useState({
    ...campusData,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [previewLogo, setPreviewLogo] = useState(campusData.logo);
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [isFocused, setIsFocused] = useState(false);
  const [showFooter, setShowFooter] = useState(false);

  // Password strength
  const pwd = formData.newPassword;
  const allGreen =
    /[A-Z]/.test(pwd) &&
    /[a-z]/.test(pwd) &&
    /\d/.test(pwd) &&
    /[!@#$%^&*]/.test(pwd) &&
    pwd.length >= 8;
  const showDropdown = isFocused && pwd.length > 0 && !allGreen;

  // Scroll for footer
  useEffect(() => {
    const handleScroll = () => setShowFooter(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Click outside password box
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (newPwdRef.current && !newPwdRef.current.contains(e.target)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0] && name === "logo") {
      const objectUrl = URL.createObjectURL(files[0]);
      setPreviewLogo(objectUrl);
      setFormData((prev) => ({ ...prev, logo: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = () => {
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }

    if (formData.newPassword && !allGreen) {
      alert(
        "New password must have 8+ characters, uppercase, lowercase, number, and special character!"
      );
      return;
    }

    alert("Campus profile saved! (Frontend only, no backend)");
    router.push("/campusesDashboard/profile");
  };

  return (
    <div className="min-h-screen bg-black/50 text-white flex flex-col relative">
      <Navbar userType="campus" />

      {/* Back Button */}
      <button
        type="button"
        onClick={() => router.push("/campusesDashboard/profile")}
        title="Back to Profile"
        className="fixed top-[90px] left-6 p-2 rounded-full hover:bg-green-700 z-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div className="flex flex-col items-center py-20 px-6 w-full max-w-3xl mx-auto space-y-10 pb-40">
        <h1 className="text-3xl font-bold mb-10">Edit Campus Profile</h1>

        <div className="w-full bg-white/10 p-8 rounded-xl shadow-lg flex flex-col gap-6">

          {/* Logo Upload */}
          <div className="flex flex-col items-start gap-2">
            <label className="font-semibold">Logo</label>
            <div
              className="w-28 h-28 rounded-full overflow-hidden border-2 border-dashed relative cursor-pointer"
              onClick={() => document.getElementById("logoInput").click()}
            >
              {previewLogo && <Image src={previewLogo} fill className="object-cover" alt="Campus Logo" />}
              {!previewLogo && <span className="text-gray-400 text-xs text-center px-2">Click to upload</span>}
              <input
                id="logoInput"
                type="file"
                name="logo"
                accept="image/*"
                className="hidden"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Campus Info */}
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="bg-gray-700 text-white px-3 py-2 rounded w-full"
            placeholder="Campus Name"
          />
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="bg-gray-700 text-white px-3 py-2 rounded w-full"
            placeholder="Location"
          />
          <input
            type="number"
            name="students"
            value={formData.students}
            onChange={handleChange}
            className="bg-gray-700 text-white px-3 py-2 rounded w-full"
            placeholder="Number of Students"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="bg-gray-700 text-white px-3 py-2 rounded w-full"
            placeholder="Email"
          />

          {/* Current Password */}
          <div className="flex flex-col relative">
            <label className="mb-1 font-semibold">Current Password</label>
            <input
              type={showPassword.current ? "text" : "password"}
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              className="bg-gray-700 text-white px-3 py-2 rounded w-full"
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

            {showDropdown && (
              <div className="absolute left-0 mt-1 w-max max-w-xs bg-gray-200 border rounded-md shadow-lg p-2 text-xs space-y-1 z-30 text-black">
                <p className={/[A-Z]/.test(pwd) ? "text-green-600" : "text-red-500"}>
                  {/[A-Z]/.test(pwd) ? "✅" : "❌"} Uppercase letter
                </p>
                <p className={/[a-z]/.test(pwd) ? "text-green-600" : "text-red-500"}>
                  {/[a-z]/.test(pwd) ? "✅" : "❌"} Lowercase letter
                </p>
                <p className={/\d/.test(pwd) ? "text-green-600" : "text-red-500"}>
                  {/\d/.test(pwd) ? "✅" : "❌"} Number
                </p>
                <p className={/[!@#$%^&*]/.test(pwd) ? "text-green-600" : "text-red-500"}>
                  {/[!@#$%^&*]/.test(pwd) ? "✅" : "❌"} Special character
                </p>
                <p className={pwd.length >= 8 ? "text-green-600" : "text-red-500"}>
                  {pwd.length >= 8 ? "✅" : "❌"} Minimum 8 characters
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
              className="bg-gray-700 text-white px-3 py-2 rounded w-full"
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
          </div>

          {/* Save / Cancel */}
          <div className="flex gap-4 mt-4">
            <button
              type="button"
              onClick={handleSave}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => router.push("/campusesDashboard/profile")}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg"
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
