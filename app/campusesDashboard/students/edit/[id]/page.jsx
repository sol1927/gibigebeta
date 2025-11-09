"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import Image from "next/image";

export default function EditStudentPage() {
  const router = useRouter();
  const { id } = useParams();
  const studentId = parseInt(id);

  const allStudents = [
    {
      id: 1,
      name: "Solomon Aragaw",
      department: "Software Engineering",
      idNumber: "2022",
      photo: "/Solomon.jpg",
      email: "solomon@example.com",
      fingerprint: "FP-001",
      iris: "IRIS-001",
      idCard: "CARD-001",
    },
    {
      id: 2,
      name: "Mekdes Fekadu",
      department: "Information Technology",
      idNumber: "2021",
      photo: "/mekdes.jpg",
      email: "mekdes@example.com",
      fingerprint: "FP-002",
      iris: "IRIS-002",
      idCard: "CARD-002",
    },
    {
      id: 3,
      name: "Abel Getachew",
      department: "Computer Science",
      idNumber: "2023",
      photo: "/abel.jpg",
      email: "abel@example.com",
      fingerprint: "FP-003",
      iris: "IRIS-003",
      idCard: "CARD-003",
    },
    {
      id: 4,
      name: "Tadesse Alemu",
      department: "Software Engineering",
      idNumber: "2022",
      photo: "/tadesse.jpg",
      email: "tadesse@example.com",
      fingerprint: "FP-004",
      iris: "IRIS-004",
      idCard: "CARD-004",
    },
  ];

  const studentData = allStudents.find((s) => s.id === studentId);

  const [formData, setFormData] = useState(studentData);
  const [previewPhoto, setPreviewPhoto] = useState(studentData?.photo || "");
  const [showFooter, setShowFooter] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  if (!studentData)
    return <p className="text-center mt-20">Student not found.</p>;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0] && name === "photo") {
      const file = files[0];
      setPreviewPhoto(URL.createObjectURL(file));
      setFormData({ ...formData, photo: file });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleDragDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setPreviewPhoto(URL.createObjectURL(file));
      setFormData({ ...formData, photo: file });
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert("Student updated: " + JSON.stringify(formData));
    router.push("/students");
  };

  useEffect(() => {
    const handleScroll = () => setShowFooter(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black/50 text-white flex flex-col relative">
      <Navbar />

      {/* Back Button */}
      <button
        type="button"
        onClick={() => router.push("/students")}
        title="Back to Students List"
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

      <div className="flex flex-col items-center py-20 px-6 flex-grow w-full max-w-3xl mx-auto pb-32">
        <h1 className="text-3xl font-bold mb-10">Edit Student</h1>

        <form
          className="w-full bg-white/10 p-8 rounded-xl shadow-lg flex flex-col gap-6"
          onSubmit={handleSave}
        >
          {/* Photo Drag & Drop */}
          <div className="flex flex-col items-start gap-2">
            <label className="font-semibold">Photo</label>
            <div
              className={`flex items-center justify-center w-20 h-20 rounded-full overflow-hidden border-2 border-dashed relative cursor-pointer ${
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
              onClick={() => document.getElementById("photoInput").click()}
            >
              {previewPhoto && (
                <Image
                  src={previewPhoto}
                  alt="Photo Preview"
                  fill
                  className="object-cover"
                />
              )}
              {!previewPhoto && (
                <span className="text-gray-400 text-xs text-center px-2">
                  Click or drag & drop
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
            {formData.photo && typeof formData.photo !== "string" && (
              <p className="text-gray-300 text-xs truncate w-20 text-center">
                {formData.photo.name}
              </p>
            )}
          </div>

          {/* Name */}
          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="bg-gray-700 text-white px-3 py-2 rounded w-full"
            />
          </div>

          {/* Department */}
          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Department</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="bg-gray-700 text-white px-3 py-2 rounded w-full"
            />
          </div>

          {/* ID Number */}
          <div className="flex flex-col">
            <label className="mb-1 font-semibold">ID Number</label>
            <input
              type="text"
              name="idNumber"
              value={formData.idNumber}
              onChange={handleChange}
              className="bg-gray-700 text-white px-3 py-2 rounded w-full"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-gray-700 text-white px-3 py-2 rounded w-full"
            />
          </div>

          {/* Fingerprint */}
          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Fingerprint</label>
            <button
              type="button"
              onClick={() =>
                alert(
                  "Fingerprint scanner will be connected here in the future!"
                )
              }
              className="mt-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 hover:cursor-pointer rounded-lg shadow-md transition"
            >
              Scan Fingerprint
            </button>
          </div>

          {/* Eye / Iris */}
          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Eye / Iris</label>
            <button
              type="button"
              onClick={() =>
                alert("Eye/iris scanner will be connected here in the future!")
              }
              className="mt-1 px-4 py-2 bg-green-600 hover:bg-green-700 hover:cursor-pointer rounded-lg shadow-md transition"
            >
              Scan Eye / Iris
            </button>
          </div>

          {/* ID / QR */}
          <div className="flex flex-col">
            <label className="mb-1 font-semibold">ID Card / QR</label>
            <button
              type="button"
              onClick={() =>
                alert("ID/QR scanner will be connected here in the future!")
              }
              className="mt-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 hover:cursor-pointer rounded-lg shadow-md transition"
            >
              Scan ID / QR
            </button>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-4">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 hover:cursor-pointer text-white py-2 px-4 rounded-lg font-semibold"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => router.push("/students")}
              className="bg-red-500 hover:bg-red-600 hover:cursor-pointer text-white py-2 px-4 rounded-lg font-semibold"
            >
              Cancel
            </button>
          </div>
        </form>
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
