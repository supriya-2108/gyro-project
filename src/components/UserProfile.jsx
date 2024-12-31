import React, { useEffect, useState } from "react";

function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, City, State 12345",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    // Handle form submission
    console.log("Form submitted:", formData);
  };
  useEffect(() => {
    let emailId = localStorage.getItem("useremail");
    setFormData((prev) => ({
      ...prev,
      email: JSON.parse(emailId),
    }));
  }, []);
  return (
    <div className="border p-6 rounded-md shadow-md bg-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Profile Information</h2>
        <button
          className={`px-4 py-2 rounded-md ${
            isEditing
              ? "bg-gray-200 text-gray-700"
              : "border bg-white text-gray-700 hover:bg-gray-50"
          }`}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          {/* <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              id="name"
              value={formData.name}
              disabled={!isEditing}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="block w-full border rounded-md px-3 py-2 focus:ring focus:ring-blue-200 disabled:bg-gray-100"
            />
          </div> */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              disabled={!isEditing}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="block w-full border rounded-md px-3 py-2 focus:ring focus:ring-blue-200 disabled:bg-gray-100"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone
            </label>
            <input
              id="phone"
              value={formData.phone}
              disabled={!isEditing}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="block w-full border rounded-md px-3 py-2 focus:ring focus:ring-blue-200 disabled:bg-gray-100"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <input
              id="address"
              value={formData.address}
              disabled={!isEditing}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              className="block w-full border rounded-md px-3 py-2 focus:ring focus:ring-blue-200 disabled:bg-gray-100"
            />
          </div>
        </div>
        {isEditing && (
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Save Changes
          </button>
        )}
      </form>
    </div>
  );
}

export default UserProfile;
