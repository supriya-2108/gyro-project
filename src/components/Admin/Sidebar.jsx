import { Home, ShoppingBag, Users, Settings } from "lucide-react";
import { Link } from "react-router-dom";

export function Sidebar() {
  return (
    <div className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out max-sm:hidden">
      <nav>
        <Link
          to="/admin/dashboard"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
        >
          <Home className="inline-block mr-2 w-5 h-5" /> Dashboard
        </Link>
        <Link
          to="/admin/productList"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
        >
          <ShoppingBag className="inline-block mr-2 w-5 h-5" /> Products
        </Link>
        <Link
          to="/admin/users"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
        >
          <Users className="inline-block mr-2 w-5 h-5" /> Users
        </Link>
        <Link
          to="/admin/settings"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
        >
          <Settings className="inline-block mr-2 w-5 h-5" /> Settings
        </Link>
      </nav>
    </div>
  );
}
