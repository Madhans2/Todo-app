import { useState } from "react";
import { FaBell, FaEnvelope } from 'react-icons/fa';
import { MessageCircle, LogIn, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import NewTaskModal from "./NewTaskModal"; // ✅ Adjust path if needed

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <header className="w-full flex items-center justify-between p-4 bg-white shadow-md">
      <input
        type="text"
        placeholder="Write Your Note"
        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        onFocus={() => setIsModalOpen(true)}
      />
      <div className="flex items-center gap-4 ml-4">
        <div className="relative">
          <FaEnvelope className="text-xl text-gray-600 cursor-pointer" />
          <span className="absolute -top-2 -right-2 bg-indigo-500 text-white text-xs px-1.5 py-0.5 rounded-full">2</span>
        </div>
        <div className="relative">
          <FaBell className="text-xl text-gray-600 cursor-pointer" />
          <span className="absolute -top-2 -right-2 bg-indigo-500 text-white text-xs px-1.5 py-0.5 rounded-full">2</span>
        </div>

        <Link to="/login" className="text-gray-600 p-1 mt-3 hover:text-blue-500">
          <LogIn size={22} /> Login
        </Link>

        <Link to="/signin" className="text-gray-600 p-1 mt-3 hover:text-blue-500">
          <UserPlus size={22} /> Sign In
        </Link>
      </div>

      {/* Task Modal */}
      <NewTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onTaskSaved={() => {
          setIsModalOpen(false);
          window.location.reload(); // Replace with smarter state reload if possible
        }}
      />
    </header>
  );
}
