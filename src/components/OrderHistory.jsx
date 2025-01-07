import axios from "axios";
import React, { useEffect, useState } from "react";

function OrderHistory() {
  const [userId, setUserId] = useState();
  const [orderList, setOrderList] = useState([]);
  useEffect(() => {
    let res = localStorage.getItem("token");
    let id = JSON.parse(res);
    setUserId(id);
    const getOrderList = async () => {
      let res = await axios(
        `https://gyroserver.vercel.app/user/v1/operation/get_order_list?user_id=${id}`
      );
      let orders = res.data.orders;
      setOrderList(orders);
    };
    getOrderList();
  }, []);
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
            {orderList.length > 0 ? (
              orderList.map((order) => (
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
              ))
            ) : (
              <p className="text-md mx-4 my-2">No items added</p>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderHistory;
