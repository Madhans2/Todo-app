import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTasks, FaPlus } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import image2 from "../assets/dpimage.png";
import {
  FiUser,
  FiEdit3,
  FiSettings,
  FiShield,
  FiLogOut,
} from "react-icons/fi";

import image from "../assets/450.jpg";
import NewTaskModal from "./NewTaskModal";

export default function Sidebar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const userName = localStorage.getItem("userName") || "Guest User";
  const userPicture =
    localStorage.getItem("userPicture") || image2 ;

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    alert("Logged out!");
    navigate("/login");
  };

  return (
    <aside className="w-64 bg-white shadow h-screen p-4 flex flex-col relative">
      {/* Logo */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-gray-900 p-2 rounded-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5h6M9 12h6m-7 7h8"
            />
          </svg>
        </div>
        <h1 className="text-xl font-bold text-gray-800">NotePlus todo</h1>
      </div>

      <hr className="border-gray-300 mb-4" />

      {/* User Info Dropdown */}
      <div className="relative mb-6" ref={dropdownRef}>
        <div
          onClick={() => setShowDropdown((prev) => !prev)}
          className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
        >
          <img
            src={userPicture}
            alt="User Avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1">
            <p className="text-sm font-semibold">{userName}</p>
          </div>
          <MdKeyboardArrowDown className="text-gray-500" />
        </div>

        {showDropdown && (
          <div className="absolute z-10 mt-2 w-56 bg-white border rounded-lg shadow-lg right-0">
            <ul className="text-sm text-gray-700">
              <li
                onClick={() => navigate("/profile")}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <FiUser /> My Profile
              </li>
              <li
                onClick={() => navigate("/profile/edit")}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <FiEdit3 /> Edit Profile
              </li>
              <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer">
                <FiSettings /> Account Settings
              </li>
              <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer">
                <FiShield /> Privacy Settings
              </li>
              <hr />
              <li
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600"
              >
                <FiLogOut /> Logout
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        <ul className="space-y-3">
          <li>
            <Link
              to="/"
              className="flex items-center gap-2 text-gray-700 font-medium hover:text-blue-600"
            >
              <FaTasks /> Dashboard
            </Link>
          </li>

          <li>
            <button
              className="flex items-center gap-2 mt-2 text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg w-full"
              onClick={() => setIsModalOpen(true)}
            >
              <FaPlus /> New Task
            </button>
          </li>

          <li>
            <Link
              to="/notes"
              className="flex items-center gap-2 pt-5 text-gray-700 font-medium hover:text-blue-600"
            >
              <FaTasks /> Your Notes
            </Link>
          </li>

          <li>
            <Link
              to="/reminders"
              className="flex items-center gap-2 pt-5 text-gray-700 font-medium hover:text-blue-600"
            >
              <FaTasks /> Reminder
            </Link>
          </li>

          <li>
            <Link
              to="/notes/private"
              className="flex items-center gap-2 pt-5 text-gray-700 font-medium hover:text-yellow-500"
            >
              <FaTasks /> Private Notes
            </Link>
          </li>

          <li>
            <img className="pt-10 h-72 w-auto" src={image} alt="illustration" />
          </li>
        </ul>
      </nav>

      {/* New Task Modal */}
      <NewTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onTaskSaved={() => {
          setIsModalOpen(false);
          window.location.reload(); // Optional: Replace with state-based update
        }}
      />
    </aside>
  );
}
