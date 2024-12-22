import { Link, useLocation } from "react-router-dom";
import { MenuItems } from "../constants/HeaderMenu";

export default function Header({ backgroundColor }) {
  const location = useLocation();
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
        <div className="flex space-x-6 items-center">
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
      </nav>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#009dc4]/20" />
    </header>
  );
}
