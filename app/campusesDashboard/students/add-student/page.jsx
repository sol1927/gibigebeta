"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

export default function AddStudent() {
  const router = useRouter();
  const [dragActive, setDragActive] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    department: "",
    idNumber: "",
    photo: null,
    fingerprintData: null,
    eyeData: null,
    idQRData: null,
  });

  const [previewPhoto, setPreviewPhoto] = useState(null);
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) setShowFooter(true);
      else setShowFooter(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScanFingerprint = () => {
    alert("Fingerprint scanner will be connected here in the future!");
  };

  const handleScanEye = () => {
    alert("Eye/iris scanner will be connected here in the future!");
  };

  const handleScanID = () => {
    alert("ID/QR scanner will be connected here in the future!");
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && name === "photo") {
      setForm({ ...form, photo: files[0] });
      setPreviewPhoto(URL.createObjectURL(files[0]));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Student Info:", form);
    alert("✅ Student added (frontend only). Check console!");
  };

  return (
    <div className="bg-black/50 min-h-screen flex flex-col justify-between items-center text-white overflow-hidden relative">
      <Navbar />

      {/* Back Button below Navbar and next to logo */}
      <button
        type="button"
        onClick={() => router.push("/students")}
        title="Back to Students"
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

      <div className="flex flex-col items-center pt-32 px-6 w-full max-w-2xl flex-grow text-white">
        <h1 className="text-4xl font-bold text-center mb-6">Add New Student</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full space-y-4"
        >
          {/* First & Last Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-gray-200 mb-1 font-medium">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                placeholder="Enter first name"
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-black/30 text-white placeholder-gray-400 border border-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-200 mb-1 font-medium">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                placeholder="Enter last name"
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-black/30 text-white placeholder-gray-400 border border-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          {/* Department */}
          <div className="flex flex-col">
            <label className="text-gray-200 mb-1 font-medium">Department</label>
            <input
              type="text"
              name="department"
              placeholder="Enter department"
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-black/30 text-white placeholder-gray-400 border border-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* ID Number */}
          <div className="flex flex-col">
            <label className="text-gray-200 mb-1 font-medium">ID Number</label>
            <input
              type="text"
              name="idNumber"
              placeholder="Enter ID number"
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-black/30 text-white placeholder-gray-400 border border-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Photo Upload */}
          <div className="flex flex-col space-y-2">
            <div className="flex flex-col space-y-2">
              <label className="text-gray-200 font-medium">Upload Photo</label>

              <div
                className={`flex flex-col items-center justify-center w-40 h-24 border-2 border-dashed rounded-lg cursor-pointer transition relative overflow-hidden ${
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
                onDrop={(e) => {
                  e.preventDefault();
                  setDragActive(false);
                  const file = e.dataTransfer.files[0];
                  if (file) {
                    setForm({ ...form, photo: file });
                    setPreviewPhoto(URL.createObjectURL(file));
                  }
                }}
                onClick={() => document.getElementById("photoInput").click()}
              >
                {previewPhoto ? (
                  <img
                    src={previewPhoto}
                    alt="Photo Preview"
                    className="object-cover w-full h-full rounded-lg"
                  />
                ) : (
                  <span className="text-gray-400 text-xs text-center px-2">
                    Click or drag & drop to upload
                  </span>
                )}

                <input
                  id="photoInput"
                  type="file"
                  name="photo"
                  accept="image/*"
                  className="hidden"
                  onChange={handleChange}
                />
              </div>

              {form.photo && (
                <p className="text-gray-300 text-xs text-center truncate w-40">
                  {form.photo.name}
                </p>
              )}
            </div>
          </div>

          {/* Scan Buttons */}
          <div className="space-y-4">
            <div className="flex flex-col">
              <label className="text-gray-200 font-medium">Fingerprint</label>
              <button
                type="button"
                onClick={handleScanFingerprint}
                className="mt-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 hover:cursor-pointer rounded-lg shadow-md transition"
              >
                Scan Fingerprint
              </button>
            </div>

            <div className="flex flex-col">
              <label className="text-gray-200 font-medium">Eye / Iris</label>
              <button
                type="button"
                onClick={handleScanEye}
                className="mt-1 px-4 py-2 bg-green-600 hover:bg-green-700 hover:cursor-pointer rounded-lg shadow-md transition"
              >
                Scan Eye
              </button>
            </div>

            <div className="flex flex-col">
              <label className="text-gray-200 font-medium">ID Card / QR</label>
              <button
                type="button"
                onClick={handleScanID}
                className="mt-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 hover:cursor-pointer rounded-lg shadow-md transition"
              >
                Scan ID / QR
              </button>
            </div>
          </div>

          {/* Submit Button Only */}
          <div className="flex justify-center w-full max-w-md mx-auto mt-8">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 hover:cursor-pointer rounded-lg shadow-md transition-all"
            >
              Add Student
            </button>
          </div>
        </form>

        <div className="h-[20vh]"></div>
      </div>

      {/* Smooth slide-up Footer */}
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
