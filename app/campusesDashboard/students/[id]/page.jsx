"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Image from "next/image";

export default function StudentDetailsPage() {
  const router = useRouter();
  const { id } = useParams();
  const studentId = parseInt(id);

  // Mock data
  const allStudents = [
    {
      id: 1,
      name: "Solomon Aragaw",
      department: "Software Engineering",
      idNumber: "NSR/2022/14",
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
      idNumber: "NSR/2021/15",
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
      idNumber: "NSR/2023/16",
      photo: "/abel.jpg",
      email: "abel@example.com",
      fingerprint: "FP-003",
      iris: "IRIS-003",
      idCard: "CARD-003",
    },
  ];

  const student = allStudents.find((s) => s.id === studentId);
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowFooter(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!student)
    return <p className="text-center mt-20 text-white">Student not found.</p>;

  return (
    <div className="min-h-screen bg-black/50 text-white flex flex-col relative">
      <Navbar />

      {/* Back Button */}
      <button
        type="button"
        onClick={() => router.push("/students")}
        title="Back to Students List"
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

      {/* Scrollable Profile-style Content */}
      <div className="flex flex-col items-center pt-44 px-6 md:px-12 flex-grow w-full space-y-8 text-xl">
        <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-gray-400 relative">
          <Image
            src={student.photo}
            alt={student.name}
            fill
            className="object-cover"
          />
        </div>
        <p className="text-3xl font-bold">{student.name}</p>
        <div className="flex flex-col md:flex-row md:justify-center gap-12 text-lg">
          <div className="flex flex-col gap-2">
            <p>
              <strong>Department:</strong> {student.department}
            </p>
            <p>
              <strong>ID Number:</strong> {student.idNumber}
            </p>
            <p>
              <strong>Email:</strong> {student.email}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p>
              <strong>Fingerprint:</strong> {student.fingerprint}
            </p>
            <p>
              <strong>Iris:</strong> {student.iris}
            </p>
            <p>
              <strong>ID Card:</strong> {student.idCard}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => router.push(`/students/edit/${student.id}`)}
          className="mt-6 bg-blue-600 hover:bg-blue-700 py-3 px-8 rounded-lg font-semibold text-xl"
        >
          Edit Student
        </button>
        <div className="h-40" /> {/* Extra spacing for footer */}
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
