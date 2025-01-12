import React, { useState } from "react";
import AdminUsersPage from "../../components/Admin/UserListing";
import { Sidebar } from "../../components/Admin/Sidebar.jsx";
import { AdminItems } from "../../constants/AdminMenu.js";
import { useLocation, useNavigate, Link } from "react-router-dom";

// Modal Component
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg relative w-full max-w-lg max-sm:min-w-[60%] max-sm:mx-4 max-sm:h-[20rem] max-sm:overflow-scroll">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

const AdminUsers = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedUser, setSelectedUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState("");

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("admintoken");
    navigate("/admin/login");
  };

  const openFeedbackModal = (feedback) => {
    setSelectedFeedback(feedback);
    setIsModalOpen(true);
  };

  const closeFeedbackModal = () => {
    setIsModalOpen(false);
    setSelectedFeedback("");
  };

  return (
    <div>
      <div className="flex bg-gray-100 overflow-x-hidden">
        {localStorage.getItem("admintoken") ? (
          <>
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Header */}
              <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto py-4 px-6 flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src="/gyro_logo.jpg"
                      alt="Restaurant Logo"
                      width={40}
                      height={40}
                      className="mr-4"
                    />
                    <h1 className="text-sm font-medium text-gray-900">
                      User Panel
                    </h1>
                  </div>
                  <button
                    className="bg-gray-500 p-2 rounded-md text-white max-sm:hidden"
                    onClick={handleLogout}
                    type="button"
                  >
                    Logout
                  </button>
                  <button
                    className="block sm:hidden text-black focus:outline-none"
                    onClick={toggleMobileMenu}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={
                          isMobileMenuOpen
                            ? "M6 18L18 6M6 6l12 12"
                            : "M4 6h16M4 12h16m-16 6h16"
                        }
                      />
                    </svg>
                  </button>
                </div>
              </header>

              {/* Main Content */}
              <div className="p-6">
                <AdminUsersPage
                  setIsModalOpen={setIsModalOpen}
                  selectedUser={selectedUser}
                  setSelectedUser={setSelectedUser}
                />
              </div>
            </div>
          </>
        ) : (
          navigate("/admin/login")
        )}
        {isMobileMenuOpen && (
          <div className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 flex items-center justify-center z-40">
            <div className="bg-white rounded-lg w-4/5 p-5">
              <button
                className="absolute top-5 right-5 text-black"
                onClick={toggleMobileMenu}
              >
                Close
              </button>
              <ul className="space-y-4">
                {AdminItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      to={item.link}
                      className="text-sm font-bold uppercase block text-black hover:text-gray-700 transition-colors"
                      onClick={
                        item.title === "Logout"
                          ? handleLogout
                          : toggleMobileMenu
                      }
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Feedback Modal */}
        <Modal isOpen={isModalOpen} onClose={closeFeedbackModal}>
          <h2 className="text-lg font-bold">Client Feedback</h2>
          <p>{selectedFeedback || "No feedback available"}</p>

          {selectedUser && (
            <div className="mt-4 border p-4 rounded-md bg-gray-100">
              <p>
                <strong>Email:</strong> {selectedUser.email}
              </p>
            </div>
          )}
          <button
            className="mt-4 bg-gray-500 text-white py-2 px-4 rounded"
            onClick={closeFeedbackModal}
          >
            Close
          </button>
        </Modal>
      </div>
    </div>
  );
};

export default AdminUsers;
