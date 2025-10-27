"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AdminDashboard() {
  const router = useRouter();
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);
  const [welcomeFadeClass, setWelcomeFadeClass] = useState("");
  const [showDashboard, setShowDashboard] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    if (showWelcomeScreen) {
      const fadeOutTimer = setTimeout(
        () => setWelcomeFadeClass("fade-out"),
        3000
      );
      const showDashboardTimer = setTimeout(() => {
        setShowWelcomeScreen(false);
        setShowDashboard(true);
        setTimeout(() => setShowLogo(true), 100);
        setTimeout(() => setShowTitle(true), 700);
        setTimeout(() => setShowButtons(true), 1300);
      }, 6000);
      return () => {
        clearTimeout(fadeOutTimer);
        clearTimeout(showDashboardTimer);
      };
    } else {
      setShowDashboard(true);
      setShowLogo(true);
      setShowTitle(true);
      setShowButtons(true);
    }
  }, [showWelcomeScreen]);

  useEffect(() => {
    const handleScroll = () => setShowFooter(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-black/50 min-h-screen flex flex-col justify-between items-center text-white overflow-hidden relative">
      <Navbar userType="admin" />

      {showWelcomeScreen && (
        <div
          className={`fixed inset-0 z-30 flex items-center justify-center bg-black/50 ${welcomeFadeClass}`}
        >
          <p className="text-4xl font-bold text-white opacity-0 animate-fadeIn">
            Welcome to Arbaminch University!
          </p>
        </div>
      )}

      {showDashboard && (
        <div className="flex flex-col items-center pt-44 px-8 w-full max-w-3xl grow">
          {showLogo && (
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-gray-400 mb-4 relative animate-fadeIn">
              <Image
                src="/logo.png"
                alt="Dashboard Logo"
                fill
                className="object-cover"
              />
            </div>
          )}

          {showTitle && (
            <h1 className="text-4xl font-bold text-center mb-6 text-gray-200 animate-fadeIn">
              Arbaminch University
            </h1>
          )}

          <div className="h-[25vh]"></div>

          {showButtons && (
            <div className="flex flex-col sm:flex-row justify-center gap-20 mb-8 animate-sequential">
              <button
                onClick={() => router.push("/campuses")}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition"
              >
                Campuses
              </button>
            </div>
          )}

          <div className="h-[20vh]"></div>
        </div>
      )}

      <div
        className={`fixed bottom-4 left-0 w-full transition-transform duration-300 ${
          showFooter ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <Footer />
      </div>

      <style jsx>{`
        .fade-out {
          opacity: 1;
          animation: fadeOut 2s ease-out forwards;
        }
        .animate-fadeIn {
          animation: fadeIn 2s ease-in forwards;
        }
        .animate-sequential {
          opacity: 0;
          animation: fadeInSequential 0.6s ease forwards;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
        @keyframes fadeInSequential {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
