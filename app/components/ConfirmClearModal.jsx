import React, { useEffect, useRef, useState } from "react";

const ConfirmClearModal = ({ show, onConfirm, onCancel }) => {
  const modalRef = useRef(null);
  const [shake, setShake] = useState(false);

  // Always attach the effect
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        modalRef.current.classList.remove("animate-shake");
        void modalRef.current.offsetWidth; // trigger reflow
        modalRef.current.classList.add("animate-shake");
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  if (!show) return null; // Only hide JSX, hooks are already called

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100]">
      <div
        ref={modalRef}
        className={`bg-gray-800 p-8 rounded-xl shadow-2xl max-w-sm w-full border border-red-500/50 transform ${
          shake ? "animate-shake" : "animate-scaleUp"
        }`}
      >
        <h2 className="text-2xl font-bold text-red-400 mb-4">
          Confirm Clear Data
        </h2>
        <p className="text-gray-300 mb-6">
          Are you sure you want to clear the <b>Scanned Students Count</b> and
          the <b>Last Scanned Student</b> record? This action cannot be undone.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onCancel}
            className="bg-gray-600 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Yes
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes scaleUp {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes shake {
          0% {
            transform: translateX(0);
          }
          20% {
            transform: translateX(-8px);
          }
          40% {
            transform: translateX(8px);
          }
          60% {
            transform: translateX(-6px);
          }
          80% {
            transform: translateX(6px);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-scaleUp {
          animation: scaleUp 0.3s ease-out forwards;
        }

        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default ConfirmClearModal;
