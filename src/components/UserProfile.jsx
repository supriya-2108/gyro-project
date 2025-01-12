import axios from "axios";
import React, { useEffect, useState } from "react";

function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [userId, setUserId] = useState();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsEditing(false);
    console.log("Form submitted:", formData);
    try {
      let res = await axios.put(
        `https://gyroserver.vercel.app/user/v1/operation/update_user_profile/${userId}`,
        {
          name: formData.name,
          email: formData.email,
          number: formData.phone,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status == 200) {
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    let res = localStorage.getItem("token");
    let id = JSON.parse(res);
    setUserId(id);
    const getUserInfo = async () => {
      let res1 = await axios(
        `https://gyroserver.vercel.app/user/v1/operation/get_user_profile/${id}`
      );
      if (res1.data.user) {
        let user = res1.data.user;
        setFormData({
          email: user.email,
          name: user.name,
          phone: user.number,
        });
      }
    };
    getUserInfo();
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
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="name"
              type="name"
              value={formData.name}
              disabled={!isEditing}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="block w-full border rounded-md px-3 py-2 focus:ring focus:ring-blue-200 disabled:bg-gray-100"
            />
          </div>
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
