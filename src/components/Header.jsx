import { Link, useLocation } from "react-router-dom";
import { MenuItems } from "../constants/HeaderMenu";
import { useState } from "react";

export default function Header({ backgroundColor }) {
  const location = useLocation();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`py-4 w-full  z-50 text-[#3d3b3a] flex flex-col justify-between !items-center ${backgroundColor} `}
    >
      <nav className="flex justify-between w-[80%] mx-auto">
        <img
          src="/gyro_logo.jpg"
          alt="Restaurant Logo"
          width={60}
          height={40}
          className="mr-4"
        />
        <div className="flex space-x-6 items-center max-sm:hidden">
          {MenuItems.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className={`text-sm font-bold uppercase ${
                location.pathname !== "/" ? "text-white" : "text-black"
              } hover:text-gray-300 transition-colors ${
                item.title === "Order Online"
                  ? "bg-[#009dc4] p-3 rounded-md text-white"
                  : ""
              }`}
            >
              {item.title}
            </Link>
          ))}
        </div>
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
      </nav>

      {/* Mobile Menu */}
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
              {MenuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.link}
                    className={`text-sm font-bold uppercase block ${
                      location.pathname !== "/" ? "text-black" : "text-black"
                    } hover:text-gray-300 transition-colors ${
                      item.title === "Order Online"
                        ? "bg-[#009dc4] p-3 rounded-md text-white"
                        : ""
                    }`}
                    onClick={toggleMobileMenu}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#009dc4]/20" />
    </header>
  );
}
