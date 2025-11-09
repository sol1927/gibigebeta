"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import DeleteModal from "../../components/DeleteModal";

const StudentsListPage = () => {
  const router = useRouter();
  const [selectedMenu, setSelectedMenu] = useState(null);
  const dropdownRefs = useRef({});
  const [showFooter, setShowFooter] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteStudentId, setDeleteStudentId] = useState(null);

  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Solomon Aragaw",
      department: "Software Engineering",
      idNumber: "NSR/2022/14",
      photo: "/Solomon.jpg",
    },
    {
      id: 2,
      name: "Mekdes Fekadu",
      department: "Information Technology",
      idNumber: "NSR/2021/15",
      photo: "/mekdes.jpg",
    },
    {
      id: 3,
      name: "Abel Getachew",
      department: "Computer Science",
      idNumber: "NSR/2023/16",
      photo: "/abel.jpg",
    },
    {
      id: 4,
      name: "Tadesse Alemu",
      department: "Software Engineering",
      idNumber: "NSR/2022/17",
      photo: "/tadesse.jpg",
    },
  ]);

  // Sort students alphabetically
  const sortedStudents = [...students].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const filteredStudents = sortedStudents.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.idNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      const refs = Object.values(dropdownRefs.current);
      if (!refs.some((ref) => ref?.contains(event.target))) {
        setSelectedMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Show footer on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setShowFooter(true);
      else setShowFooter(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDelete = (id) => {
    setDeleteStudentId(id);
    setSelectedMenu(null);
  };

  const confirmDelete = () => {
    setStudents(students.filter((s) => s.id !== deleteStudentId));
    setDeleteStudentId(null);
  };

  const handleEdit = (id) => {
    router.push(`/students/edit/${id}`);
  };

  const handleViewStudent = (id) => {
    router.push(`/students/${id}`);
  };

  return (
    <div className="min-h-screen bg-black/50 text-white flex flex-col relative">
      <Navbar />

      {/* Back Button */}
      <button
        type="button"
        onClick={() => router.push("/campusesDashboard")}
        title="Back to Dashboard"
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

      <div className="flex flex-col items-center py-24 px-6 w-full max-w-5xl mx-auto flex-grow">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 w-full gap-3">
          <h1 className="text-3xl font-bold text-white">Students List</h1>

          {/* Search bar and Add button together */}
          <div className="flex gap-3 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search students..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
            />
            <button
              onClick={() => router.push("/students/add-student")}
              className="bg-green-500 hover:bg-green-600 hover:cursor-pointer text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition"
            >
              Add Student
            </button>
          </div>
        </div>

        <div className="w-full bg-white/10 rounded-xl shadow-lg overflow-visible">
          <table className="w-full text-left">
            <thead className="bg-white/20 text-gray-200 uppercase text-sm">
              <tr>
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Photo</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">ID Number</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, index) => (
                <tr
                  key={student.id}
                  className="border-b border-gray-700 hover:bg-white/10 transition cursor-pointer"
                  onClick={(e) => {
                    if (e.target.closest("button") || e.target.closest("svg"))
                      return;
                    handleViewStudent(student.id);
                  }}
                >
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-2 px-4">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-400 relative">
                      <Image
                        src={student.photo}
                        alt={student.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </td>
                  <td className="py-3 px-4">{student.name}</td>
                  <td className="py-3 px-4">{student.department}</td>
                  <td className="py-3 px-4">{student.idNumber}</td>
                  <td className="py-3 px-4 text-center relative">
                    <div ref={(el) => (dropdownRefs.current[student.id] = el)}>
                      <button
                        onClick={() =>
                          setSelectedMenu(
                            selectedMenu === student.id ? null : student.id
                          )
                        }
                        className="p-2 hover:bg-white/20 rounded-full transition"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-gray-300 hover:text-white transition"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <circle cx="12" cy="5" r="1.5" />
                          <circle cx="12" cy="12" r="1.5" />
                          <circle cx="12" cy="19" r="1.5" />
                        </svg>
                      </button>

                      {selectedMenu === student.id && (
                        <div className="absolute right-0 mt-2 w-32 bg-gray-800 rounded-lg shadow-lg z-50">
                          <button
                            onClick={() => handleEdit(student.id)}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-700 hover:cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(student.id)}
                            className="block w-full text-left px-4 py-2 text-red-400 hover:bg-gray-700 hover:cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {filteredStudents.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-6 text-gray-400 italic"
                  >
                    No students found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="h-[20vh]" />
      </div>

      {/* Delete Modal */}
      <DeleteModal
        visible={deleteStudentId !== null}
        studentName={students.find((s) => s.id === deleteStudentId)?.name}
        onCancel={() => setDeleteStudentId(null)}
        onConfirm={confirmDelete}
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
};

export default StudentsListPage;
