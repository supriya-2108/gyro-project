import React, { useState } from "react";
import { faker } from "@faker-js/faker";

export function generateMockUsers(count) {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    orderHistory: Array.from(
      { length: faker.number.int({ min: 0, max: 5 }) },
      () => ({
        id: faker.string.uuid(),
        date: faker.date.past().toISOString(),
        amount: parseFloat(faker.finance.amount({ min: 10, max: 500 })),
      })
    ),
    preferredPaymentMode: faker.helpers.arrayElement([
      "Credit Card",
      "PayPal",
      "Bank Transfer",
    ]),
    feedback: faker.helpers.maybe(() => faker.lorem.sentence(), {
      probability: 0.7,
    }),
  }));
}

const ITEMS_PER_PAGE = 10;

const AdminUsersPage = ({ setIsModalOpen, setSelectedUser, selectedUser }) => {
  const [users, setUsers] = useState(() => generateMockUsers(100));
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-5">User Management</h1>
      <div className="flex justify-between mb-4">
        <input
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded-md max-w-sm"
        />
      </div>
      <div className="max-sm:overflow-x-scroll ">
        <table className="table-auto min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Orders</th>
              <th className="border border-gray-300 px-4 py-2">
                Preferred Payment
              </th>
              <th
                className="border border-gray-300 px-4 py-2"
                onClick={() => setIsModalOpen(true)}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user) => (
              <tr key={user.id}>
                <td className="border border-gray-300 px-4 py-2">
                  {user.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.email}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.orderHistory.length}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.preferredPaymentMode}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    onClick={() => {
                      setSelectedUser(user);
                      setIsModalOpen(true);
                    }}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div>
          Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
          {Math.min(currentPage * ITEMS_PER_PAGE, filteredUsers.length)} of{" "}
          {filteredUsers.length} users
        </div>
        <div className="space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="bg-gray-300 px-3 py-2 rounded-md"
          >
            Previous
          </button>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="bg-gray-300 px-3 py-2 rounded-md"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminUsersPage;
