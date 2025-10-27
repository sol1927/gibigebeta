import { useState, useEffect, useRef } from "react";

export default function DeleteModal({ visible, studentName, onCancel, onConfirm }) {
  const modalRef = useRef();
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500); // match animation duration
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
        {/* Modal */}
        <div
          ref={modalRef}
          className={`bg-gradient-to-br from-red-900 to-gray-900  text-white p-6 rounded-2xl w-80 text-center shadow-2xl transform transition-all ${isShaking ? "shake" : ""}`}
        >
          <h2 className="text-2xl font-bold mb-4">Delete {studentName}?</h2>
          <p className="mb-6 text-gray-200">This action cannot be undone!</p>
          <div className="flex justify-around">
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-white text-red-600 font-semibold rounded-lg shadow hover:bg-gray-200 transition"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-800 text-white font-semibold rounded-lg shadow hover:bg-red-900 transition"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Shake Animation */}
      <style jsx>{`
        .shake {
          animation: shake 0.5s ease-in-out;
        }

        @keyframes shake {
          0%   { transform: translateX(0) rotate(0deg) scale(1); }
          15%  { transform: translateX(-5px) rotate(-2deg) scale(1.02); }
          30%  { transform: translateX(5px) rotate(2deg) scale(1.02); }
          45%  { transform: translateX(-5px) rotate(-2deg) scale(1.02); }
          60%  { transform: translateX(5px) rotate(2deg) scale(1.02); }
          75%  { transform: translateX(-3px) rotate(-1deg) scale(1.01); }
          90%  { transform: translateX(3px) rotate(1deg) scale(1.01); }
          100% { transform: translateX(0) rotate(0deg) scale(1); }
        }
      `}</style>
    </>
  );
}
