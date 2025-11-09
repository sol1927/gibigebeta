"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import Image from "next/image";

export default function EditCampusPage() {
  const router = useRouter();
  const { id } = useParams();
  const campusId = parseInt(id);

  const allCampuses = [
    { id: 1, name: "Main Campus", location: "Arba Minch", students: 1200, logo: "/logo.png" },
    { id: 2, name: "Engineering Campus", location: "Sikela", students: 900, logo: "/logo.png" },
    { id: 3, name: "Medical Campus", location: "Nech Sar", students: 600, logo: "/logo.png" },
  ];

  const campusData = allCampuses.find((c) => c.id === campusId);
  const [formData, setFormData] = useState(campusData || {});
  const [previewLogo, setPreviewLogo] = useState(campusData?.logo || "");
  const [showFooter, setShowFooter] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  if (!campusData) return <p className="text-center mt-20">Campus not found.</p>;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      setPreviewLogo(URL.createObjectURL(file));
      setFormData({ ...formData, logo: file });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSuccessMessage(true);

    // Automatically redirect after 2 seconds
    setTimeout(() => {
      setSuccessMessage(false);
      router.push("/adminDashboard/campuses");
    }, 2000);

    // In real app, here you would call API to update DB
  };

  useEffect(() => {
    const handleScroll = () => setShowFooter(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black/50 text-white flex flex-col relative">
      <Navbar />

      <button
        type="button"
        onClick={() => router.push("/adminDashboard/campuses")}
        title="Back to Campuses"
        className="fixed top-[90px] left-6 p-2 rounded-full hover:bg-blue-700 z-50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div className="flex flex-col items-center py-20 px-6 flex-grow w-full max-w-3xl mx-auto pb-32">
        <h1 className="text-3xl font-bold mb-10">Edit Campus</h1>

        {/* Success Box */}
        {successMessage && (
          <div className="bg-green-500 text-white px-4 py-2 rounded shadow-md mb-4 animate-fadeInOut">
            Campus updated successfully!
          </div>
        )}

        <form className="w-full bg-white/10 p-8 rounded-xl shadow-lg flex flex-col gap-6" onSubmit={handleSave}>
          {/* Logo Upload */}
          <div className="flex flex-col items-start gap-2">
            <label className="font-semibold">Logo</label>
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-dashed relative cursor-pointer" onClick={() => document.getElementById("logoInput").click()}>
              {previewLogo && <Image src={previewLogo} fill className="object-cover" alt="Campus Logo" />}
              {!previewLogo && <span className="text-gray-400 text-xs text-center px-2">Click to upload</span>}
              <input type="file" id="logoInput" accept="image/*" className="hidden" onChange={handleChange} />
            </div>
          </div>

          <input type="text" name="name" value={formData.name} onChange={handleChange} className="bg-gray-700 text-white px-3 py-2 rounded w-full" placeholder="Campus Name" />
          <input type="text" name="location" value={formData.location} onChange={handleChange} className="bg-gray-700 text-white px-3 py-2 rounded w-full" placeholder="Location" />
          <input type="number" name="students" value={formData.students} onChange={handleChange} className="bg-gray-700 text-white px-3 py-2 rounded w-full" placeholder="Number of Students" />

          <div className="flex gap-4 mt-4">
            <button type="submit" className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-semibold">Save</button>
            <button type="button" onClick={() => router.push("/adminDashboard/campuses")} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-semibold">Cancel</button>
          </div>
        </form>
      </div>

      {/* Footer */}
      <div className={`fixed bottom-4 left-0 w-full transition-transform duration-300 ${showFooter ? "translate-y-0" : "translate-y-full"}`}>
        <Footer />
      </div>

      <style jsx>{`
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translateY(-10px); }
          10% { opacity: 1; transform: translateY(0); }
          90% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-10px); }
        }
        .animate-fadeInOut {
          animation: fadeInOut 2s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
}
