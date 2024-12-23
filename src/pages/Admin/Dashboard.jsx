"use client";

import { useState, useEffect } from "react";
import { ProductsTable } from "../../components/Admin/products-table";
import { AddEditProductModal } from "../../components/Admin/add-edit-product-modal";
import { DeleteConfirmationDialog } from "../../components/Admin/delete-confirmation-dialog";
import { Sidebar } from "../../components/Admin/Sidebar";
import { StatCard } from "../../components/Admin/Statscard";
import { useNavigate } from "react-router-dom";

const initialProducts = [
  {
    id: "1",
    name: "Margherita Pizza",
    description: "Classic pizza with tomato sauce and mozzarella",
    price: 12.99,
    category: "Pizza",
  },
  {
    id: "2",
    name: "Caesar Salad",
    description: "Fresh romaine lettuce with Caesar dressing",
    price: 8.99,
    category: "Salad",
  },
];

const ordersByDate = {
  "2024-12-20": [
    {
      id: "o1",
      product: "Margherita Pizza",
      quantity: 2,
      total: 25.98,
      status: "Served",
      orderType: "Dining",
    },
    {
      id: "o2",
      product: "Caesar Salad",
      quantity: 1,
      total: 8.99,
      status: "Not Served",
      orderType: "Takeaway",
    },
  ],
  "2024-12-21": [
    {
      id: "o3",
      product: "Caesar Salad",
      quantity: 3,
      total: 26.97,
      status: "Served",
      orderType: "Dining",
    },
    {
      id: "o4",
      product: "Margherita Pizza",
      quantity: 1,
      total: 12.99,
      status: "Not Served",
      orderType: "Takeaway",
    },
  ],
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState(initialProducts);
  const [selectedDate, setSelectedDate] = useState("2024-12-20");
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [stats, setStats] = useState({
    productCount: 0,
    categoriesCount: 0,
    totalValue: 0,
  });
  const [filters, setFilters] = useState({
    searchTerm: "",
    status: "",
    orderType: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Handle date change and calculate stats for the selected date
  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);
  };

  // Filter orders and calculate stats whenever filters or orders change
  useEffect(() => {
    // Get orders for the selected date
    const ordersForDate = ordersByDate[selectedDate] || [];

    // Apply filters to orders
    const filtered = ordersForDate.filter((order) => {
      const matchesSearchTerm =
        order.product
          .toLowerCase()
          .includes(filters.searchTerm.toLowerCase()) ||
        order.id.toLowerCase().includes(filters.searchTerm.toLowerCase());

      const matchesStatus = filters.status
        ? order.status.toLowerCase() === filters.status.toLowerCase()
        : true;
      const matchesOrderType = filters.orderType
        ? order.orderType.toLowerCase() === filters.orderType.toLowerCase()
        : true;

      return matchesSearchTerm && matchesStatus && matchesOrderType;
    });

    setFilteredOrders(filtered);

    // Calculate stats
    const productCount = filtered.length;
    const categoriesCount = new Set(
      filtered.map((order) => {
        const product = products.find((p) => p.name === order.product);
        return product ? product.category : null;
      })
    ).size;
    const totalValue = filtered.reduce((sum, order) => sum + order.total, 0);

    setStats({
      productCount,
      categoriesCount,
      totalValue,
    });
  }, [filters, selectedDate, orders, products]);

  // Initialize orders for the default date
  useEffect(() => {
    const ordersForDate = ordersByDate[selectedDate] || [];
    setOrders(ordersForDate);
  }, [selectedDate]);

  return (
    <div className="flex h-screen bg-gray-100 overflow-x-hidden">
      {/* Sidebar */}
      {localStorage.getItem("admintoken") ? (
        <>
          {" "}
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <header className="bg-white shadow-sm">
              <div className="max-w-7xl mx-auto py-4 px-6 flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src="/gyro_logo.jpg"
                    alt="Restaurant Logo"
                    width={40}
                    height={40}
                    className="mr-4"
                  />
                  <h1 className="text-sm font-medium text-gray-900">
                    Dashboard Panel
                  </h1>
                </div>
                {localStorage.getItem("admintoken") ? (
                  <button
                    className="bg-gray-500 p-2 rounded-md text-white"
                    onClick={undefined}
                    type="button"
                  >
                    Logout
                  </button>
                ) : (
                  ""
                )}
              </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-gray-100">
              <div className="max-w-7xl mx-auto py-6 px-6">
                {/* Welcome Message */}
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Welcome, Admin!
                </h2>

                {/* Date Picker */}
                <div className="mb-6">
                  <label
                    htmlFor="order-date"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Select Order Date:
                  </label>
                  <input
                    type="date"
                    id="order-date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    className="mt-1 block w-full max-w-xs border-gray-300 rounded-md shadow-sm"
                  />
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  <StatCard
                    title="Total Products Ordered"
                    value={stats.productCount}
                  />
                  <StatCard
                    title="Categories Ordered"
                    value={stats.categoriesCount}
                  />
                  <StatCard
                    title="Total Value of Orders"
                    value={`$${stats.totalValue.toFixed(2)}`}
                  />
                </div>
                <div className="mb-6 flex max-sm:grid max-sm:grid-cols-2 max-sm:space-x-2 gap-4">
                  <input
                    type="text"
                    name="searchTerm"
                    value={filters.searchTerm}
                    onChange={handleFilterChange}
                    placeholder="Search"
                    className="md:w-64 border-gray-300 rounded-md shadow-sm p-2"
                  />
                  <select
                    name="status"
                    value={filters.status}
                    onChange={handleFilterChange}
                    className="w-32 border-gray-300 rounded-md shadow-sm p-2"
                  >
                    <option value="">Status</option>
                    <option value="Served">Served</option>
                    <option value="Not Served">Not Served</option>
                  </select>
                  <select
                    name="orderType"
                    value={filters.orderType}
                    onChange={handleFilterChange}
                    className="w-32 border-gray-300 rounded-md shadow-sm p-2"
                  >
                    <option value="">Order Type</option>
                    <option value="Dining">Dining</option>
                    <option value="Takeaway">Takeaway</option>
                  </select>
                </div>
                {/* Orders Table */}
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  OrderList for {selectedDate}
                </h3>
                <div className="max-sm:overflow-x-scroll">
                  <table className="min-w-full bg-white rounded-lg shadow-md">
                    {" "}
                    <thead>
                      <tr className="bg-gray-200 text-gray-700 text-left">
                        <th className="px-4 py-2">Order ID</th>
                        <th className="px-4 py-2">Product</th>
                        <th className="px-4 py-2">Quantity</th>
                        <th className="px-4 py-2">Total</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Order Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.length > 0 ? (
                        filteredOrders.map((order) => (
                          <tr key={order.id} className="border-t">
                            <td className="px-4 py-2">{order.id}</td>
                            <td className="px-4 py-2">{order.product}</td>
                            <td className="px-4 py-2">{order.quantity}</td>
                            <td className="px-4 py-2">
                              ${order.total.toFixed(2)}
                            </td>
                            <td className="px-4 py-2">{order.status}</td>
                            <td className="px-4 py-2">{order.orderType}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="6"
                            className="px-4 py-2 text-center text-gray-500"
                          >
                            No orders found for this date.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </main>
          </div>
        </>
      ) : (
        navigate("/admin/login")
      )}
    </div>
  );
}
