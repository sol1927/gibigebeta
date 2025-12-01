"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Image from "next/image";
import ActionConfirmationModal from "@/app/components/ActionConfirmationModal";

export default function CampusDetailsPage() {
  const router = useRouter();
  const { id } = useParams();
  const campusId = parseInt(id);

  // Sample campus data; replace with API or DB fetch
  const allCampuses = [
    {
      id: 1,
      name: "Main Campus",
      location: "Arba Minch",
      students: 1200,
      logo: "/logo.png",
      email: "maincampus@amu.edu.et",
    },
    {
      id: 2,
      name: "Engineering Campus",
      location: "Sikela",
      students: 900,
      logo: "/logo.png",
      email: "engineering@amu.edu.et",
    },
    {
      id: 3,
      name: "Medical Campus",
      location: "Nech Sar",
      students: 600,
      logo: "/logo.png",
      email: "medical@amu.edu.et",
    },
  ];

  const campus = allCampuses.find((c) => c.id === campusId);
  const [showFooter, setShowFooter] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowFooter(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!campus)
    return <p className="text-center mt-20 text-white">Campus not found.</p>;

  // Handle edit action after password confirmation
  const handleConfirmEdit = () => {
    router.push(`/adminDashboard/campuses/edit/${campus.id}`);
    setShowActionModal(false);
  };

  return (
    <div className="min-h-screen bg-black/50 text-white flex flex-col relative">
      <Navbar />

      {/* Back Button */}
      <button
        type="button"
        onClick={() => router.push("/adminDashboard/campuses")}
        title="Back to Campuses List"
        className="fixed top-[90px] left-6 p-2 rounded-full hover:bg-blue-700 transition z-50"
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

      {/* Campus Profile Content */}
      <div className="flex flex-col items-center pt-44 px-6 md:px-12 flex-grow w-full space-y-8 text-xl">
        <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-gray-400 relative">
          <Image
            src={campus.logo}
            alt={campus.name}
            fill
            className="object-cover"
          />
        </div>
        <p className="text-3xl font-bold">{campus.name}</p>
        <div className="flex flex-col md:flex-row md:justify-center gap-12 text-lg">
          <div className="flex flex-col gap-2">
            <p>
              <strong>Location:</strong> {campus.location}
            </p>
            <p>
              <strong>Number of Students:</strong> {campus.students}
            </p>
            <p>
              <strong>Email:</strong> {campus.email}
            </p>
          </div>
        </div>
        {/* Edit Campus button triggers action modal */}
        <button
          type="button"
          onClick={() => setShowActionModal(true)}
          className="mt-6 bg-green-500 hover:bg-green-600 py-3 px-8 rounded-lg font-semibold text-xl"
        >
          Edit Campus
        </button>
        <div className="h-40" /> {/* Extra spacing for footer */}
      </div>

      {/* Action Confirmation Modal */}
      <ActionConfirmationModal
        show={showActionModal}
        adminPassword="1234" // Replace with real admin password
        itemName="Campus"
        actionType="edit"
        onConfirm={handleConfirmEdit}
        onCancel={() => setShowActionModal(false)}
      />

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
