import React from "react";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
function LogoutButton() {
  const navigate = useNavigate();
  const handleLogout = () => {
    // Implement logout logic here
    localStorage.removeItem("token");
    navigate("/login");
    console.log("Logging out...");
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 border px-4 py-2 rounded hover:bg-gray-100"
    >
      <LogOut className="h-4 w-4" />
      Logout
    </button>
  );
}

export default LogoutButton;
