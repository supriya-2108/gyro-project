import React from "react";

const mockOrders = [
  {
    id: "#12345",
    date: "2024-01-15",
    total: 45.99,
    status: "Delivered",
    items: ["Margherita Pizza", "Greek Salad", "Tiramisu"],
  },
  {
    id: "#12346",
    date: "2024-01-10",
    total: 32.5,
    status: "Delivered",
    items: ["Pasta Carbonara", "Bruschetta"],
  },
  {
    id: "#12347",
    date: "2024-01-05",
    total: 28.75,
    status: "Delivered",
    items: ["Caesar Salad", "Garlic Bread", "Chocolate Cake"],
  },
];

function OrderHistory() {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border overflow-hidden">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left font-medium text-gray-700">
                Order ID
              </th>
              <th className="px-4 py-2 text-left font-medium text-gray-700">
                Date
              </th>
              <th className="px-4 py-2 text-left font-medium text-gray-700">
                Items
              </th>
              <th className="px-4 py-2 text-left font-medium text-gray-700">
                Total
              </th>
              <th className="px-4 py-2 text-left font-medium text-gray-700">
                Status
              </th>
              <th className="px-4 py-2 text-left font-medium text-gray-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {mockOrders.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="px-4 py-2">{order.id}</td>
                <td className="px-4 py-2">
                  {new Date(order.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">
                  <div className="max-w-xs truncate">
                    {order.items.join(", ")}
                  </div>
                </td>
                <td className="px-4 py-2">${order.total.toFixed(2)}</td>
                <td className="px-4 py-2">
                  <span className="inline-block px-2 py-1 text-sm font-medium text-white bg-green-500 rounded-md">
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <button className="px-3 py-1 text-sm border rounded-md hover:bg-gray-50">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderHistory;
