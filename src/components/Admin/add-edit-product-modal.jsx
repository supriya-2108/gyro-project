import { useEffect, useState } from "react";

export function AddEditProductModal({
  product,
  onSave,
  isEditModalOpen,
  type,
  onClose,
  setIsEditModalOpen,
}) {
  console.log(product);

  const [formData, setFormData] = useState(
    product || {
      name: "",
      description: "",
      price: 0,
      category: "",
      availability: true,
      imageUrl: "",
    }
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // For simplicity, this example uses the file name as the image URL.
      // In a real-world scenario, you'd upload the image to a server and get the URL.
      const imageUrl = URL.createObjectURL(file);
      setFormData((prevData) => ({
        ...prevData,
        imageUrl,
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };
  useEffect(() => {
    if (product) {
      setFormData({
        id: product._id,
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        availability: product.isAvailable,
        imageUrl: product.image,
      });
    }
  }, [product]);
  return (
    <>
      <button
        className="bg-gray-500 p-2 rounded-md text-white"
        onClick={() => {
          if (setIsEditModalOpen) {
            setIsEditModalOpen(true);
          }
        }}
        type="button"
      >
        {type == "Add" ? "+Add New Item" : ""}
      </button>
      {isEditModalOpen && (
        <div className="modal-overlay" onClick={onClose} aria-hidden="true">
          <div
            className="bg-white p-6 max-h-[80%] overflow-y-scroll !w-[50%] font-medium"
            onClick={(e) => e.stopPropagation()}
            aria-hidden="true"
          >
            <h2 className="modal-title mb-7">
              {product ? "Edit Product" : "Add New Product"}
            </h2>
            <form
              onSubmit={handleSubmit}
              className="form font-normal space-y-5"
            >
              <div className="form-group">
                <label htmlFor="name" className="">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <input
                  id="category"
                  name="category"
                  type="text"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group flex items-center relative">
                <label htmlFor="availability" className="font-medium">
                  Item Availability
                </label>
                <input
                  id="availability"
                  name="availability"
                  type="checkbox"
                  className="h-4 w-4 absolute -left-[10rem]"
                  checked={formData.availability}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />

                {formData.imageUrl && (
                  <div className="mt-2">
                    <img
                      src={formData.imageUrl}
                      alt="Product"
                      className="w-32 h-32 object-cover"
                    />
                  </div>
                )}
              </div>
              <div className="w-full flex gap-6 justify-center">
                <button
                  type="submit"
                  className=" w-[30%] rounded-md h-10  text-[1.1rem] border border-green-600 text-green-600 font-semibold"
                >
                  Save
                </button>
                <button
                  type="button"
                  className="w-[30%] rounded-md text-red-600 text-[1.05rem] border border-red-600"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <style jsx>{`
        .btn {
          padding: 0.5rem 1rem;
          font-size: 1rem;
          cursor: pointer;
        }
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .modal-content {
          background: white;
          padding: 2rem;
          border-radius: 0.5rem;
          width: 90%;
          max-width: 400px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .modal-title {
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }
        .form-group {
          margin-bottom: 1rem;
        }
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
        }
        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #ccc;
          border-radius: 0.25rem;
        }
        .form-actions {
          display: flex;
          justify-content: space-between;
        }
      `}</style>
    </>
  );
}
