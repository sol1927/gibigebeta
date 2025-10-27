"use client";

import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useRouter } from "next/navigation";
import DeleteModal from "../components/DeleteModal";
import Image from "next/image";

export default function CampusesPage({ userType }) {
  const router = useRouter();

  const [campuses, setCampuses] = useState([
    {
      id: 1,
      name: "Main Campus",
      location: "Arba Minch",
      students: 1200,
      logo: "/logo.png",
    },
    {
      id: 2,
      name: "Engineering Campus",
      location: "Sikela",
      students: 900,
      logo: "/logo.png",
    },
    {
      id: 3,
      name: "Medical Campus",
      location: "Nech Sar",
      students: 600,
      logo: "/logo.png",
    },
  ]);

  const [loggedInCampus, setLoggedInCampus] = useState(
    userType === "campus" ? campuses[0] : null
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [deleteCampusId, setDeleteCampusId] = useState(null);
  const dropdownRefs = useRef({});
  const [showFooter, setShowFooter] = useState(false);

  const sortedCampuses = [...campuses]
    .filter((c) => c.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name));

  useEffect(() => {
    const handleScroll = () => setShowFooter(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !Object.values(dropdownRefs.current).some((ref) =>
          ref?.contains(e.target)
        )
      )
        setSelectedMenu(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDelete = (id) => {
    setSelectedMenu(null); // 👈 instantly close the dropdown
    setDeleteCampusId(id); // 👈 then show delete confirmation box
  };
  const confirmDelete = () => {
    setCampuses(campuses.filter((c) => c.id !== deleteCampusId));
    setDeleteCampusId(null);
  };
  const handleEdit = (id) => router.push(`/campuses/edit/${id}`);
  const handleViewDetails = (id) => router.push(`/campuses/${id}`);
  const handleAddCampus = () => router.push("/campuses/add");

  return (
    <div className="min-h-screen bg-black/50 text-white flex flex-col relative">
      <Navbar userType="campus" campusId={loggedInCampus?.id} />

      <div className="flex flex-col items-center py-28 px-6 w-full max-w-6xl mx-auto flex-grow">
        {userType === "campus" && loggedInCampus && (
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Welcome to {loggedInCampus.name}!
          </h2>
        )}

        <div className="w-full flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold text-white">🏫 Campuses</h1>
          <div className="flex gap-4 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search campuses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-700 text-white px-3 py-2 rounded w-full md:w-64"
            />
            <button
              onClick={handleAddCampus}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold"
            >
              + Add Campus
            </button>
          </div>
        </div>

        <div className="w-full bg-white/10 rounded-xl shadow-lg overflow-visible">
          <table className="w-full text-left">
            <thead className="bg-white/20 text-gray-200 uppercase text-sm">
              <tr>
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Logo</th>
                <th className="py-3 px-4">Campus Name</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Students</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedCampuses.map((campus, index) => (
                <tr
                  key={campus.id}
                  className="border-b border-gray-700 hover:bg-white/10 transition cursor-pointer"
                  onClick={(e) => {
                    if (e.target.closest("button") || e.target.closest("svg"))
                      return;
                    handleViewDetails(campus.id);
                  }}
                >
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-2 px-4">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-400 relative">
                      <Image
                        src={campus.logo}
                        alt={campus.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </td>
                  <td className="py-3 px-4">{campus.name}</td>
                  <td className="py-3 px-4">{campus.location}</td>
                  <td className="py-3 px-4">{campus.students}</td>
                  <td className="py-3 px-4 text-center relative">
                    <div ref={(el) => (dropdownRefs.current[campus.id] = el)}>
                      <button
                        onClick={() =>
                          setSelectedMenu(
                            selectedMenu === campus.id ? null : campus.id
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

                      {selectedMenu === campus.id && (
                        <div className="absolute right-0 mt-2 w-32 bg-gray-800 rounded-lg shadow-lg z-50">
                          <button
                            onClick={() => handleEdit(campus.id)}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-700 hover:cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(campus.id)}
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

              {sortedCampuses.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-6 text-gray-400 italic"
                  >
                    No campuses found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="h-[20vh]" />
      </div>

      <DeleteModal
        visible={deleteCampusId !== null}
        studentName={campuses.find((c) => c.id === deleteCampusId)?.name}
        onCancel={() => setDeleteCampusId(null)}
        onConfirm={confirmDelete}
      />

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
