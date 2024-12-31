import React, { useState } from "react";
import LogoutButton from "../components/Logout";
import OrderHistory from "../components/OrderHistory";
import UserProfile from "../components/UserProfile";
import Header from "../components/Header";

function MyAccountPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="container">
      <Header backgroundColor={"bg-gray-800 relative"} />

      <div className="max-w-5xl py-16 px-4 mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Account</h1>
          <LogoutButton />
        </div>

        {/* Tabs Section */}
        <div className="space-y-6">
          <div className="flex space-x-4 border-b pb-2">
            <button
              className={`px-4 py-2 ${
                activeTab === "profile"
                  ? "border-b-2 border-black"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("profile")}
            >
              Profile
            </button>
            <button
              className={`px-4 py-2 ${
                activeTab === "orders"
                  ? "border-b-2 border-black"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("orders")}
            >
              Order History
            </button>
          </div>

          <div>
            {activeTab === "profile" && <UserProfile />}
            {activeTab === "orders" && <OrderHistory />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyAccountPage;
