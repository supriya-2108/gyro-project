"use client";

import { useState, useEffect } from "react";
import { ProductsTable } from "../../components/Admin/products-table";
import { AddEditProductModal } from "../../components/Admin/add-edit-product-modal";
import { DeleteConfirmationDialog } from "../../components/Admin/delete-confirmation-dialog";
import { Sidebar } from "../../components/Admin/Sidebar";
import { StatCard } from "../../components/Admin/Statscard";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { AdminItems } from "../../constants/AdminMenu.js";
import axios from "axios";
import {
  addProduct,
  deleteProduct,
  getProductList,
  updateProduct,
} from "../../services/admin";

export default function AdminProductList() {
  const [products, setProducts] = useState();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [stats, setStats] = useState({
    productCount: 0,
    categoriesCount: 0,
    totalValue: 0,
  });

  const location = useLocation();
  const toggleAvailability = (id) => {
    setProducts(
      products.map((product) =>
        product.id === id
          ? { ...product, availability: !product.availability }
          : product
      )
    );
  };

  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const totalProducts = products?.length;
  const totalCategories = new Set(products?.map((product) => product.category))
    .size;
  // Handle adding new product
  const handleAddProduct = async (newProduct) => {
    console.log(newProduct);
    let data = {
      product_id: `prod-${Math.random().toString(36).substr(2, 9)}`,
      name: newProduct.name,
      description: newProduct.description,
      price: newProduct.price,
      category: newProduct.category,
      quantity: 1,
      image: newProduct.imageUrl,
    };
    let res = await addProduct(data);
    if (res?.status == 200) {
      getProductListforrestaurant();
    }
  };

  // Handle updating an existing product
  const handleUpdateProduct = async (updatedProduct) => {
    console.log(updatedProduct);
    let res = await updateProduct(updatedProduct, updatedProduct.id);
    console.log(res);

    setSelectedProduct(null);
  };

  // Handle deleting a product
  const handleDeleteProduct = async () => {
    console.log("in this");

    if (selectedProduct) {
      console.log(selectedProduct._id);

      // setProducts(products.filter((p) => p.id !== selectedProduct._id));
      setSelectedProduct(null);
      let res = await deleteProduct(selectedProduct._id);
      if (res?.status == 200) {
        getProductListforrestaurant();
      }
      setIsDeleteDialogOpen(false);
    }
  };

  const getProductListforrestaurant = async () => {
    let res = await getProductList();
    console.log(res);
    if (res?.status == 200) {
      setProducts(res?.data?.products);
    }
    let admintoken = localStorage.getItem("admintoken");
    let userData;
    console.log(admintoken);

    if (admintoken) {
      try {
        userData = JSON.parse(admintoken);
      } catch (error) {
        console.error("Error parsing admintoken:", error);
      }
    }

    if (!admintoken) {
      navigate("/admin/login");
    }
  };
  useEffect(() => {
    getProductListforrestaurant();
  }, []);
  console.log(isEditModalOpen);
  const handleLogout = () => {
    console.log("ini");

    localStorage.removeItem("admintoken");
  };
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="w-[100%] mx-auto py-4 px-6 flex items-center justify-between">
            <div className="flex items-center">
              <img
                src="/gyro_logo.jpg"
                alt="Restaurant Logo"
                width={40}
                height={40}
                className="mr-4"
              />
              <h1 className="text-sm font-medium text-gray-900">
                Product Listing
              </h1>
            </div>
            <div className="flex gap-5">
              <AddEditProductModal
                onSave={handleAddProduct}
                isEditModalOpen={isEditModalOpen}
                type="Add"
                setIsEditModalOpen={setIsEditModalOpen}
                onClose={() => {
                  setIsEditModalOpen(false);
                }}
              />
              {localStorage.getItem("admintoken") ? (
                <button
                  className="border border-gray-500 p-2 rounded-md text-gray-500 max-sm:hidden"
                  onClick={handleLogout}
                  type="button"
                >
                  Logout
                </button>
              ) : (
                ""
              )}
            </div>
            <button
              className="block sm:hidden text-black focus:outline-none"
              onClick={toggleMobileMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isMobileMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16m-16 6h16"
                  }
                />
              </svg>
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-100">
          <div className="max-w-7xl mx-auto py-6 px-6">
            {/* Welcome Message */}
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Welcome, Admin!
            </h2>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <StatCard title="Total Products" value={totalProducts} />
              <StatCard title="Total Categories" value={totalCategories} />
            </div>

            {/* Product Table */}
            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              Product List
            </h3>
            {products ? (
              <ProductsTable
                products={products}
                onEdit={setSelectedProduct}
                setIsEditModalOpen={setIsEditModalOpen}
                onDelete={(id) => {
                  setSelectedProduct(products.find((p) => p.id === id));
                  setIsDeleteDialogOpen(true);
                }}
                toggleAvailability={toggleAvailability}
              />
            ) : (
              <p>No Products are available</p>
            )}
          </div>
        </main>
      </div>

      {/* Add/Edit Product Modal */}
      {selectedProduct && (
        <AddEditProductModal
          product={selectedProduct}
          isEditModalOpen={isEditModalOpen}
          onSave={handleUpdateProduct}
          onClose={() => {
            setSelectedProduct(null);
            setIsEditModalOpen(false);
          }}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteProduct}
      />
      {isMobileMenuOpen && (
        <div className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 flex items-center justify-center z-40">
          <div className="bg-white rounded-lg w-4/5 p-5">
            <button
              className="absolute top-5 right-5 text-black"
              onClick={toggleMobileMenu}
            >
              Close
            </button>
            <ul className="space-y-4">
              {AdminItems.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.link}
                    className={`text-sm font-bold uppercase block ${
                      location.pathname !== "/" ? "text-black" : "text-black"
                    } hover:text-gray-300 transition-colors ${
                      item.title === "Order Online"
                        ? "bg-[#009dc4] p-3 rounded-md text-white"
                        : ""
                    }`}
                    onClick={
                      item.title === "Logout" ? handleLogout : toggleMobileMenu
                    }
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
